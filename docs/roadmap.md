# Roadmap

Last updated: 2026-10-30

Status values reflect executed evidence only.

## Phase 0 - Foundation proven (complete)

- [x] Record workspace, registry, compatibility and styling decisions.
- [x] Build Angular 22 docs shell and isolated consumer workflow.
- [x] Validate registry and local publishing artifacts.
- [x] Implement CLI `init`, `add`, `list`, `diff`, dry run and safe conflicts.
- [x] Complete Button, Card and Separator vertical slices.
- [x] Run individual clean Angular consumer builds for all three components.

## Phase 1 - Structure and basics (complete)

- [x] All 12 layout components pass registry, docs, unit/axe, E2E and isolated
      Angular 22 installation.
- [x] Complete the first native forms slice: Field, Input, Label, Native Select
      and Textarea.
- [x] Complete low-risk action, form, feedback and content primitives.

Current evidence: 64 / 64 components complete.

## Phase 2 - Forms, keyboard and overlays (complete)

Complete form controls, menu systems and overlays with forms, keyboard and focus
tests. Share only behavior with demonstrated reuse.

## Phase 3 - Data and advanced components (complete)

Complete advanced layout, table, chart, code and message components. Keep heavy
engines optional and registry-scoped.

## Phase 4 - Integral closure (complete)

Audit exactly 64 components, docs, light/dark, RTL, mobile/desktop, Angular
compatibility, release metadata and isolated installation evidence.

- [x] All 64 rows have source, registry, granular CLI, docs, unit, axe and E2E
      evidence.
- [x] Registry and installable source remain free of Lucide and an Aevko runtime.
- [x] Angular 22 production consumers build after individual installation.
- [x] SSR prerenders 72 routes; desktop and mobile browser checks pass.
- [x] Record a production bundle benchmark and enforce explicit warning/error
      budgets without build warnings.
- [x] Complete the final RTL, dependency/license and release-readiness audit;
      public release remains held for brand-asset provenance and authorization.

## Verification log

### Phase 0 - 2026-10-29

- `pnpm test`: registry current; CLI 3/3; Angular component/axe 2/2.
- `pnpm --filter @aevko/docs build`: 9 routes prerendered with SSR bundle.
- `pnpm test:consumer`: clean Angular 22 production builds passed independently
  for `button`, `card` and `separator`; no Aevko runtime dependency.
- `pnpm test:e2e`: 3 targeted flows passed in desktop/mobile Chromium, with axe,
  keyboard focus, light/dark and visual snapshots.
- `pnpm format:check`: all tracked source and documentation files match Prettier.

### Phase 1 layout slice - 2026-10-29

- Registry contains 13 verified items (12 layout plus Button).
- Angular tests pass 4/4 across two files; docs prerender 20 routes.
- Playwright passes 5 targeted desktop/mobile flows covering 13 component pages.
- `pnpm test:consumer` passes 13 independent Angular 22 production builds.

### Phase 1 native forms slice - 2026-10-29

- Registry contains 18 verified items; the five new form primitives preserve
  native elements and Angular Reactive Forms behavior.
- Documentation uses a local, lazy-loaded Monaco 0.57 editor with SSR fallback,
  read-only semantics and accessible Aevko light/dark themes.
- Angular tests pass 5/5; docs prerender 25 routes.
- Playwright passes all targeted flows and axe checks across 18 component pages.
- `pnpm test:consumer` passes 18 independent clean Angular 22 production builds
  with no Aevko runtime dependency.

### Neutral identity refresh - 2026-10-29

- Canonical `logo.svg`, `logo-icon.svg` and `favicon.svg` are versioned with the
  documentation application and validated before tests and production builds.
- Default tokens now use a black, white and gray scale; component radius is `0`.
- Documentation typography, containers and vertical rhythm use a denser editorial
  scale, verified with desktop and mobile visual snapshots.
- Angular/CLI tests, 25-route SSR build, axe across all 18 component pages and
  seven targeted Playwright flows pass with the refreshed identity.

### Documentation, icons and neutral-state refinement - 2026-10-29

- Documentation uses a persistent guide/component sidebar and unified preview +
  Monaco presentation, including package-manager tabs, icon-only copy actions and
  consistent editors on Getting Started, Theming and CLI pages.
- Official `@lucide/angular` standalone imports are limited to the docs app;
  installable registry components use projected icon slots or replaceable inline
  SVG fallbacks and remain Lucide-free.
- Neutral tokens now separate near-white/near-black canvases, muted surfaces and
  subtle borders; focus uses a consistent 2 px gray ring instead of a high-contrast
  black/white treatment. Radius remains `0` by default.
- Registry boundary tests, SSR prerender, axe, visual snapshots and independent
  Angular consumer builds cover the updated documentation and icon boundaries.

