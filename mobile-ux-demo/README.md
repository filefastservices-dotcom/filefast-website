# FileFast Global Mobile UX Demo

Standalone staging prototype for the mobile-first GST hero, accessible tabs, lead modal, reduced-motion handling, placeholder Lottie animations, Docker, and CI.

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

**Safety:** This is a staging demo. The form validates inputs locally but does not transmit or persist leads. Lottie JSONs are static placeholders, not final motion assets. After Effects sources are not included. The experiment assignment is client-side for demonstration only; production experiments should be assigned server-side to avoid flicker.
