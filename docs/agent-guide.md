# Agent guide

This document is the maintained entry point for AI agents and automated
contributors working on Aevko UI.

## Read first

1. `AGENTS.md` for repository-wide rules and skill routing.
2. `docs/architecture.md` for product boundaries and workspace ownership.
3. `docs/component-status.md` before claiming component completion.
4. Accepted ADRs in `docs/decisions` for styling, compatibility, registry, docs
   presentation and icon boundaries.
5. `docs/release-checklist.md` for packaging or deployment work.

## Source ownership

- `registry/components` is the canonical installable component source.
- `registry/manifest` declares files and transitive dependencies.
- `public-registry` is generated; never hand-edit it.
- `packages/cli` publishes as `aevko-ui` and copies registry source into consumers.
- `apps/docs` imports canonical registry components for every preview.
- `apps/docs/public/brand` contains the versioned documentation brand assets.

Installable components must not depend on an Aevko runtime or on
`@lucide/angular`. Documentation may use individually imported Lucide icons.

## Component change boundary

A public component change is complete only when source, manifest, documentation,
unit behavior, accessibility and an isolated Angular consumer build all agree.
Use the `aevko-component-development` repository skill for this work.

Never add AI Elements, Kbd or Typography to the public component list. Preserve
native semantics, strict TypeScript, standalone Angular APIs, OnPush rendering and
SSR guards.

## Documentation boundary

Use the shared Monaco presentation and canonical component source. Examples are
Angular HTML/TypeScript/CSS, not React or TSX. Public copy is English. Default
geometry is square and the visual system stays neutral so consumer identity can
lead.

Use `aevko-documentation-design` for docs-facing UX and visual changes.

## Verification boundary

Run the smallest relevant checks while iterating, then the full release boundary:

```sh
pnpm format:check
pnpm registry:check
pnpm test
pnpm build
pnpm test:package
pnpm audit --prod
```

`pnpm test:package` packs the exact npm artifact, verifies its contents, installs
it in a clean Angular 22 app and builds a component installed by that packaged
CLI. Use `aevko-verification` before status or release-readiness claims.

## Release safety

- The publishable package is `aevko-ui`; registry and source workspace packages
  remain private.
- Do not publish npm packages, create releases, push tags or alter infrastructure
  without explicit authorization.
- Do not store npm tokens, DNS credentials or hosting credentials in the
  repository.
- Prefer npm Trusted Publishing with GitHub OIDC for releases after the first
  package version exists.
- The GitHub Pages artifact serves the generated registry at `/registry`.
- Treat `public-registry` and npm package contents as public data.

When blocked, record the exact failed command and evidence. Do not weaken tests,
accessibility rules or package boundaries to obtain a green status.