### Phase 1 table slice - 2026-10-29

- Added source-owned native Table primitives for container, table, row groups,
  rows, headers, cells and caption; no data engine or runtime dependency.
- Component API documentation now uses the Aevko Table itself and separates
  built-in accessibility behavior from consumer responsibilities.
- Unit/axe, SSR docs, CLI registry installation and an independent Angular 22
  production consumer build pass for `table` without Lucide installed.

### Agent workflow skills - 2026-10-29

- Added repository-local skills for component vertical slices, documentation
  design and evidence-based verification under `.agents/skills/`.
- `AGENTS.md` routes agents to the appropriate skill so public implementation,
  internal presentation and readiness audits keep distinct boundaries.
- All three skills pass the skill-creator structural/frontmatter validator.

### Phase 1 basic action and feedback slice - 2026-10-29

- Added Button Group, Toggle, Badge, Alert, Progress, Spinner and Skeleton as
  complete source-owned components. Button Group installs Button transitively;
  the other six remain dependency-free.
- Toggle keyboard/pressed state, Alert live semantics, Progress ranges and
  Spinner/Skeleton reduced-motion behavior have unit, axe and E2E evidence.
- Registry contains 26 items, docs prerender 34 routes, Angular tests pass 8/8,
  and all seven clean Angular 22 consumer builds pass without Lucide or an Aevko
  runtime dependency.

### Phase 1 basic content and navigation slice - 2026-10-29

- Added Avatar, Attachment, Marker and Pagination with native image/button/text
  semantics, controlled pagination state and no implicit upload behavior.
- Angular tests pass 9/9; docs prerender 38 routes; axe passes across all 30 ready
  component pages, including Pagination keyboard interaction.
- All four independent Angular 22 consumer builds pass without Lucide or an Aevko
  runtime dependency. Registry now contains 30 complete items.

### Phase 1 communication and path slice - 2026-10-29

- Added Breadcrumb, Bubble, Message and Trace as compositional Angular primitives,
  following the current shadcn/ui separation between path items, message rows,
  conversational surfaces and execution traces.
- Axe-driven corrections preserve list relationships through Angular component
  hosts and avoid accidental banner landmarks; visible reaction labels match their
  accessible names.
- Registry contains 34 items, Angular and CLI suites pass 10/10 and 3/3, docs
  prerender 42 routes, and axe passes across all 34 component pages.
- All four independent Angular 22 consumer builds pass after individual CLI
  installation, with no Lucide or Aevko runtime dependency.

### Phase 2 native selection controls slice - 2026-10-29

- Added Checkbox, Switch and Radio Group on native inputs/fieldset so browser
  keyboard behavior, form submission and Angular Forms remain intact.
- Added controlled single/multiple Toggle Group with native pressed buttons and
  arrow, Home and End focus movement. All defaults retain zero radius.
- Registry contains 38 items, Angular and CLI suites pass 11/11 and 3/3, docs
  prerender 46 routes, and axe passes across all 38 component pages.
- All four independent Angular 22 consumer builds pass after individual CLI
  installation without Lucide or an Aevko runtime dependency.

### Phase 2 advanced input and transcript slice - 2026-10-29

- Added Input Group, Input OTP and Slider using native form controls and Angular
  Forms integration. OTP keeps one accessible input for paste, autofill and
  backspace while presenting decorative character slots.
- Added Message Scroller with explicit opt-in live following, prepended-history
  position preservation, stable message ids, jump-to-latest control and SSR-safe
  browser observers.
- Registry contains 42 items, Angular and CLI suites pass 12/12 and 3/3, docs
  prerender 50 routes, and axe passes across all 42 component pages.
- All four independent Angular 22 consumer builds pass after individual CLI
  installation without Lucide or an Aevko runtime dependency.
- The docs build passes but currently reports an initial-bundle budget warning;
  route-level code splitting remains a Phase 4 optimization before closure.

### Phase 3 tabs and code presentation slice - 2026-10-29

- Added compositional Tabs with controlled value, horizontal/vertical layouts,
  automatic/manual activation and Arrow/Home/End keyboard navigation.
- Added SSR-safe Code Block primitives for headers, focusable LTR content, line
  numbers, wrapping, diff/highlight lines, footer composition and clipboard copy.
  Syntax highlighting remains optional and outside the base installation.
- Registry contains 44 items, Angular and CLI suites pass 12/12 and 3/3, docs
  prerender 52 routes, and axe passes across all 44 component pages.
- Both independent Angular 22 consumer builds pass after individual CLI
  installation without Lucide or an Aevko runtime dependency.

### Phase 3 chart and data-table slice - 2026-10-29

