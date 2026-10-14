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

**Lead form:** UI demonstration only. It validates fields in the browser and shows a demo success state; it does not send, track, or save entered details and never calls `/api/leads`. Use fictional data during demonstrations.

**Animation assets:** The supplied Lottie JSON files are placeholders, not finished animations. The SVG fallback is used until a motion designer provides optimized Lottie JSON and source files. The experiment assignment is client-side for demonstration only; production experiments should be assigned server-side to avoid flicker.
