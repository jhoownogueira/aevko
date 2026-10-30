---
name: aevko-documentation-design
description: Design or revise the Aevko UI documentation site, component examples, Monaco presentation, neutral themes, responsive shell, and internal Lucide usage. Use for docs-facing UX; not for adding an installable component by itself.
---

# Aevko documentation design

Use the canonical components from `registry/components`; never build a second docs-
only implementation of a public component. Read `AGENTS.md`, `docs/agent-guide.md`,
the accepted styling/icon ADRs and
[references/visual-contract.md](references/visual-contract.md) before material
visual changes.

## Documentation contract

- Present a working preview, complete formatted code, installation command with
  npm/pnpm/yarn/bun, copy action, customization guidance, structured API reference
  and an explicit accessibility contract.
- Use the shared Monaco component for code and terminal examples. Do not reintroduce
  ad-hoc `<pre>` blocks outside its SSR fallback.
- Lucide is optional and internal to docs/playground. Import individual exports
  from `@lucide/angular`; never register the collection or leak it into registry,
  CLI dependencies or consumer requirements.
- Keep UI copy and public documentation in English.
- Verify light/dark, desktop/mobile, keyboard focus, axe and visual snapshots.

Prefer clear information hierarchy over decorative density. API documentation
must come from implemented selectors, inputs, models and slots—not planned or
invented behavior.
