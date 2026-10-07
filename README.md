# eyepause-site-calm

Download site for EyePause, the macOS menu bar eye-care app. Next.js App Router,
statically exported to `out/`.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm test
npm run build      # static export to out/
```

Without release files the page builds from the checked-in snapshot in
`src/data/release.json` and shows the download as temporarily unavailable. To
build with the real installers locally:

```bash
EYEPAUSE_RELEASES_TOKEN=<token> npm run fetch-release && npm run build
```

This copies the installers into `public/downloads/` (ignored by git) and
rewrites `src/data/release.json`. Restore that file before committing.

## Deploy

GitHub Pages, via `.github/workflows/pages.yml` (push to `main`, manual run,
daily schedule, or a release dispatch from the app repo).

The workflow needs one repository secret:

- `EYEPAUSE_RELEASES_TOKEN`: a fine-grained personal access token with
  **Contents: read** on the private EyePause app repository. It is used only at
  build time to fetch the latest release files.
