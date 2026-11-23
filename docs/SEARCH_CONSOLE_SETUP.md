# FileFast Google Search Console connection

This integration is read-only. It requests the Search Console `webmasters.readonly` scope and never publishes pages or changes Search Console settings.

## 1. Verify the property

1. Open Google Search Console using the Google account that owns or has full access to FileFast.
2. Verify the Domain property `filefastglobal.com`, or use the exact URL-prefix property shown in Search Console.
3. Use the exact property identifier in Vercel. For a Domain property, use `sc-domain:filefastglobal.com`.

## 2. Enable the API and create OAuth credentials

1. In Google Cloud Console, create or select a project.
2. Enable the Google Search Console API.
3. Configure the OAuth consent screen and add the Search Console account as an allowed user if the app is in testing.
4. Create an OAuth 2.0 Client ID. A desktop or web client can be used with a controlled OAuth authorization flow.
5. Authorize the read-only scope: `https://www.googleapis.com/auth/webmasters.readonly`.
6. Request offline access and retain the refresh token securely. Google documents that refresh tokens can be revoked or expire; an External app left in Testing can issue refresh tokens that expire after seven days. Do not leave a production integration dependent on a short-lived testing token.

Google OAuth documentation: https://developers.google.com/identity/protocols/oauth2

## 3. Configure Vercel environment variables

Add these as server-side variables for the production environment. Never prefix them with `NEXT_PUBLIC_`, put them in source control, or send them in chat.

- `GOOGLE_SEARCH_CONSOLE_CLIENT_ID`
- `GOOGLE_SEARCH_CONSOLE_CLIENT_SECRET`
- `GOOGLE_SEARCH_CONSOLE_REFRESH_TOKEN`
- `GOOGLE_SEARCH_CONSOLE_PROPERTY`

Set the property to `sc-domain:filefastglobal.com` for the Domain property, or the exact URL-prefix value shown in Search Console.

Redeploy after saving the variables so the server can read them.

## 4. Run a sync

1. Sign in to the FileFast admin panel.
2. Open **SEO & Google**.
3. Select **Sync latest data**.
4. Review the top search queries and landing pages.

The sync requests final web-search data for a recent 28-day window, ending three days before the current date to allow for Search Console reporting delay. It stores page and query aggregates in MongoDB. Google Search Console API returns at most 25,000 rows per request in this implementation; the report is not a bulk export of every possible query.

## 5. Understand the report

- Clicks and impressions shown on the dashboard are totals from the top 100 stored page rows returned by the reporting endpoint.
- CTR and average position are unweighted averages across those returned rows, not site-wide weighted metrics.
- The query table lists the top stored queries.
- Search Console can omit anonymised queries and may not expose every low-volume result.
- This dashboard does not claim rankings are real-time.

For larger historical datasets, Google offers scheduled bulk export to BigQuery. That option requires a Google Cloud project, billing configuration and BigQuery permissions; it is not required for this manual API sync.

Official references:
- Search Analytics API: https://developers.google.com/webmaster-tools/v1/searchanalytics/query
- Search Console bulk export: https://support.google.com/webmasters/answer/12918484
- OAuth refresh tokens: https://developers.google.com/identity/protocols/oauth2
