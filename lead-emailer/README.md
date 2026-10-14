# FileFast Global Lead Emailer

A separate Node.js worker that watches a MongoDB `leads` collection and sends a **transactional enquiry acknowledgement** through SMTP or SendGrid. It is isolated from the Next.js app so it can be deployed as a worker without changing the website runtime.

> Do not use this worker for unsolicited marketing campaigns. Only send to people who submitted an enquiry and are eligible to receive a service response. Confirm your privacy notice and email practices before production use.

## 1. Requirements and setup

- Node.js 20+
- MongoDB reachable by the worker
- SMTP credentials **or** a SendGrid API key and a verified sender identity
- Docker + Docker Compose for the container option

```sh
cd lead-emailer
cp .env.example .env
# Edit .env with your own local/test values; never commit real credentials.
npm install
```

Use a secret of at least 32 characters for `UNSUBSCRIBE_SECRET`; generate one with `openssl rand -hex 32`. The app fails at startup if required configuration is missing or invalid.

## 2. Environment variables

| Variable | Required | Meaning |
|---|---|---|
| `MONGODB_URI` | Yes | MongoDB connection string |
| `MONGODB_DB` | Yes | Database name |
| `MONGODB_COLLECTION` | Yes | Collection; defaults to `leads` |
| `EMAIL_PROVIDER` | Yes | `smtp` or `sendgrid` |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | SMTP | TLS SMTP settings |
| `SENDGRID_API_KEY` | SendGrid | API key from secret manager |
| `FROM_EMAIL`, `FROM_NAME` | Yes | Verified sender identity |
| `UNSUBSCRIBE_BASE_URL` | Yes | HTTPS unsubscribe endpoint base URL |
| `UNSUBSCRIBE_SECRET` | Yes | HMAC secret; keep stable and private |
| `BATCH_SIZE` | No | Max leads claimed per poll (25) |
| `MAX_PER_MINUTE` | No | Per-process send limit (30) |
| `MAX_RETRIES` | No | In-process retries after transient errors (3) |
| `RETRY_BASE_DELAY_MS` | No | Exponential backoff base (1000 ms) |
| `POLL_INTERVAL_MS` | No | Worker interval (300000 ms) |
| `MAX_LEAD_AGE_DAYS` | No | Reserved for retention/eligibility policy (30) |
| `MONGODB_MAX_POOL_SIZE` | No | MongoDB pool size (10) |
| `HEALTH_PORT` | No | Health/metrics listener port (8080) |
| `DRY_RUN` | No | Log only, do not send (false) |

SMTP port 465 uses implicit TLS. Other ports require STARTTLS; in production use 587 with a provider that supports STARTTLS. TLS certificate verification is enabled. Local Mailpit uses port 1025 and is only for development.

## 3. Lead document shape

The worker selects `email_status: "new"`, `email_status: "retry"`, or legacy records with no `email_status` and `email_sent !== true`.

```js
{
  _id: ObjectId("..."),
  name: "Example Client",
  email: "client@example.com",
  service: "GST registration",
  email_status: "new",
  attempts: 0,
  createdAt: new Date(),
  // Optional source/form fields can remain on the document.
}
```

State transitions: `new/retry -> pending -> sent` or `new/retry -> pending -> retry/failed`. Claiming uses an atomic MongoDB update. A pending claim older than 15 minutes can be recovered after a worker crash. The worker is at-least-once, not mathematically exactly-once: if a provider accepts an email and the process crashes before MongoDB records `sent`, a retry can send a duplicate. Keep provider response IDs for audits.

### Example MongoDB queries

```js
// Pending eligible leads
db.leads.find({ $or: [
  { email_status: { $in: ["new", "retry"] } },
  { email_status: { $exists: false }, email_sent: { $ne: true } }
] });

// Re-queue failed leads after correcting the cause
db.leads.updateMany(
  { email_status: "failed", attempts: { $lt: 5 } },
  { $set: { email_status: "retry" }, $unset: { email_error: "" } }
);

// Audit sends
db.leads.find(
  { email_status: "sent" },
  { email: 1, email_sent_at: 1, email_response: 1, attempts: 1 }
).sort({ email_sent_at: -1 }).limit(100);

// Manually mark one record as eligible (check consent and history first)
db.leads.updateOne({ _id: ObjectId("REPLACE_ID") }, { $set: { email_status: "retry" } });
```

## 4. Run commands

