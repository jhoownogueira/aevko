# Architecture

## Product boundary

Aevko is a copy-to-project system, not a runtime component library. Canonical
Angular source is stored under `registry/components`. Composed application blocks
live under `registry/components/blocks` and use the same canonical primitives.
The registry compiler
validates metadata and produces immutable JSON artifacts in `public-registry`.
The CLI consumes those artifacts, resolves component and shared dependencies and
writes readable source into a consumer-owned path.

## Workspace areas

- `registry`: canonical component, block and shared source plus item manifests.
- `@lucide/angular`: optional first-party documentation dependency; never part
  of registry items or CLI-installed dependencies.
- `packages/registry`: schema validation and reproducible registry generation.
- `packages/cli`: `init`, `add`, `list` and `diff`; no component runtime.
- `apps/docs`: Angular documentation that imports canonical registry source.
- `tests/integration`: Angular workspaces created outside the pnpm workspace and
  built after CLI installation.

## Compatibility

Angular 22 is the baseline. Its official matrix requires Node
`^22.22.3 || ^24.15.0 || ^26.0.0`, TypeScript `>=6.0 <6.1` and RxJS
`^6.5.3 || ^7.4.0`. Angular 21 uses TypeScript `>=5.9 <6.0`; it therefore gets a
separate generated consumer rather than sharing the workspace compiler.

## Styling and ownership

Semantic CSS custom properties define the default theme. Component styles have
low specificity, no `!important`, no Shadow DOM and no inline visual values.
Consumer classes coexist on hosts and complex components expose compositional
parts. Installed files have no private workspace aliases.

## Security

Registry paths are normalized and must remain below configured roots. Remote
documents have schema and size limits. The CLI never executes downloaded code,
never overwrites by default and treats `--yes` separately from `--overwrite`.

## Documentation performance budget

The documentation renders previews from the same canonical source installed by
the CLI. Component pages, composed blocks and the chart gallery use route-level
chunks. Chart.js is a separate dynamic import: it loads only after a chart canvas
renders in the browser. SSR retains headings, legends and native data tables.
The base chart frame still supports projected visuals; the chart registry item
now declares Chart.js for its optional canvas renderer.

CI warns at 700 kB and fails at 750 kB for the initial browser payload; component
styles warn at 12 kB and fail at 13 kB. The documentation prerenders 131 routes,
including 27 isolated block previews. Block previews use the canonical block
source in same-origin frames, with responsive viewport controls and source views.

## Hosting boundary

GitHub Pages serves one static artifact containing the prerendered documentation
and generated registry. The stable `aevko.jhonata.dev` custom domain keeps the
CLI independent from the hosting provider. Deployment is allowed only for a
`main` commit that has passed the complete CI workflow.
