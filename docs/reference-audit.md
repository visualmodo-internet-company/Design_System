# Reference Audit

## Scope and provenance

Reference date: 2026-09-22. Six dashboard screenshots and one exported HTML were supplied by the owner. Public Vercel Geist Colors, Typography, Introduction and Font pages were consulted on that date. The current public shadcn Button source was inspected (reported modified 2026-09-04).

The private Vercel application source was not accessed. Public compiled CSS links in the supplied HTML could not be downloaded in this environment. The HTML contains some values directly but does not contain all computed styles. Screenshots show one theme and some loading states; they do not prove all interaction trajectories.

## Confirmed in supplied HTML

- `--raw-sidebar-width: 256px` and persisted width clamped to 240–400 px.
- Desktop/collapsed media boundary at min-width 961 px.
- Header `h-14`, sidebar items `h-9`, small buttons `--height:32px`.
- Main text 14 px with 24 px line height, icons commonly 16 px.
- Controls transition over 150 ms, contextual sidebar over 200 ms.
- Card padding 16 px, main gap 24 px, deployment preview width 400 px at its large container breakpoint.

## Observed in screenshot pixels

The Overview image contains dominant RGB values 0/0/0, 10/10/10, 24/24/24 and 31/31/31. They informed canvas, cards, hover and active tokens. Pixel samples are not a full CSS color export; anti-aliasing, scaling and overlays affect many values.

The uploaded Overview image is 2048×1003 pixels. Display size in a conversation is not necessarily CSS viewport size or browser zoom. Measurements must be normalized before pixel-by-pixel comparison.

## Provisional or intentionally different

Page max-width 1600 px, light-theme palette, detailed gray ramp, type weights, shadows, skeleton duration and panel trajectories are local choices pending review. The HTML refers to page width variables without their definitions; 1600 px is not asserted to be an extracted Vercel value.

Inputs have a higher-contrast border, mobile touch targets grow to 44 px, and all data is fictitious. Lucide replaces Vercel's private/icon-specific markup according to the requested stack. The blank deployment image becomes an explicitly labelled neutral placeholder. No Vercel logo, personal avatar, account ID, email, deployment payload, tracking code or authentication script is redistributed.

## Approval method

Run the actual React app and Storybook with fonts installed. Compare at known CSS viewport sizes and 100% browser zoom. Check dark/light, hover, focus, active, disabled, loading, empty/error, dialogs, contextual sidebar and reduced motion. Record measured differences and adjust named tokens. Do not apply global zoom to conceal discrepancies.

This is an independent implementation guided by the references, not a certified pixel-perfect clone and not an official Vercel package.

## Public research references

- https://vercel.com/geist/introduction
- https://vercel.com/geist/colors
- https://vercel.com/geist/typography
- https://vercel.com/font
- https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/button.tsx
- https://ui.shadcn.com/docs/installation/vite
- https://ui.shadcn.com/docs/registry/registry-json
- https://storybook.js.org/docs/get-started/frameworks/react-vite
- https://storybook.js.org/docs/writing-docs/mdx
- https://tailwindcss.com/docs/installation/using-vite
