# Charts and live block previews

Updated 2026-11-04.

## Reference and implementation

The [Zard chart gallery](https://zardui.com/charts) and
[block gallery](https://zardui.com/blocks) informed the hierarchy: a prominent
interactive example, category navigation, compact chart cards, responsive block
previews, installation commands and complete code. Zard uses ECharts; Aevko uses
Chart.js 4.6.1. The implementations, datasets and English copy are original.
Aevko retains its neutral tokens and square geometry.

## Installable chart API

`aevko-ui add chart --yes` installs the chart source and declares `chart.js` in the
consumer application. `AevkoChart` remains a composable frame for custom projected
visuals. `AevkoChartCanvas` is the optional renderer exported by the same item:

- Required `label` and `data: AevkoChartData`.
- `type`: line, bar, pie, doughnut, radar or polarArea. A filled line produces an
  area chart.
- Datasets contain a unique `label`, readonly `values`, optional `color`, `fill`
  and `dashed`. Null values are displayed as missing data, not zero.
- `height`, `stacked`, `horizontal`, `smooth`, `stepped` and `showLegend` configure
  the supported compositions.
- `valueFormat` is number, currency or percent; `currency` defaults to USD.
  Percentage datasets use values on a 0–100 scale.
- Override `--aevko-chart-1` through `--aevko-chart-6` for a product palette.
  Explicit dataset colors take precedence for cartesian and radar series.

Chart.js is dynamically imported after browser rendering. Data changes update
the existing instance; type changes replace it. Destruction releases the chart,
media listener and theme observer. Theme changes refresh canvas colors. Reduced
motion disables chart animation.

Canvas has an accessible name. HTML legend buttons expose pressed states and
work with keyboard input. A native data table remains available during loading,
SSR, empty states or renderer failure. Hiding a series does not remove its
original values from that table. See the official Chart.js guidance on
[accessibility](https://www.chartjs.org/docs/latest/general/accessibility.html),
[responsive containers](https://www.chartjs.org/docs/latest/configuration/responsive.html)
and [updates](https://www.chartjs.org/docs/latest/developers/updates.html).

## Examples and blocks

The component documentation and `/charts` share the same 12 compiled examples:
interactive, stacked and stepped area; grouped, horizontal and stacked bars;
comparison and linear lines; pie; doughnut; radar; and polar area. The code shown
in Monaco is generated from the exact component definition used in each preview.

The `/blocks` gallery supports Featured, Dashboard, Authentication, Sidebar and
All filters. All 27 compositions use canonical source in isolated same-origin
preview routes. Each preview supports desktop/tablet/mobile widths, refresh,
complete source with transitive dependencies, and an installation command.

`dashboard-01` includes period selection, matching revenue totals and channel
breakdowns, project creation with duplicate detection, project search and filtered
CSV export. Its registry dependency on `chart` installs Chart.js transitively.
The version 1.0 review also adds functional form submission and local sidebar
interactions to the remaining 26 blocks. See [version 1.0 preparation](version-1.0.md).

## Verification

- Production build prerenders 131 routes; the Chart.js engine is a separate lazy
  chunk and the initial bundle stays within existing budgets.
- 67 Angular tests cover component semantics, exact values, legend state, empty
  states, block accessibility and dashboard workflows.
- Eight chart/dashboard desktop/mobile and light/dark browser audits pass axe,
  overflow and runtime checks; interaction checks cover filters, data updates,
  legends, source copying, tooltips, reduced motion and project workflows.
- All 27 isolated block previews pass browser axe, overflow and runtime checks
  at 1440 px and 390 px (54 cases).
- All 12 chart example source controls copy complete standalone code.
- Chart documentation passes mobile axe with all 12 examples, and its manual
  source includes the renderer and npm dependency.
- Individual CLI installation and production builds pass for `chart` and
  `dashboard-01`, without an Aevko runtime or Lucide dependency.

Run `pnpm test:charts` with the docs server running at localhost:4200, or set
`AEVKO_DOCS_URL`. Browser artifacts are written to `tmp/chart-audit`.
