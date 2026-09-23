# Reference Audit

## Scope and provenance

Reference date: 2026-09-22. Dashboard screenshots plus exported HTML for the shell and team scope switcher were supplied by the owner. A later reference set added Account Settings, Authentication, Sign in with Vercel, Billing Information, Billing Items, Invoices and Tokens screenshots. Public Vercel Geist Colors, Typography, Introduction and Font pages were consulted on that date. The current public shadcn Button source was inspected (reported modified 2026-09-04).

The private Vercel application source was not accessed. Public compiled CSS links in the supplied HTML could not be downloaded in this environment. The HTML contains some values directly but does not contain all computed styles. Screenshots show one theme and some loading states; they do not prove all interaction trajectories.

## Confirmed in supplied HTML

- `--raw-sidebar-width: 256px` and persisted width clamped to 240–400 px.
- Desktop/collapsed media boundary at min-width 961 px.
- Header `h-14`, sidebar items `h-9`, small buttons `--height:32px`.
- Main text 14 px with 24 px line height, icons commonly 16 px.
- Controls transition over 150 ms, contextual sidebar over 200 ms.
- Card padding 16 px, main gap 24 px, deployment preview width 400 px at its large container breakpoint.

## Dropdown menu observations

The supplied Vercel screenshots establish a consistent dropdown pattern across Appearance and project filters:

* Section labels such as Appearance, Filter by, Sort by and Preferences use the normal 14 px interface scale with muted color rather than caption sized text.
* Menu rows use an approximately 40 px vertical rhythm.
* Selected radio and checkbox indicators sit at the far right of the row.
* Icons remain on the left next to item text.
* Section separators extend through the menu interior rather than behaving like short item borders.
* The dark menu uses the regular subtle border, 12 px outer radius and compact inner radius for highlighted rows.
* Highlight belongs to the active or hovered row; selection itself is communicated by the right aligned check.

These rules are implemented in the shared Dropdown Menu and Select primitives so theme, status, filters and future menus inherit the same behavior.

## Control height measurements

Later dashboard screenshots with DevTools overlays provide direct control-height evidence:

* Search Projects measured 35.99 px, treated as the 36 px default control.
* Add New measured 35.99 px.
* Create Flag in the page toolbar measured 35.99 px.
* Marketplace provider Create measured 31.99 px inside a bordered provider row.
* Push Notifications Enable measured 31.99 px inside its compact card.

The resulting control contract is contextual rather than one universal button size. Inputs, search fields, selects and page-level toolbar actions use 36 px. Compact actions inside an already bounded dense container use 32 px. Controls sharing one toolbar row must use the same height.

## Team scope switcher measurements

The later supplied team switcher HTML confirms the desktop composition used by the sidebar:

* Top scope row uses a 40 px content height.
* Team avatar is 20 px and circular.
* The plan badge is 20 px high with 11 px text.
* The chevrons icon is 16 px.
* The hover/active background belongs only to the chevrons trigger, not the team label area.
* The Find control below the team row is 36 px high.
* Desktop switcher content uses a 384 px width.
* The team search input area is 40 px high with a bottom border.
* The results scroller is 250 px high.
* The informational empty area has a 196 px minimum height.
* The footer has 6 px outer padding and a top border.
* The active team row contains the 20 px avatar, team name, plan badge and selected check indicator.

The reference also separates the team label action from the scope switcher trigger. That separation is part of the reusable shell contract and should not be collapsed back into one full-width hover button.

## Header project switcher observations

The supplied project-picker screenshots provide direct pixel evidence:

* The open trigger is approximately 40 px high and uses the hover/active surface.
* The picker is approximately 440 px wide.
* The search header is approximately 52 px high and contains `Find Project...` with an Esc key control on the right.
* The project region and Create Project region each use 8 px outer padding around a 40 px row.
* A full-width separator divides project selection from Create Project.
* Project and Create rows are transparent at rest; the screenshot examples show the shared hover fill only on the row currently hovered.
* Project identity uses a 20 px circular mark.
* The outer panel uses the same subtle border and 12 px popover radius as the other reconstructed pickers.

## Sidebar user menu observations

The supplied account sidebar screenshots define a distinct user dropdown:

