---
name: aevko-component-development
description: Build or change installable Aevko UI Angular components, including native semantics, projection APIs, registry metadata, tests, docs, and isolated installation evidence. Use for component implementation; not for docs-only presentation work.
---

# Aevko component development

Treat `registry/components` as canonical. Before implementation, read the relevant
requirements in `instrucoes.md`, `AGENTS.md`, and the matching visual references in
`layout/`. Do not infer readiness from a catalog name or a reference screenshot.

## Invariants

- Prefer native HTML semantics, standalone Angular, strict typing and
  `ChangeDetectionStrategy.OnPush` for rendered views.
- Components are source-owned and independently installable. Do not add an Aevko
  runtime package.
- Registry source must not import `@lucide/angular` or `lucide-angular`. Project
  optional visuals through named content slots. Mandatory internal controls may
  use small inline SVG fallbacks with `currentColor` and replaceable slots.
- Keep styling token-driven and consumer-overridable without `!important` or
  `::ng-deep`. Default radius is `0`; focus is a visible neutral-gray 2 px ring.
- Preserve SSR: guard browser-only APIs and test server builds.
- Do not mark a component done until every evidence column is real.

## Vertical slice

Read [references/component-slice.md](references/component-slice.md) before adding a
new component or changing its public API. Reuse an existing primitive only when it
improves semantics or removes demonstrated duplication; do not add speculative
abstractions.

Finish by running the relevant formatter, unit/axe, registry, docs/E2E and isolated
consumer checks. Update `docs/component-status.md` and `docs/roadmap.md` only after
those checks pass.
