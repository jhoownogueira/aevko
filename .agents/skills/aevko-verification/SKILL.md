---
name: aevko-verification
description: Verify Aevko UI registry, CLI, docs, SSR, formatting, icon boundaries, visual tests, and clean Angular consumer installations before status or roadmap claims. Use for release-readiness and evidence audits, not as a substitute for implementation.
---

# Aevko verification

Report evidence, not intent. Read `AGENTS.md`, `docs/component-status.md` and the
affected manifests before selecting checks. Use the smallest relevant test set
during iteration, then run the full required boundary before claiming completion.

## Required boundaries

- `pnpm format:check`
- `pnpm registry:check`
- `pnpm test` for CLI, Angular unit/axe and Lucide boundary checks
- `pnpm --filter @aevko/docs build` for SSR/prerender
- relevant Playwright keyboard/axe/visual flows in both themes
- `AEVKO_COMPONENTS=<comma-separated slugs> pnpm test:consumer` for individual
  clean Angular production builds

The consumer check must confirm no Aevko runtime and no `@lucide/angular`
dependency. A docs build alone is not component installation evidence.

When a check fails, fix the product or test at the violated boundary; do not weaken
accessibility rules or update a snapshot without inspecting the rendered result.
Only then update status and roadmap. Include exact passing counts and distinguish
targeted evidence from the full suite in the handoff.
