# Component vertical slice

1. Inspect related source, manifests, examples and PDFs before choosing the API.
2. Implement complete source under `registry/components/<slug>/` and export it
   from `index.ts`.
3. Add `registry/manifest/<slug>.json` with only real registry/npm dependencies.
4. Build the registry and install the item through the CLI into a clean Angular
   application. The consumer must build without Lucide or an Aevko runtime.
5. Add a functional docs preview using canonical registry source, a complete code
   example, installation command, API rows, customization guidance and an
   accessibility contract.
6. Add unit tests for state/semantics and axe. Add keyboard, light/dark, responsive
   or visual E2E coverage where behavior warrants it.
7. Add the slug to prerender and consumer matrices only when those workflows can
   actually exercise it.
8. Run Prettier, `pnpm registry:check`, `pnpm test`, the relevant Playwright flow,
   and `AEVKO_COMPONENTS=<slug> pnpm test:consumer`.

For native tabular/form controls, style native elements rather than replacing
their semantics. For overlays or composite widgets, document the keyboard and
focus contract before declaring the slice complete.
