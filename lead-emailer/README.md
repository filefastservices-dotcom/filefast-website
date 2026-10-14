# FileFast Global Lead Emailer (TypeScript)

MongoDB-backed worker for sending transactional acknowledgement emails to people who submit a FileFast Global enquiry. SMTP (Nodemailer) and SendGrid are supported. This is a separate worker; it does not alter the Next.js website.

**Important:** only send service-related messages to leads who submitted an enquiry and are eligible to receive them. The sample unsubscribe endpoint records opt-out on the lead and optionally writes a suppression collection; ensure all outbound workflows check that suppression list.

## Quick start

```sh
cd lead-emailer
cp .env.example .env
npm install
npm run lint
npm test
npm run start -- --dry-run --once --limit=10
```

For local mock email, start MongoDB and Mailpit:

```sh
docker compose --profile dev up -d mongo mailpit
# Mailpit inbox: http://localhost:8025
# For Compose app, use MONGODB_URI=mongodb://mongo:27017 and SMTP_HOST=mailpit.
```

## Environment

| Variable | Purpose |
|---|---|
| MONGODB_URI | MongoDB connection URI |
| MONGODB_DB | Database name |
| MONGODB_COLLECTION | Collection; defaults to `leads` |
| EMAIL_PROVIDER | `smtp` or `sendgrid` |
| SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS | SMTP credentials and TLS transport |
| SENDGRID_API_KEY | SendGrid API key |
| FROM_EMAIL, FROM_NAME | Verified sender identity |
| UNSUBSCRIBE_BASE_URL | Absolute base URL for unsubscribe route |
| HMAC_SECRET | HMAC-SHA256 signing secret, 32+ characters |
| BATCH_SIZE | Leads claimed per batch (default 25) |
| MAX_PER_MINUTE | Per-process send cap (default 30) |
| MAX_RETRIES | Retry count for transient provider errors (default 3) |
| NODE_ENV | development/test/production |
| MONGODB_MAX_POOL_SIZE, PORT, DRY_RUN | Operational options |

All config is validated at startup. For production SMTP, use port 465 (implicit TLS) or 587 (STARTTLS); certificate verification remains enabled. Never commit .env or print secrets in logs.

## CLI

```sh
npm run start -- --once
npm run start -- --cron "*/5 * * * *"
npm run start -- --dry-run
npm run start -- --once --dry-run --limit=10
npm run resend -- --id <leadId> --dry-run
npm run resend -- --id <leadId>
```

Cron expression runs in the worker process; keep one instance per queue partition and monitor /health. For OS cron every five minutes:

```cron
*/5 * * * * cd /opt/filefast/lead-emailer && /usr/bin/npm run start -- --once >> /var/log/filefast-lead-emailer.log 2>&1
```

## Lead schema

```js
{
  _id: ObjectId("..."),
  name: "Example Client",
  email: "client@example.com",
  service: "GST registration",
  source: "website-contact-form",
  created_at: ISODate("2026-10-14T10:00:00Z"),
  email_status: "new", // new | pending | sent | failed | retry
  attempts: 0,
  last_attempt_at: null,
  email_response: null
}
```

State transitions: `new/retry -> pending -> sent` or `pending -> retry/failed`. Claiming is atomic and records worker_id. The worker reclaims stale pending claims older than 15 minutes. Delivery is at-least-once: if provider acceptance succeeds and MongoDB acknowledgement fails, duplicates remain possible. Audit provider message IDs.

Queries:

```js
// Queue
db.leads.find({ email_status: { $in: ["new", "retry"] }, email_unsubscribed: { $ne: true } }).sort({ created_at: 1 });
// Requeue failed leads only after inspecting and fixing the cause
db.leads.updateMany({ email_status: "failed", attempts: { $lt: 5 } }, { $set: { email_status: "retry" } });
// Audit recent successful sends
db.leads.find({ email_status: "sent" }, { email: 1, email_response: 1, last_attempt_at: 1, attempts: 1 }).sort({ last_attempt_at: -1 }).limit(100);
```

## Templates and unsubscribe

Templates live in `src/templates/email.html.hbs` and `email.txt.hbs`, with `name`, `service`, `lead_id`, and `unsubscribe_url`. Handlebars escapes HTML by default. The HMAC token is signed and expiry-checked. Register `registerUnsubscribeEndpoint(app, secret, leads, suppressionCollection)` from `src/unsubscribe.ts` in your public web server or a dedicated HTTPS Express service; the worker health server does not expose it by default. Production must persist suppression and check it before every email send.

## Health and metrics

`GET /health` returns DB and provider health. `GET /metrics` exposes Prometheus metrics, including:

```text
emails_sent_total 42
emails_failed_total 2
emails_in_flight 0
```

Example Grafana/Prometheus alert rule:

```yaml
groups:
  - name: filefast-lead-emailer
    rules:
      - alert: LeadEmailFailures
        expr: increase(emails_failed_total[10m]) >= 5
        for: 2m
        labels: { severity: warning }
        annotations:
          summary: "FileFast lead email failures are elevated"
```

Optional Slack alerting: set `SLACK_WEBHOOK_URL` via your secret manager. The worker emits a JSON payload after repeated failures in a batch. Alert independently if MongoDB is unavailable; do not rely only on the email provider that may be failing.

## Docker and CI

```sh
docker compose --profile dev up --build
docker compose logs -f app
docker compose down
```

GitHub Actions type-checks, tests and builds on changes. Pushing a tag such as `lead-emailer-v2.0.0` triggers the publish job; configure a protected GitHub Environment named `production` with required reviewers for the manual approval gate. Image registry: `ghcr.io/<owner>/filefast-lead-emailer`.

## Migration note

Back up first. For existing leads, initialize state without overwriting known sends:

```js
db.leads.updateMany({ email_status: { $exists: false }, email_sent: { $ne: true } }, { $set: { email_status: "new", attempts: 0, last_attempt_at: null, email_response: null } });
db.leads.updateMany({ email_sent: true, email_status: { $exists: false } }, { $set: { email_status: "sent", attempts: 1 } });
```

## Rollout checklist

1. Deploy to staging using a disposable database and Mailpit/provider sandbox.
2. Run `npm run lint`, `npm test`, and `npm run test:integration`; validate schema fields, placeholders and JSON logs.
3. Verify HTTPS unsubscribe route, expiry/signature handling, suppression persistence and send eligibility.
4. Validate /health, /metrics, alert thresholds, provider authentication and rate limits.
5. Run remote JSON-LD and Rich Results tests only if website structured data changed; they are not relevant to this worker-only release.
6. Create a version tag and use the protected production environment's manual approval gate.
7. Send one internal test enquiry, verify provider response and Mongo status, then gradually enable the queue.

## Troubleshooting

- **MongoDB connection:** check URI, DNS/IP allowlist, TLS, database user permissions and selected database/collection.
- **SMTP authentication/TLS:** use 465 implicit TLS or 587 STARTTLS; confirm sender authorization and provider credentials. Mailpit is local-only.
- **SendGrid 401/403:** verify API key permissions and sender/domain authentication.
- **429 / rate limiting:** lower MAX_PER_MINUTE, keep bounded retries and inspect provider quotas.
- **Repeated failures:** inspect email_error/email_response and requeue only after correcting the cause.