```sh
# One batch; do not send while validating
npm run dry-run
node src/index.js --once --dry-run --limit=10

# Send one batch after configuration is tested
node src/index.js --once --limit=10

# Poll every POLL_INTERVAL_MS (default 5 minutes) and expose /health + /metrics
node src/index.js --cron

# Resend one specific lead (use only after checking previous attempts)
node scripts/resend.js REPLACE_LEAD_ID --dry-run
node scripts/resend.js REPLACE_LEAD_ID
```

Cron alternative (runs one batch every five minutes; add a lock if multiple hosts share the same collection):

```cron
*/5 * * * * cd /opt/filefast/lead-emailer && /usr/bin/node src/index.js --once >> /var/log/filefast-lead-emailer.log 2>&1
```

Avoid running both cron and `--cron` at the same time unless that is intentional.

## 5. Local Docker Compose

```sh
cp .env.example .env
# For compose, set MONGODB_URI=mongodb://mongo:27017 and SMTP_HOST=mailpit in .env.
docker compose --profile dev up --build
```

Mailpit UI is available at http://localhost:8025. The Compose profile starts Mailpit; set `EMAIL_PROVIDER=smtp`, `SMTP_USER=local`, `SMTP_PASS=local`, and `SMTP_PORT=1025`. Do not expose Mailpit publicly.

## 6. Unsubscribe token handling

The worker signs `leadId.email.expiry` claims in a compact HMAC-SHA256 token. Verify tokens with `src/unsubscribe.js` before changing a subscription state. **This project does not implement a public unsubscribe endpoint.** Wire the URL to an HTTPS endpoint that verifies the token, records an opt-out in a durable suppression collection, and returns a neutral confirmation page. Never expose raw lead data. Do not claim one-click unsubscribe support until the endpoint is implemented and tested.

## 7. Health, metrics and logs

- `GET /health`: database ping and provider configuration/health status.
- `GET /metrics`: Prometheus metrics including `emails_sent_total`, `emails_failed_total`, `emails_in_flight`.
- Logs are one JSON object per line; do not log message body, SMTP password, API key or unsubscribe token.
- Alert when multiple batches fail, DB is unavailable, failure ratio rises, or retry backlog grows. Send alerts through a separate incident path, not the failing provider alone.

## 8. Tests

```sh
npm install
npm run lint
npm test
# Optional integration test against a disposable MongoDB; starts a mock SMTP listener.
MONGODB_TEST_URI=mongodb://localhost:27017 npm run test:integration
```

The integration test writes a test database named `filefast_emailer_test`; never point it at production. Unit tests cover env validation, template escaping, HMAC tokens and a mocked send function.

## 9. Docker deployment

```sh
docker build -t filefast-lead-emailer:staging .
docker run --rm --env-file .env -p 8080:8080 filefast-lead-emailer:staging
```

Use a secret manager for production environment variables. Restrict MongoDB network access to the worker, require TLS for managed MongoDB, use least-privilege database credentials, pin container image digests in production, and set a restart policy. The sample Compose file is for local development, not a hardened public production cluster.

## 10. CI and rollout

GitHub Actions runs lint, unit tests, and a Docker build when `lead-emailer/**` changes. Production deployment should be a separate environment with a protected manual approval gate.

1. Deploy to staging with test MongoDB and Mailpit or provider sandbox.
2. Verify schema/state transitions, missing-email handling, template placeholders and valid JSON logs.
3. Run unit and integration tests; verify /health and /metrics.
4. Verify unsubscribe-token validation and the actual HTTPS unsubscribe endpoint before enabling live sends.
5. Confirm sender authentication (SPF/DKIM/DMARC as applicable), rate limits, retry policy, suppression/consent rules and rollback.
6. Approve production deployment manually, then send to an internal test lead before opening the queue.

## Troubleshooting

- **MongoDB connection errors:** check URI, DNS, IP allowlist, TLS and DB user permissions; verify `MONGODB_DB` and collection.
- **SMTP authentication/TLS errors:** use port 465 with implicit TLS or 587 with STARTTLS; confirm SMTP credentials and sender policy. Local Mailpit is not a production SMTP relay.
- **SendGrid 401/403:** verify API key permissions and that the sender identity/domain is authenticated.
- **Rate limits / 429:** lower `MAX_PER_MINUTE`, keep retries bounded and increase the backoff; inspect provider quotas.
- **Repeated failed leads:** inspect `email_error` and `email_response`, fix the underlying issue, then explicitly re-queue selected records.
