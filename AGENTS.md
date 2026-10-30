# Repository instructions

- Treat `README.md`, `docs/architecture.md`, accepted ADRs and the release/status
  documents as the maintained product and engineering contract.
- Canonical brand assets are versioned in `apps/docs/public/brand`. Do not replace
  them without explicit design approval.
- Public code, identifiers, documentation and UI copy are written in English.
- `registry/components` is the canonical component source. Documentation and
  consumer tests must exercise that same source.
- A component is not `done` until its source, registry metadata, individual CLI
  install, documentation, unit, accessibility and isolated consumer evidence
  exist.
- Use standalone Angular components/directives, strict TypeScript and
  `ChangeDetectionStrategy.OnPush` where components render views.
- Avoid browser globals without SSR guards. Preserve native semantics whenever
  possible.
- Run Prettier, tests, registry validation and isolated consumer builds before
  changing status rows.
- Do not add AI Elements, Kbd or Typography to the public component list.
- Do not publish packages, create releases or alter external infrastructure.

## Project skills

- Use `.agents/skills/aevko-component-development` when creating or changing an
  installable component.
- Use `.agents/skills/aevko-documentation-design` for docs, examples, visual
  system, Monaco or internal Lucide work.
- Use `.agents/skills/aevko-verification` when validating registry/CLI changes,
  consumer installation evidence, status or roadmap claims.

Read `docs/agent-guide.md` before broad implementation or release work.
