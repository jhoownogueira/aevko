# Version 1.0 release readiness

This checklist records readiness evidence without publishing a package, creating
a release or changing external infrastructure.

## Scope and compatibility

- [x] Registry contains exactly 65 public components.
- [x] The separate block index contains 27 editable compositions built from
      canonical components.
- [x] AI Elements and Typography are not public registry items.
- [x] Angular 22 is the tested baseline with strict TypeScript.
- [x] Angular 21 is not advertised as supported because its separate consumer
      suite has not passed yet.
- [x] Installable source has no Aevko runtime or Lucide dependency.

## Build and behavior

- [x] Registry validation and reproducible generation pass.
- [x] CLI tests pass and transitive component dependencies install automatically.
- [x] Individual Angular 22 consumer production builds cover all 65 components
      and all 27 blocks.
- [x] Unit and axe accessibility tests pass.
- [x] SSR prerenders all 131 documentation routes without browser-global failures.
- [x] RTL behavior is covered by component tests and canonical documentation
      examples.
- [x] Prettier passes across source, tests and documentation.
- [x] `npm pack --dry-run` contains only package metadata, README, license and the
      bundled CLI executable.
- [x] `pnpm test:package` installs `aevko-ui-0.1.1.tgz` in a clean Angular 22 app,
      runs the packaged binary, installs Button and completes a production build.
- [x] The GitHub Pages artifact contains the prerendered documentation, generated
      registry, SPA fallback, license and `.nojekyll` marker.
- [x] The packed local CLI exposes both documented binaries. Version 1.0 is
      prepared for the Release Please handoff, not published by this review.

## Dependencies, licenses and assets

- [x] `pnpm licenses list --json` reports recognized permissive or weak-copyleft
      workspace dependency licenses: MIT, MIT-0, Apache-2.0, BSD-2-Clause,
      BSD-3-Clause, 0BSD, ISC, BlueOak-1.0.0, CC0-1.0 and MPL-2.0.
- [x] MPL-2.0 entries are build/test tooling and are not copied into registry
      component source.
- [x] Production builds extract third-party license notices.
- [x] `pnpm audit --prod` reports no known vulnerabilities. The workspace pins
      DOMPurify 3.4.17 because Monaco 0.57 otherwise resolves a vulnerable 3.4.15.
- [ ] Upstream Angular build tooling has a peer-range mismatch between
      `@oxc-parser/binding-wasm32-wasi` and `@napi-rs/wasm-runtime` for the
      optional WASM fallback. Production builds pass with the native binding; do
      not force an incompatible peer override. Recheck on the next Angular patch.
- [ ] Confirm public redistribution rights for the three checked-in brand assets
      before publishing the version 1.0 site.
- [x] Release builds validate the versioned documentation assets and never
      reconstruct them.

## Review evidence — 2026-11-04

- 94 Angular unit/accessibility tests and 5 CLI tests pass.
- All 65 individual component and 27 block Angular 22 consumer builds pass.
  Accordion was rebuilt after its accessible-name update. Sidebar 01, 07 and
  16 were rebuilt after the shared anchor-navigation correction; all 16 sidebar
  variants also pass their browser interaction and unit coverage.
- 208 complete-page desktop/mobile audits pass accessibility, local-link,
  overflow and runtime checks across 104 public routes.
- 260 component preview cases and 256 additional-example cases pass across
  desktop/mobile and light/dark configurations.
- All 65 component installation/source controls and 141 complete example copy
  controls pass. Accordion additionally exercises its five compiled examples.
- 52 authentication/sidebar desktop/mobile workflows and nine primary component
  actions pass. Eight chart/dashboard cases include tooltips and reduced motion.
- Production prerender emits 131 routes, including 27 embedded block previews.
- The exact local CLI tarball passes installation and a clean Angular build.
- Formatting, current registry generation, production dependency audit and the
  local GitHub Pages artifact pass.

Reproduce these checks using the scripts in `package.json`. Browser evidence is
written to `tmp/release-review`, `tmp/visual-audit`, `tmp/examples-audit` and
`tmp/chart-audit`. The directories are generated local evidence, not published
package content. Full installation checks are intentionally separate from the
routine unit suite.

See [candidate changes and migration](version-1.0.md). The current package remains
0.1.1 until Release Please prepares the 1.0.0 version pull request. Brand provenance
and the optional upstream WASM peer mismatch above remain explicit prerequisites
or tracked limitations; this document does not claim either was resolved by tests.

## Future releases

Release Please prepares version and changelog pull requests. Merging one is the
explicit authorization to create its GitHub Release and publish the verified npm
artifact through Trusted Publishing. Manual package publication and long-lived
npm tokens are not part of the maintained release path.
