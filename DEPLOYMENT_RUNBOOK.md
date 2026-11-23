# FileFast Global — Manual Vercel Deployment Runbook

This runbook is for a deliberate, single manual deployment after the Vercel build limit has reset. It does not trigger a deployment and contains no production secrets.

## Repository and build settings

- GitHub repository: `filefastservices-dotcom/filefast-website`
- Production branch: `main`
- Framework: Next.js (the repository currently uses Next.js 14.2.5)
- Root directory: repository root (`/`)
- Install command: allow Vercel to detect the pnpm lockfile; the CI workflow uses pnpm 9.15.9.
- Build command: `pnpm run build` (or Vercel's detected Next.js build command).
- Output directory: leave automatic/default for Next.js.
- Node.js: use Node 20 to match the current GitHub Actions CI workflow unless a later tested change updates it.

## Before using Vercel

1. Confirm the Vercel Hobby build-rate limit has reset.
2. Sign in to the Vercel account/team that owns the existing FileFast project. Do not create a duplicate project just because it is missing from another team view.
3. Confirm the existing project's Git connection points to `filefastservices-dotcom/filefast-website` and its production branch is `main`.
4. Confirm the production domain configuration is still attached to the intended project. The domain records previously visible in Vercel showed `filefastglobal.com` redirecting to `www.filefastglobal.com`, and both domains verified. Do not remove/re-add or change DNS unless the correct project owner has confirmed the project association.
5. Check the latest `main` commit and confirm the GitHub Actions **Website CI** workflow completed successfully. Do not use an old preview or deploy an unverified branch.

## Required environment variables

Set these in Vercel Project Settings → Environment Variables for **Production** (and Preview/Development only if those environments will be used). Use the real existing production values from the secure source of record; never copy secrets into GitHub, this runbook, chat, or screenshots.

| Variable | Required value |
|---|---|
| `MONGODB_URI` | Existing MongoDB Atlas connection URI for the production database |
| `ADMIN_EMAIL` | Intended administrator login email |
| `ADMIN_PASSWORD` | A new, strong, unique administrator password; do not reuse the example value |
| `JWT_SECRET` | A cryptographically random secret of at least 32 characters; keep it private |
| `NEXT_PUBLIC_SITE_URL` | `https://www.filefastglobal.com` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `919444614182` |

Notes:
- `.env.example` is a template only. Its sample database URI, admin credentials and JWT value are not production credentials.
- Do not add optional Razorpay variables unless payments are actually enabled and configured.
- After changing environment variables, Vercel requires a new deployment for them to take effect.
- Ensure MongoDB Atlas network access allows the production hosting environment to connect, without weakening database credentials or exposing the database user password.

## One-deployment procedure

1. Open the existing FileFast project in Vercel.
2. Confirm Production Branch is `main` and the latest successful CI commit is the commit selected for deployment.
3. Confirm all six environment variables above are present in the Production environment. Do not reveal their values in logs or screenshots.
4. Wait until the Hobby build limit is available. Avoid repeatedly clicking Deploy.
5. In Deployments, choose the latest deployment for the intended `main` commit and use **Redeploy** if it is already available; otherwise use **Deploy** from the latest `main` commit. Do this once.
6. Wait for the build to finish. If it fails, stop and inspect the first build error; do not repeatedly redeploy.
7. Once the deployment is Ready, confirm the production domain is assigned to that deployment/project before changing any DNS.

## Post-deployment smoke test

Check these pages and flows in a private/incognito browser:

- `https://www.filefastglobal.com/` — homepage and navigation
- `https://www.filefastglobal.com/about` — founder page and portrait asset
- `https://www.filefastglobal.com/services` — services listing and detail pages
- `https://www.filefastglobal.com/contact` — submit a controlled test enquiry and confirm it appears in admin
- `https://www.filefastglobal.com/appointments` — submit a controlled test appointment request; verify the site says request received, not booked
- `https://www.filefastglobal.com/admin/login` — administrator login; do not share credentials
- `https://www.filefastglobal.com/sitemap.xml` and `/robots.txt` — SEO endpoints
- Mobile layout, WhatsApp link, phone link, and redirects from the apex domain

Delete test lead/appointment records afterward if the admin interface supports it and the records are clearly identifiable as tests.

## Rollback

If the deployment is Ready but a critical production test fails, use Vercel Deployments to promote the last known-good production deployment. Do not change DNS or delete the old deployment as a first response.

## Current access caveat

At the time this runbook was prepared, the connected Vercel integration could see the Hobby team and the verified domain association, but it could not inspect the project itself. The domain association referenced project ID `prj_2UCvRbE2Y3n6HKPyRHleajaNzhKf`. Recover access to the account/team that owns that project before attempting a manual deployment. Do not create a duplicate project or modify domain routing as a workaround.

## Plan and policy note

Vercel's Hobby plan is subject to Vercel's current eligibility and usage terms. Confirm that the intended use is permitted before deploying a commercial business website. This runbook does not change the account plan or authorize any paid upgrade.
