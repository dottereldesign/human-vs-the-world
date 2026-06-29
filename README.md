# Human vs The World

Local Warcraft III Human replay dashboard built with Vite.

## Run The App

From this project folder:

```sh
npm install
npm run dev
```

Open the local URL Vite prints in the terminal, usually:

```txt
http://localhost:5173/
```

If port `5173` is busy, Vite will print a different port.

## Build Check

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

## GitHub Pages

This app can be hosted as a static GitHub Pages site. The production build keeps the dashboard, rankings, resources, statistics, and replay analysis tabs, using the prebuilt JSON files in `public/`.

The experimental renderer/Warsmash/w3gjs sandbox menu is local-dev only because those pages depend on local Warcraft III assets or Vite dev middleware. They stay in the source for private testing, but are hidden from production builds.

Publishing flow:

```sh
npm install
npm run build
```

Deploy the `dist/` folder to GitHub Pages. Data is not fetched automatically by visitors; refresh it locally with the update scripts below, then rebuild.

## Update Local Data

Refresh replay metadata/downloads:

```sh
npm run update:replays
```

Rebuild parsed replay analysis:

```sh
npm run analyze:replays
```

Refresh cached Human player earnings:

```sh
npm run update:earnings
```

## Experimental Sandbox

These are research pages/tools, not required for the core app:

```sh
npm run warsmash:setup
npm run warsmash:build
npm run reforged:sandbox
```

The core app works with `npm run dev`.
