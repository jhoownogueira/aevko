# Aevko UI

Aevko UI is a source-owned Angular component system. The CLI copies accessible,
editable component source into an application instead of adding a UI runtime that
the application must keep forever.

- 65 documented Angular components and 27 editable application blocks
- Angular 22, standalone APIs and strict TypeScript
- Tailwind CSS 4 initialization with semantic CSS variables
- Light, dark and RTL behavior
- SSR-safe documentation and component implementations
- Granular installation with transitive source dependencies
- No mandatory icon package or `@aevko/ui` runtime

The public CLI package is `aevko-ui`. The source registry is served from
`https://aevko.jhonata.dev/registry`.

## Quick start

From an Angular 22 standalone application:

```sh
npx aevko-ui@latest init --yes
npx aevko-ui@latest add button --yes
npx aevko-ui@latest add dashboard-01 --yes
```

Import the generated source from your application:

```ts
import { AevkoButton } from './ui/button';
```

```html
<button aevkoButton>Save changes</button>
```

The generated files belong to your project. Review, edit and version them like any
other application source.

## Requirements

- Angular 22
- Node.js `^22.22.3 || ^24.15.0 || ^26.0.0`
- A standalone Angular application

Angular 21 is not advertised as supported until its separate consumer suite
passes.

## CLI

| Command                                      | Purpose                                      |
| -------------------------------------------- | -------------------------------------------- |
| `npx aevko-ui@latest init --yes`             | Create `aevko.json` and merge theme tooling. |
| `npx aevko-ui@latest add button --yes`       | Install one component and dependencies.      |
| `npx aevko-ui@latest add button card --yes`  | Install several components.                  |
| `npx aevko-ui@latest list`                   | List registry components and blocks.         |
| `npx aevko-ui@latest diff button`            | Compare installed and canonical source.      |
| `npx aevko-ui@latest add button --dry-run`   | Preview changes without writing.             |
| `npx aevko-ui@latest add button --overwrite` | Explicitly replace conflicting files.        |
| `npx aevko-ui@latest --help`                 | Show all options.                            |

Use `--registry <path-or-https-url>` to test another registry. `--yes` accepts
safe initialization defaults but never implies `--overwrite`.

## Styling and icons

Components use low-specificity CSS and semantic `--aevko-*` variables. Defaults
are neutral, square and intentionally easy to replace without `!important`.

Installable components do not depend on Lucide. Projected content and icon slots
accept inline SVG, `@lucide/angular`, Tabler, Heroicons, images or custom Angular
components. The documentation uses individual `@lucide/angular` imports only.

Versioned documentation brand assets live in `apps/docs/public/brand`.

## Repository architecture

```text
apps/docs                 Angular documentation and canonical previews
packages/cli              Published aevko-ui CLI
packages/registry         Registry validation and generation
registry/components       Canonical installable Angular source
registry/manifest         Component files and dependency metadata
registry/block-manifest   Composed block files and dependency metadata
public-registry           Generated HTTP registry
tests/integration         Clean Angular consumer and package tests
docs                      Architecture, ADRs, status and release guidance
.agents/skills            Repository-specific agent workflows
```

The registry source is canonical. Documentation previews and consumer tests must
exercise that same source rather than a docs-only copy.

## Local development

```sh
pnpm install
pnpm registry:build
pnpm docs:dev
```

Full verification:

```sh
pnpm format:check
pnpm registry:check
pnpm test
pnpm build
pnpm audit --prod
```

Verify the exact npm artifact in an independent Angular project:

```sh
pnpm test:package
```

This command runs `npm pack`, checks the tarball allowlist, installs it in a clean
Angular 22 application, initializes Aevko, installs Button and performs a
production build.

Run all 65 isolated component consumers with:

```sh
pnpm test:consumer
```

Run all 27 isolated block consumers with:

```sh
pnpm test:blocks
```

## Charts and live blocks

The `/charts` gallery includes 12 interactive Chart.js examples with complete
Angular source. Install `chart` to use `AevkoChartCanvas`, its keyboard-operable
legend and automatically generated data table. Chart.js is loaded on demand in
the browser and stays out of the SSR rendering path.

The `/blocks` gallery previews all 27 canonical compositions with desktop,
tablet and mobile widths, installation commands and complete source. The
`dashboard-01` block includes Chart.js analytics, period selection, project
search/creation and CSV export. See [Charts and blocks](docs/charts-and-blocks.md).

## Documentation deployment

GitHub Pages serves the prerendered documentation and generated registry as one
static artifact. Build the exact deployment directory locally with:

```sh
pnpm pages:build
```

Every successful `main` CI run deploys `dist/pages` through the protected
`github-pages` environment. See [`docs/deployment.md`](docs/deployment.md) for the
one-time repository and DNS setup.

## Project documentation

- [`docs/architecture.md`](docs/architecture.md)
- [`docs/component-status.md`](docs/component-status.md)
- [`docs/release-checklist.md`](docs/release-checklist.md)
- [`docs/version-1.0.md`](docs/version-1.0.md)
- [`docs/releasing.md`](docs/releasing.md)
- [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md)
- [`docs/deployment.md`](docs/deployment.md)
- [`docs/agent-guide.md`](docs/agent-guide.md)
- [`AGENTS.md`](AGENTS.md)

## Contributing

Read [`CONTRIBUTING.md`](CONTRIBUTING.md). Component changes require source,
registry metadata, documentation, accessibility evidence and an isolated consumer
build. Public code, identifiers and documentation are written in English.

## License

MIT. See [`LICENSE`](LICENSE).