- Added an engine-agnostic Chart frame with explicit legend and semantic data
  slots; consumers opt into and own any chart engine dependency.
- Added a typed native Data Table with local or manual filtering, sorting,
  selection, pagination, loading and empty states while keeping domain formatting
  in consumer column accessors.
- Registry contains 46 items, Angular and CLI suites pass 13/13 and 3/3, docs
  prerender 54 routes, and axe passes across all 46 component pages.
- Both independent Angular 22 consumer builds pass after individual CLI
  installation without Lucide or an Aevko runtime dependency.

### Phase 3 native modal overlay slice - 2026-10-29

- Added Dialog, Alert Dialog, Drawer and Sheet on the native dialog element with
  controlled state, initial focus, Escape/backdrop policies and focus restoration.
- Alert Dialog prevents backdrop dismissal and exposes alertdialog semantics;
  Drawer and Sheet reuse the dialog contract while providing edge placement.
- Registry contains 50 items, Angular tests pass 14/14, docs prerender 58 routes
  and axe passes across all 50 component pages.
- All four independent Angular 22 consumer builds pass after individual CLI
  installation without Lucide, Base UI, Vaul or an Aevko runtime dependency.
- Functional Playwright flows pass; existing catalog screenshot requires its
  intentional ready-status baseline refresh after the remaining components land.

### Phase 3 non-modal overlay and toast slice - 2026-10-30

- Added Popover, Hover Card and Tooltip with projected native triggers, explicit
  trigger relationships, keyboard/pointer parity, placement and controlled state.
- Added a dependency-free Toast store and toaster with actions, dismissal,
  duration, neutral tones and polite/assertive announcement semantics.
- Registry contains 54 items, Angular tests pass 14/14 and docs prerender 62
  routes; focused Playwright interaction flows pass.
- All four clean Angular 22 consumer builds pass after individual installation
  without Lucide, Base UI, Sonner or an Aevko runtime dependency.

### Phase 3 command and navigation slice - 2026-10-30

- Added Command, Dropdown Menu, Context Menu, Menubar and Navigation Menu with
  controlled state, native triggers and documented keyboard behavior.
- Registry contains 59 items; each of the five components passes an independent
  Angular 22 CLI install and production consumer build.
- Focused Playwright flows cover Arrow, Enter, Escape and pointer activation;
  axe-driven active-state contrast corrections are included in the source.

### Phase 3 date, selection and questionnaire slice - 2026-10-30

- Added Calendar, Combobox, Date Picker, Questionnaire and Select. Date Picker
  installs Calendar and Popover transitively; the remaining items stay granular.
- Calendar exposes ISO date/month state and a keyboard grid. Questionnaire keeps
  native fieldset, radio and checkbox semantics for single, multiple, freeform,
  required and skippable steps.
- All five independent Angular 22 CLI installs and production builds pass without
  Lucide or an Aevko runtime dependency.

### Component scope closure - 2026-10-30

- Registry validation reports exactly 64 current items and the status matrix is
  64/64 with source, registry, CLI, docs, unit, accessibility and E2E evidence.
- Angular tests pass 16/16, CLI tests pass 3/3, icon-boundary checks pass, and the
  docs SSR build prerenders 72 routes.
- Axe passes across every component page. Functional desktop flows and mobile
  navigation pass; intentional 64-item catalog and layout snapshots were reviewed
  and refreshed.
- Phase 4 verification is complete. Public release remains intentionally held for
  brand-asset provenance and explicit authorization; no component remains pending.

### Phase 4 integral closure - 2026-10-30

- The production documentation build enforces a 675 kB warning and 750 kB error
  budget against a measured 644.03 kB raw / 139.62 kB estimated-transfer bundle.
- Targeted RTL checks cover navigation, calendar and date selection without page
  overflow or axe violations.
- Workspace licenses were inventoried and the release checklist records the one
  external prerequisite: confirm redistribution rights for supplied brand assets.
- The production audit is clean after pinning DOMPurify 3.4.17. An upstream
  optional-WASM peer mismatch in Angular build tooling is recorded for recheck.
- Publishing remains intentionally out of scope and requires explicit future
  authorization.

### Publication preparation - 2026-10-30

- Prepared the unscoped `aevko-ui` 0.1.0 package with public metadata, a strict
  four-file tarball allowlist and `aevko-ui` / `aevko` executable names.
- Public documentation commands use `npx aevko-ui@latest`; CLI and registry now
  reject unverified Angular majors and advertise Angular 22 only.
- The packaged CLI passed an independent Angular 22 initialization, Button
  installation and production build with no Aevko runtime or Lucide dependency.
- Added a multi-stage documentation image, loopback-only Compose service and
  Nginx routes for prerendered pages, health checks and the public registry.
