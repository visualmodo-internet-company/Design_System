# Design System — instructions for agents

This repository is the shared interface foundation for multiple projects. Its visual reference is the supplied Vercel dashboard, but its code and data must remain independent of Vercel services. Read this file before creating or editing an interface.

## Required reading, in order

1. `docs/ai_guidelines.md` — canonical rules and implementation workflow.
2. `docs/component-manifest.json` — actual implemented components, paths, uses and constraints.
3. `src/styles/tokens.css`, then `docs/layouts.md` and `docs/responsive.md`.
4. The closest existing story in `stories/`, and `docs/reference-audit.md`.
5. `docs/validation.md` — what is verified, blocked or not yet approved.

The Markdown in `docs/` is imported directly by Storybook MDX. Never create an independent copy of those rules in a story. CSS token values live in `tokens.css`; JSON is generated, not edited.

## Release scope

Current stage: `0.1.0 foundation-preview`. Build a reliable foundation and one Overview example. Account, login, billing, settings, list/detail/form templates follow owner approval; do not mass-generate them ahead of that review. The contextual routing view demonstrates patterns, not a production networking page.

## Non-negotiable implementation rules

- Reuse `src/components/ui`, then `src/blocks`, then `src/layouts`; compose before abstracting.
- Keep React/TypeScript strict, Vite, Tailwind and shadcn-style APIs. Use only Lucide icons.
- Use semantic CSS variables or their Tailwind aliases. No ad-hoc palette or inline hex in components.
- Preserve dark and light modes, visible keyboard focus, reduced motion, error/empty/loading/disabled states.
- Layout numbers belong in named tokens; data-driven widths and progress values may use inline styles.
- Never paste account HTML, personal IDs, emails, tokens, deployment payloads or proprietary runtime bundles into this public repository.
- No backend, database, real authentication, tracking, payments or live infrastructure in example pages.
- Do not label the implementation pixel-perfect or tested unless actual evidence supports the claim.
- Do not rename tokens or change component APIs without documenting migration impact on consumers.
- `preview/reference.html` is a standalone inspection aid, not the React runtime, not a second canonical implementation and not proof of a Storybook build.

## Completion checks

Run `npm run check` and `npm run test:e2e` with installed dependencies. Inspect desktop, mobile, dark, light, keyboard focus and reduced motion. Commit the genuine npm-generated lockfile after the first successful installation. Never fabricate lockfiles or replace missing dependencies with mock modules to obtain green tests.

Update the manifest, relevant stories, docs and `docs/validation.md` together. Record commands actually executed and unresolved limitations. CI passing does not replace human visual approval.
