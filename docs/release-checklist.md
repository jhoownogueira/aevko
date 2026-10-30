# Release readiness

This checklist records readiness evidence without publishing a package, creating
a release or changing external infrastructure.

## Scope and compatibility

- [x] Registry contains exactly 64 public components.
- [x] AI Elements, Kbd and Typography are not public registry items.
- [x] Angular 22 is the tested baseline with strict TypeScript.
- [x] Angular 21 is not advertised as supported because its separate consumer
      suite has not passed yet.
- [x] Installable source has no Aevko runtime or Lucide dependency.

## Build and behavior

- [x] Registry validation and reproducible generation pass.
- [x] CLI tests pass and transitive component dependencies install automatically.
- [x] Individual Angular 22 consumer production builds cover every registry item.
- [x] Unit and axe tests pass; desktop interactions and mobile navigation pass.
- [x] SSR prerenders all 72 documentation routes without browser-global failures.
- [x] Light/dark snapshots and targeted RTL audits are current.
- [x] Prettier passes across source, tests and documentation.
- [x] `npm pack --dry-run` contains only package metadata, README, license and the
      bundled CLI executable.
- [x] `pnpm test:package` installs `aevko-ui-0.1.0.tgz` in a clean Angular 22 app,
      runs the packaged binary, installs Button and completes a production build.
- [x] The GitHub Pages artifact contains the prerendered documentation, generated
      registry, SPA fallback, license and `.nojekyll` marker.

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
      before the first public release.
- [x] Release builds validate the versioned documentation assets and never
      reconstruct them.

## Release hold

No publish or release action is authorized. Before a future release, confirm the
brand-asset provenance item above, choose a version, review generated artifacts,
recheck the upstream Angular peer mismatch, run CI from a clean checkout and
obtain explicit publication authorization.
