# Version 1.0 preparation

This is a local release candidate review, not a publication announcement.
The maintained scope is 65 Angular components, 27 application blocks and 131
prerendered documentation routes. Angular 22 is the supported baseline.

## Candidate changes

- Documentation actions have observable outcomes. Removed unavailable provider
  sign-in buttons and dead authentication links; theme previews include reset
  and copyable CSS and remain compatible with the header theme switch.
- Installation includes a complete standalone Angular example. Contribution,
  theming, icon, chart and block guidance describe the current implementation.
- Authentication blocks validate native fields and emit `submitted` with
  `{ email, password, name, remember }`. Password fields are cleared after a
  valid submission. No HTTP request, account or session is created by the block.
  Connect an authentication service and adapt the preview feedback before use.
- Authentication links are opt-in through `alternateUrl` and `recoveryUrl`.
  Buttons for an unconfigured identity provider are no longer presented.
- Sidebar compositions filter their navigation, indicate the selected page and
  create named local projects with duplicate protection. Sample data is labelled
  as such; these compositions are starting points, not connected applications.
- Accordion accepts an optional `label` to distinguish repeated panel names.
  Existing trigger/panel associations are preserved when it is omitted.
- Chart includes a lazy Chart.js renderer, twelve complete examples, accessible
  data tables and interactive legends. Dashboard data and controls use that same
  canonical source.

## Migration from 0.1.x

Installed component source belongs to the consuming application. Updating the
CLI does not overwrite those files. Run `npx aevko-ui@latest diff <name>` and
review local edits before using `add <name> --overwrite`.

Installing `chart` or `dashboard-01` now includes Chart.js. Existing projected
chart visuals remain supported. Authentication blocks require an application
handler for `(submitted)`; set optional navigation URLs explicitly. Sidebar
demo state is local to the component and resets when it is destroyed.

## Release handoff

The published-version baseline remains in `.release-please-manifest.json`.
Do not edit that file to pretend an unreleased version has already shipped.
The release preparation commit should use this footer:

```text
Release-As: 1.0.0
```

Release Please owns the package version, release changelog and tag through its
reviewable release pull request. The footer is the maintained override; the
upstream configuration schema deprecates `release-as` in configuration files.
See the [upstream schema](https://raw.githubusercontent.com/googleapis/release-please/main/schemas/config.json).

Merging and publishing are separate actions and were not performed in this
review. The existing brand-asset redistribution confirmation remains a release
prerequisite; technical tests cannot establish that provenance.

## Verification

The review runs formatting, registry validation, CLI and Angular tests,
production SSR build, package smoke, production dependency audit, browser
interaction/accessibility checks and every isolated component/block installation.
Final counts and any unresolved prerequisite are recorded in
[the release checklist](release-checklist.md).

Browser evidence is reproducible with `pnpm test:release-pages`,
`pnpm test:browser`, `pnpm test:docs-controls`, `pnpm test:examples` and
`pnpm test:charts`. Set `AEVKO_DOCS_URL` to a server serving the production build.
