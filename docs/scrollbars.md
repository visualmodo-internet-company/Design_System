# Scrollbars

Scrollbars are a global foundation, not a component level styling decision.

The Design System uses the same minimal pattern requested from OpenAI Suite: thin scrollbars, an 8 px WebKit track, a rounded thumb and a 2 px track colored border that visually reduces the thumb without making the hit area excessively small.

## Contract

* Firefox uses `scrollbar-width: thin` and semantic scrollbar colors.
* Chromium and Safari use an 8 px scrollbar in both axes.
* The thumb has a 2 px solid border matching the track.
* The thumb radius is fully rounded.
* Track color follows the current page background.
* Thumb colors are semantic tokens and change with the theme.
* Hover increases thumb contrast without changing dimensions.
* Individual components should not redefine scrollbar colors unless the design explicitly requires a hidden scrollbar for a horizontal scroller.

## Tokens

`--ds-scrollbar-track`

`--ds-scrollbar-thumb`

`--ds-scrollbar-thumb-hover`

Light theme thumb follows the requested `#c9c9c9` base. Dark theme follows `#454545`. The hover values use the next stronger neutral step.

## Usage

Do not add browser specific scrollbar CSS inside components. Scrollable panels only need their overflow behavior. The global foundation provides appearance consistently to the sidebar, search results, team switcher, dialogs, tables and page scroll.
