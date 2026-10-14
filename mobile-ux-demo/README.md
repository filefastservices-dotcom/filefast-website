# FileFast Global Mobile UX Demo

Standalone staging prototype for the mobile-first GST hero, accessible tabs, lead modal, reduced-motion handling, SVG fallbacks, Docker, and CI.

## Run
Node.js 20+ required.
```bash
npm install
npm run start
```
Open http://localhost:8080.

## Checks
```bash
npm run lint
npm test
```

## Docker
```bash
docker build -t filefast-mobile-ux-demo .
docker run --rm -p 8080:80 filefast-mobile-ux-demo
```

**Lead form:** Submits to the existing same-origin `POST /api/leads` route. That route requires the site's MongoDB environment to be configured; submissions are real lead records, so only submit genuine enquiries during testing. The form includes a honeypot, client-side validation, server error handling, and does not ask for PAN, Aadhaar, or bank details. The backend route is the production app's existing lead API; do not merge or deploy this demo until the preview environment's database scope and access controls are verified.

**Animation assets:** The supplied Lottie JSON files are placeholders, not finished animations. The SVG fallback is used until a motion designer provides optimized Lottie JSON and source files. The experiment assignment is client-side for demonstration only; production experiments should be assigned server-side to avoid flicker.
