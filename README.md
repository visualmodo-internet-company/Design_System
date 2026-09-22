# Design System

**The shared visual language for all projects.**

A reusable React interface foundation with a Vercel-dashboard visual direction, a public-ready Storybook, semantic tokens, shadcn-style primitives, and documentation for humans and AI agents. Independent implementation; not an official Vercel library. Neutral fictional data only. No backend, authentication, analytics tracker or database.

## Delivery status — read first

Stage: **0.1.0 foundation-preview**. The first page is Overview. Account and other standard pages intentionally follow visual approval.

The repository is public and the Storybook is deployed through GitHub Pages at https://visualmodo-internet-company.github.io/Design_System/.

GitHub Actions has completed dependency installation, source contract tests, strict TypeScript checks, ESLint, the Vite production build, the Storybook production build, Chromium installation, Playwright interaction tests and the automated accessibility scan successfully. No npm lockfile is fabricated. See **docs/validation.md** for the current validation record.

## Stack

React 19.2.3 · strict TypeScript · Vite · Storybook 10.6 · Tailwind CSS 4 · shadcn-style components with Radix primitives · Lucide · npm · Node 22.12+.

## Start

```bash
npm install
npm run dev          # Example app: http://localhost:5173
npm run storybook    # Catalog: http://localhost:6006
```

GitHub Actions has successfully resolved and built the declared dependency graph. A genuine package-lock.json should still be created and committed before adopting `npm ci` as the default install command.

## Inspect without installing dependencies

Open `preview/reference.html` directly in a browser, or run:

```bash
npm run preview:reference
# http://localhost:4174/preview/reference.html
```

This standalone HTML is a **visual inspection aid**, not the React app or a compiled Storybook. It reuses the canonical token/system CSS and neutral fixture. Its limited native JavaScript interactions and fallback fonts do not validate Radix, React or Storybook behavior. Never develop new product pages from this preview file; use src/.

## Visual reference

![Independent HTML reference — not a Storybook build](docs/previews/overview-wide.png)

More reference screenshots: docs/previews/. These are not yet approved visual regression baselines.

## Commands

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run build-storybook
npm run test:e2e
npm run registry:build
npm run docs:build
npm run check
```

`npm run build_storybook` is an alias. App output: dist/. Storybook output: storybook-static/. The registry and public Markdown are generated before the Storybook build. Playwright needs `npx playwright install --with-deps chromium` on a new machine.

## Structure

```text
src/components/ui/  25 UI primitives
src/blocks/         Reusable state, navigation and composition blocks
src/layouts/        ApplicationShell and ContentLayout
src/styles/         Canonical tokens, component CSS and Tailwind aliases
src/pages/          Overview example, not application business logic
src/fixtures/       Neutral demo data and navigation
stories/            Foundations, components, patterns, layouts, pages, AI rules
.storybook/         Docs, controls, themes, viewport and accessibility
AGENTS.md           Entry point for agents
 docs/              Canonical Markdown, manifests, provenance and validation
registry.json       Initial shadcn-compatible bundle
scripts/            Dependency-free generators and safe publishing helper
preview/            Standalone reference for visual approval, not production
```

## Reuse and AI

Start with AGENTS.md, docs/ai_guidelines.md and docs/component-manifest.json. Build with existing components and shell; never invent an independent palette for each project. Each consumer should pin a release or commit. Registry-copied components do not auto-update. See docs/integration.md and docs/registry.md.

Storybook MDX imports the same Markdown that agents read. JSON tokens are generated from tokens.css. Stories obtain use/avoid/a11y prose from the component manifest. Do not maintain conflicting copies.

## Add a component or story

Inspect the current catalog first. A shadcn component can be added on a branch with `npx shadcn@4.21.0 add <component>`, but review the diff carefully: this system already customizes tokens, CSS and primitives. Do not run overwrite across existing components. Follow stories/components/button.stories.tsx for typed CSF, Controls, states and an interaction example. Update the manifest and relevant tests.

## Public repository

Repository: https://github.com/visualmodo-internet-company/Design_System

Public Storybook: https://visualmodo-internet-company.github.io/Design_System/

The repository contains no access tokens, source account HTML or supplied personal screenshots.

## Static publication

GitHub Pages is configured in `.github/workflows/pages.yml`. Every push to `main`, as well as a manual run, builds the Storybook and publishes `storybook-static` using GitHub Actions. In repository Settings > Pages, choose GitHub Actions as the publishing source.

For the public repository `visualmodo-internet-company/Design_System`, the default Pages URL will be `https://visualmodo-internet-company.github.io/Design_System/`.

For Cloudflare Pages, use build command `npm run build-storybook` and output directory `storybook-static`. Node.js is required only during development and build.

## Provenance and licensing

See docs/reference-audit.md for confirmed measurements versus estimates. Public Geist documentation was consulted; private Vercel source was not accessed. shadcn-derived API patterns retain the MIT notice in THIRD_PARTY_NOTICES.md. Original-code licensing is left for the repository owner; package publishing is disabled by default.
