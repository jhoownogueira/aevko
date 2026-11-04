# Third-party notices

Aevko source is distributed under the repository MIT license. Dependency
licenses remain applicable to their respective code and assets.

The documentation production build emits `3rdpartylicenses.txt` alongside its
browser assets. Preserve that generated file when distributing the site. Run
`pnpm licenses list --json` to regenerate the workspace dependency inventory;
the lockfile records the exact resolved versions.

The documentation uses Angular, Chart.js, Monaco Editor, Tailwind CSS and
individually imported Lucide icons. Refer to each installed package's license
and the generated notices for its attribution. Chart.js is also a declared
consumer dependency of the chart registry item. Lucide is confined to the
documentation and is not installed with registry components.

Commissioner font assets are distributed through the installed Fontsource
package; retain its bundled font license when redistributing the font files.

The three canonical assets in `apps/docs/public/brand` are repository brand
assets, not dependency artwork. They have not been replaced by this review.
Their redistribution provenance is tracked separately in
`docs/release-checklist.md`.
