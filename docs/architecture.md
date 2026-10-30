# Architecture

## Product boundary

Aevko is a copy-to-project system, not a runtime component library. Canonical
Angular source is stored under `registry/components`. The registry compiler
validates metadata and produces immutable JSON artifacts in `public-registry`.
The CLI consumes those artifacts, resolves component and shared dependencies and
writes readable source into a consumer-owned path.

## Workspace areas

- `registry`: canonical component and shared source plus item manifests.
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

The documentation deliberately renders previews from the same canonical source
installed by the CLI. With all 64 previews available, the production browser
bundle is 644.03 kB raw and 139.62 kB estimated transfer. CI warns at 675 kB and
fails at 750 kB; component styles warn at 7 kB and fail at 8 kB. Route-level
preview splitting remains a future optimization, while these explicit thresholds
prevent silent growth in the current architecture.

## Hosting boundary

GitHub Pages serves one static artifact containing the prerendered documentation
and generated registry. The stable `aevko.jhonata.dev` custom domain keeps the
CLI independent from the hosting provider. Deployment is allowed only for a
`main` commit that has passed the complete CI workflow.
