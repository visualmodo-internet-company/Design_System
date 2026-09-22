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

Current stage: `0.2.0 account-reference`. The foundation, Overview, contextual routing example and the approved Account/Settings pages are in scope. Do not invent layouts for additional product pages without supplied references. Account examples remain frontend-only and use neutral fictional identity data.

## Non-negotiable implementation rules

- Reuse `src/components/ui`, then `src/blocks`, then `src/layouts`; compose before abstracting.
- Preserve the team scope switcher contract in `src/blocks/team-switcher.tsx`: the team label stays visually neutral on hover, only the right chevrons trigger gets hover/open background, and the 384 px desktop panel keeps search, active team, informational area and Create Team footer in that order.
- Preserve the sidebar search contract in `src/blocks/sidebar-search.tsx`: Find opens a 440 px desktop command panel aligned over the trigger, with a 56 px search header, Esc control and 54 px result rows. Keep keyboard navigation and the Navigation Assistant demo behavior.
- Scrollbars are global foundation behavior. Follow `docs/scrollbars.md` and the semantic scrollbar tokens; do not invent component specific scrollbar colors.
- Control height is contextual but deterministic: use 36 px (`--ds-control-md`) for forms, search fields, selects, toolbars and page-level action groups. Use 32 px (`--ds-control-sm`) only for compact actions inside dense containers. Never mix 32 px and 36 px controls in the same toolbar row.
- Dropdown menus follow the Vercel menu contract: 14 px muted section labels, 40 px items, 12 px outer radius, subtle border, full-width separators and selected checks on the right. Do not put selection indicators on the left.
- Account pages use the `account` ApplicationShell variant and `accountNavigation`. The account sidebar shows Back, Find, primary account destinations, then Settings with persistent text-only child links. Keep supplied Account pages at the shared account width and do not reintroduce project/team context into that shell.
- Account Settings geometry is reference-driven: 56 px account header, 24 px content padding inside cards, 32 px vertical gap between cards, 56 px card footers, 304 px short fields, subtle `--ds-border` form borders and footer actions aligned to the far right. Account card titles use the Geist heading-20 contract: 20 px, 28 px line-height, 600 weight and -0.01em tracking. Account explanatory copy and card footer copy use the same copy-14 contract: 14 px, 20 px line-height, 400 weight and -0.006em tracking.
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
