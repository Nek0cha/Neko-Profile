# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Other commands (via `pnpm`): `pnpm build` (outputs to `./dist/`), `pnpm preview`, `pnpm astro check`.

## Architecture

This is an Astro (v7, static output) personal profile/link-in-bio site styled with Tailwind CSS v4 (loaded via the `@tailwindcss/vite` plugin, not a `tailwind.config.js` — theme tokens live in CSS, see below).

**Data-driven pages.** `src/data/data.json` is the single source of truth for site content: profile info (`name`, `bio`, `avatar`), the `links` list (SNS/contact links), the `works` list (portfolio items), and per-page metadata under `pages.<page>.{title,ogp}`. Pages (`src/pages/*.astro`) import this JSON directly and map over `links`/`works` rather than hardcoding content; adding a link or work item means editing `data.json`, not the page templates.

**Layout composition.** Every page wraps its content in `src/layouts/BaseLayout.astro`, which:
- Sets up `astro:transitions` (`ClientRouter`) for View Transitions between pages.
- Renders the fixed background image (`src/assets/background.jpeg`) with a scroll-driven blur effect controlled by the `--scroll-progress` CSS variable.
- Includes `Header` and `Footer` components and loads `src/scripts/lenis-init.ts` for smooth scrolling.
- Currently derives the `<title>` from `data.pages.about` regardless of the `title` prop passed in — check this if working on per-page `<title>`/OGP tags.

**Smooth scroll + View Transitions interaction.** `lenis-init.ts` initializes the Lenis smooth-scroll instance and re-initializes it on the `astro:page-load` event, since Astro View Transitions persist the script across client-side navigations instead of reloading it.

**Styling.** Tailwind v4 CSS-first theme config lives in `src/styles/global.css` under `@theme` (colors like `--color-bg`, `--color-ink`, `--color-accent`, font family). The `.glass-card` utility class implements the glassmorphism card style used across pages.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
