# Visual and interaction review

Date: 2026-10-31

## Scope

The Zard UI reference informed the centered landing page, spacious component
showcase, quieter typography, neutral surfaces, and consistent control styling.
Aevko retains its versioned brand assets and square default geometry.

Canonical component styles now share lighter border fallbacks, consistent text
weights, soft surface shadows, and theme tokens. Local operating-system dark-mode
overrides no longer contradict the application's explicit theme selection.
Secondary text and focus tokens have been adjusted for contrast.

The sidebar preview demonstrates a workspace with active navigation and an icon
rail. Its collapse control no longer collides with Tailwind's `collapse` utility.
Mobile navigation closes on Escape or outside focus and restores trigger focus
when explicitly closed. Hidden panels no longer remain displayed because of grid
layout rules.

Popover, dropdown menu, select, combobox, hover card, and tooltip share an
SSR-safe floating directive, included in each affected registry item. It clamps
surfaces to the viewport and updates on scroll and resize. Context menus also
clamp to the viewport. Pointer and focus dismissal, Escape behavior, select ARIA
semantics, and delayed hover dismissal have been corrected. Menu styles use
explicit component-scoped selectors without `::ng-deep`.

The documentation search restores and contains keyboard focus. Theme preference
survives reloads. The landing showcase and installation section fit mobile screens.

## Evidence

- Registry validation: 65 components and 27 blocks, generated output current.
- Unit suite: 51 Angular tests and 5 CLI tests passed; icon boundary passed.
- Consumer suite: all 65 individual Angular production installations passed,
  including checks against mandatory Aevko runtime and Lucide dependencies.
  Sidebar installation was repeated after its final interaction changes.
- Browser audit: all 65 documentation previews at 1440 and 390 pixels, in light
  and dark themes: 260 cases, zero axe violations and zero page horizontal overflow.
- Open-state checks: popover, dropdown, select, combobox, context menu and sidebar
  had no axe violations in the tested mobile examples.
- Interaction checks: five floating surfaces start closed, fit the viewport when
  opened, and dismiss outside; sidebar expands/collapses, closes with Escape on
  mobile and returns focus to its trigger.
- Home page: mobile overflow check and desktop/mobile screenshots passed.
- Production SSR build: 104 routes prerendered. Initial bundle is 709.12 kB,
  above the 700 kB warning threshold and below the 750 kB error threshold.
- Prettier check passed.

These results cover Chromium and the supplied previews, not every possible
consumer composition, assistive technology, or browser. Automated axe results
are not a claim of complete accessibility certification.

## Reproduce

```sh
pnpm exec playwright install chromium
pnpm --filter @aevko/docs start --host 127.0.0.1 --port 4527
# In another terminal:
pnpm test:browser
```

Set `AEVKO_DOCS_URL` to audit another local docs server. The browser scripts write
screenshots and structured results to `tmp/visual-audit`, plus home and sidebar
screenshots in `tmp`. They do not publish artifacts. Theme contrast is measured
after finite CSS transitions complete.

## Scope correction — 2026-11-03

The October audit above was an automated preview audit and a shared-style pass.
It did **not** establish individual visual or example parity with Zard UI. It
must not be interpreted as evidence that every component was compared with its
reference page or that all interactions and variants were reviewed.

The Accordion reference was individually reviewed on November 3:
https://zardui.com/docs/components/accordion. Its basic, multiple, disabled,
bordered, and card compositions are now represented by original Aevko examples
with complete Angular source. The canonical component now animates both opening
and closing without using `display: none`, and closes its accessibility subtree
with `inert` and `aria-hidden`. Reduced motion remains supported.

Manual installation now loads canonical source and transitive registry
components for every documentation page instead of displaying an instruction
JSON. Local development serves the generated registry, synchronized by the
prestart and prebuild hooks. Clipboard actions have a fallback and the code
editor announces copy failures. Installation tabs support keyboard navigation.

Run `pnpm test:docs-controls` against the docs server on port 4200 (or set
`AEVKO_DOCS_URL`) to verify documentation actions and the Accordion examples.
This does not establish reference parity for the remaining 64 components.

## Remaining component examples — 2026-11-04

The remaining 64 components now have 131 additional, working examples. The
per-component reference inventory is in [Component example review](component-example-review.md).
It records the 54 corresponding Zard documentation pages, the dropdown/sonner
aliases, and the 10 Aevko-specific components without dedicated Zard pages.
Examples follow the implemented Aevko APIs; the inventory explicitly records
reference capabilities that are not implemented. This is not a claim of complete
API or pixel parity.

The source displayed in each additional example is the complete standalone
Angular component used by its live preview, including styles and dependency
commands. Sources are generated from `apps/docs/examples/catalog.mjs` during
prestart/prebuild. Main previews now also respond to save, duplicate, copy URL,
download, reply, reaction, alignment and volume actions.

Canonical fixes include animated Collapsible disclosure with inert closed
content; reduced-motion-aware overlay entrance; correct right-side dialog
placement; Context Menu styles scoped to its panel instead of projected trigger
divs; unique configurable Sidebar/Date Picker relationships; an accessible empty
Command state; and configurable names for composed toaster regions.

Verification completed:

- Production docs build: 104 prerendered routes; initial bundle remains below the
  existing 700 kB warning budget after lazy-loading page routes.
- Registry validation, icon boundary, 5 CLI tests and 61 Angular tests pass.
- Primary previews: 260 desktop/mobile/theme cases, zero axe or overflow failures.
- Additional examples: 256 desktop/mobile/theme cases covering all 131 examples,
  zero axe violations, page overflow or runtime errors. Command, Table and Toast
  were rechecked after fixing the audit findings.
- All 131 additional code controls copy complete source and toggle correctly;
  all 64 example pages have unique DOM IDs. The six examples changed in the last
  accessibility correction were rechecked separately.
- Documentation controls pass on all 65 pages. Accordion motion, reduced motion,
  installation controls, responsive home and sidebar navigation also pass.
- Browser interaction checks pass for outside-click/Escape dismissal, modal save
  and confirmation, right drawer placement, Collapsible motion, sidebar backdrop,
  isolated toast stores/undo and button feedback.
- Individual CLI installation and clean production consumer builds pass for the
  16 affected components: sidebar, collapsible, dialog, sheet, drawer,
  alert-dialog, popover, dropdown-menu, context-menu, select, combobox,
  hover-card, tooltip, date-picker, command and toast. This is targeted consumer
  evidence, not a new full 65-component consumer run.

Run `pnpm test:examples` against a running docs server, or set `AEVKO_DOCS_URL`.
Raw browser results and screenshots are under `tmp/examples-audit` and
`tmp/visual-audit`. Release/status rows are not changed by this review.