* Desktop menu width is approximately 330 px and may extend beyond the 256 px sidebar.
* The menu opens above the footer trigger with an 8 px visual gap.
* The top profile row contains account name and email on the left and the Settings icon on the right.
* Standard rows are approximately 40 px high with 6 px hover radius and right-aligned icons.
* The item order is Feedback, Home Page, Changelog, Help, Docs and Log Out.
* Upgrade to Pro is a full-width 36 px primary action inside the menu.
* The final status area is separated by a full-width divider and shows All systems normal with a blue dot on the right.
* The outer menu uses the 12 px popover radius and subtle border.

## Input hover and active border observations

The later dashboard comparison clarifies that the stronger input border is a global interaction state, not a Display Name exception:

* Standard text inputs, search controls, selects and grouped form controls strengthen their border on hover and focus/open states.
* The dark reference border measures approximately `#3d3d3d` in the supplied screenshots and is exposed as `--ds-control-border-hover`.
* Base borders remain subtle so the interactive state is visible without changing control size.
* Default Team uses a real 16 px X glyph with a light 1.5 stroke, centered in a small transparent hit area at the far right of the chip.
* The X itself changes foreground emphasis on hover but does not introduce a filled hover surface.

## Account Settings measured geometry

A direct comparison between the supplied Settings reference and the first implementation exposed several measurable mismatches. The corrected account contract records the reference geometry rather than inheriting generic card defaults:

* Account header uses the standard 56 px shell height.
* Settings cards are separated by approximately 32 px.
* Card content uses 24 px internal padding.
* Card footer uses a 56 px vertical rhythm and 24 px horizontal padding.
* Short identity fields are approximately 304 px wide.
* Settings content uses a 928 px reference width at desktop before responsive clamping.
* Account form borders use the subtle semantic border instead of the stronger generic input border.
* Account card titles use the supplied `text-heading-20` reference: 20 px, 28 px line-height, 600 weight and approximately -0.01em tracking. Descriptions and footer help copy use the supplied `text-copy-14` reference: 14 px, 20 px line-height, 400 weight and approximately -0.006em tracking.
* Footer actions sit at the far right of the footer. They are not part of the help text flow.
* Direct compact actions inside a card body align to the left rather than stretching to full width.

## Account page observations

The supplied Account reference set establishes a distinct shell state:

* The project/team selector is absent. The sidebar starts with Back, followed by the same Find control.
* Primary account destinations remain visible above a divider, while Settings keeps its text-only child links visible at the same time.
* The global header keeps the current account page title centered.
* Account content uses a narrow centered column, with repeated bordered cards and compact 32 px footer actions.
* Form fields inside Account cards use the 36 px standard control height.
* Settings cards consistently separate explanatory content from a footer through a full-width border.
* Authentication uses bordered row groups with icon, title/description and trailing action.
* Billing Items separates Personal and Teams into independent titled sections.
* Invoices combines one 36 px select with a large bordered empty panel.
* Tokens combines a create form, segmented status filter and dense table.
* Destructive account areas use the shared destructive semantic token rather than an independent red palette.

The implementation keeps the geometry and composition reusable while replacing account-export identifiers, real emails, avatar imagery and access credentials with neutral fictional examples.

## Observed in screenshot pixels

The Overview image contains dominant RGB values 0/0/0, 10/10/10, 24/24/24 and 31/31/31. They informed canvas, cards, hover and active tokens. Pixel samples are not a full CSS color export; anti-aliasing, scaling and overlays affect many values.

The uploaded Overview image is 2048×1003 pixels. Display size in a conversation is not necessarily CSS viewport size or browser zoom. Measurements must be normalized before pixel-by-pixel comparison.

## Provisional or intentionally different

Page max-width 1600 px, light-theme palette, detailed gray ramp, type weights, shadows, skeleton duration and panel trajectories are local choices pending review. The HTML refers to page width variables without their definitions; 1600 px is not asserted to be an extracted Vercel value.

Inputs have a higher-contrast border, mobile touch targets grow to 44 px, and all data is fictitious. Lucide replaces Vercel's private/icon-specific markup according to the requested stack. The blank deployment image becomes an explicitly labelled neutral placeholder. No Vercel logo, personal avatar, account ID, email, deployment payload, tracking code or authentication script is redistributed.

## OpenAI Suite scrollbar reference

At the owner's request, the current OpenAI Suite implementation was inspected for its scrollbar treatment. Its global pattern uses `scrollbar-width: thin`, an 8 px WebKit scrollbar, a track matching the page background, and a fully rounded thumb with a 2 px border matching the track. The light neutral thumb is `#c9c9c9`; the dark neutral thumb is `#454545`.

The Design System mirrors that geometry and base neutral values through semantic scrollbar tokens so the treatment remains global and theme aware.

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
