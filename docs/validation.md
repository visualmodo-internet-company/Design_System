# Validation report — 2026-09-22

## Release status

**0.1.0 foundation-preview — not ready to declare production validated.**

A source project, Storybook configuration, component stories, documentation, registry bundle, and independent HTML visual reference were prepared. The repository has **not** been created on GitHub, and Storybook has **not** been deployed to a public URL.

The connected GitHub integration identified the account `visualmodo-internet-company` and exposed actions for existing repositories, but did not expose repository creation. An available-integration search did not provide a separate creation action. No remote write was performed.

## Checks actually passed

| Check | Result | Coverage |
| --- | --- | --- |
| `npm test` | 10/10 passed | Component manifest, file/story presence, local import paths, semantic-token references, source/registry consistency, generated docs, scope and selected privacy guards |
| TypeScript isolated transpilation | 95 files; no syntax diagnostics | Global TypeScript 5.8.3; syntax only, **not** full type checking or execution |
| Registry generator | 45 source files embedded | One product-neutral `design-system` bundle; references match actual source |
| Documentation generator | Markdown, manifest and two token maps generated | Same canonical Markdown and CSS sources, no independent transcription |
| Native HTML interactions | 21/21 passed | Search, reset, filters, search shortcut, Escape, confirmation, safe initial focus, feedback, toggles, accordion, resize bounds, collapse/restore, theme and mobile navigation |
| Native HTML responsive widths | 12/12 passed | 390, 768, 960, 961, 1440 and 2048 CSS px, each in dark and light; no document-level horizontal overflow |
| Native HTML JavaScript errors | None during those checks | Limited reference behavior only |
| Native JavaScript syntax | Passed | Reference script and publishing helper |

The standalone browser test loaded the already-generated HTML using Playwright `page.set_content` in Chromium. Browser navigation to `file:` and localhost was blocked by administrator policy, so file-server loading was not validated. The browser policy was not changed. This proves rendering and the tested native interactions of the HTML, **not** successful application serving, React hydration, Radix behavior or Storybook compilation.

The preview and screenshots use platform fallback fonts. Font binaries are not included. The React source imports Geist/Geist Mono through declared npm dependencies, which still require installation.

## Attempts that did not complete successfully

| Command | Actual result |
| --- | --- |
| `npm install --ignore-scripts --fetch-retries=0 --fetch-timeout=5000` | No installation completed; stopped after 14 seconds. Earlier registry access attempts failed DNS resolution. No resolved dependency graph or lockfile was produced. |
| `npm run typecheck` | Failed: missing `node` and `vite/client` type definitions |
| `npm run lint` | Failed: `eslint` executable not installed |
| `npm run build` | Failed at the TypeScript step because dependencies are missing |
| `npm run build-storybook` | Registry/docs prebuild steps succeeded; then `storybook` executable was not found |
| `npm run storybook -- --ci` | `storybook` executable was not found |
| `npm run dev` | `vite` executable was not found |
| React Playwright/axe tests | Written, but not executed: dependency installation and a running Vite app are required |
| GitHub Actions / GitHub Pages | Prepared, but not run remotely |
| shadcn CLI consumer installation | Not executed; only structural registry checks ran |

No npm lockfile, production-build artifact, remote success status or public deployment URL is fabricated. The absence of syntax diagnostics is not evidence that TypeScript dependency types, JSX rendering, MDX compilation, all stories, accessibility checks or the package graph will pass.

## Deliverable inventory

25 UI primitive source files and 25 component story files. The catalog additionally contains foundation, pattern, layout and page examples: **39 CSF files, 69 exported stories and 11 MDX pages** in total. The main example is Overview. The React demo also uses a small routing empty/loading composition to exercise contextual navigation. Account, Login and other standard page templates are intentionally deferred until foundation approval.

## Evidence

See `docs/validation-logs/commands.json`, individual command logs, `syntax.json` and `reference-browser.json`. Screenshot evidence is in `docs/previews/`. Generated snapshots are labelled as the independent HTML reference, not approved React visual-regression baselines.

## Required next validation gate

On a network-enabled development machine, run `npm install`; inspect and commit the real lockfile; run `npm run check`; install the Playwright Chromium browser; then run `npm run test:e2e`. Resolve every failure rather than marking blocked checks as passed. Open the actual Storybook, test Controls and Docs links, verify fonts, keyboard focus and portal behavior, and compare against reference images at known CSS viewport sizes and browser zoom. Validate a registry installation in a disposable consumer project before publishing it.

Pixel-perfect equivalence and full accessibility conformance are **not** claimed. `docs/reference-audit.md` identifies confirmed measurements, provisional values and intentional differences.
