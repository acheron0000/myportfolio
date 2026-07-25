# Lumora Portfolio

Live: (deployed on Railway) — check your Railway project dashboard for the public URL.

This repository contains a React (Create React App) portfolio built with Tailwind and Framer Motion.

Local commands

- Install dependencies: `npm install`
- Start dev server: `npm start`
- Create production build: `npm run build`

CI

- A GitHub Actions workflow (`.github/workflows/ci.yml`) runs `npm ci` and `npm run build` on pushes and PRs to `main`.

Analytics

- A placeholder is added to `public/index.html`. Replace `GA_MEASUREMENT_ID` with your Google Analytics Measurement ID or add Plausible or another analytics provider.

Custom domain / Railway

- To set a custom domain in Railway: open your Railway project → Domains → Add Domain. Point your DNS (CNAME or A records) as instructed and enable HTTPS.
- Note: domain names cannot contain apostrophes. Recommended sanitized names: `gowthams-portfolio`, `gowthamssportfolio`, or `gowtham-portfolio`.

Monitoring

- Use UptimeRobot (free) or a similar service to monitor the public URL. Create a new monitor (HTTP(S)) and add your live URL.

Next steps I can take for you

1. Rename Railway project / set the Railway subdomain to a sanitized name (requires Railway dashboard action or a valid Railway token).
2. Add a real analytics snippet if you provide the Measurement ID.
3. Configure a custom domain if you provide DNS access.
