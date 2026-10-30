# Releasing

The public package is `aevko-ui`. GitHub Actions creates releases with Release
Please and publishes through npm Trusted Publishing. No long-lived npm token is
stored in GitHub.

## One-time setup

After `.github/workflows/release.yml` exists on `main`:

1. In **GitHub → Settings → Environments**, create an environment named `npm`.
2. In **GitHub → Settings → Actions → General**, allow GitHub Actions to create
   pull requests.
3. In **npm → aevko-ui → Settings → Trusted Publisher**, select GitHub Actions
   and enter:
   - Organization or user: `jhoownogueira`
   - Repository: `aevko`
   - Workflow filename: `release.yml`
   - Environment: `npm`
   - Allowed action: direct publishing with `npm publish`

The workflow uses a GitHub-hosted runner, `id-token: write`, Node 24 and a current
npm CLI. npm exchanges the GitHub OIDC identity for a short-lived publishing
credential and generates provenance automatically.

## Release flow

Use Conventional Commit prefixes for changes that affect the public package:

```text
fix: correct dialog focus restoration
feat: add a new component
feat!: replace a public component API
```

After CI passes on `main`, Release Please creates or updates a release pull
request:

- `fix:` creates a patch version.
- `feat:` creates a minor version.
- `feat!:` or a `BREAKING CHANGE` footer creates a major version.
- `docs:`, `test:`, `ci:` and `chore:` do not create a package release by
  themselves.

Merging the release pull request causes CI to run again. After it succeeds,
Release Please creates the tag and GitHub Release. The `publish` job then checks
out that exact tag, verifies the workspace and packed Angular consumer, and
publishes to npm through OIDC.

Regular CI verifies the packed CLI in one clean Angular consumer. The exhaustive
64-component installation audit remains available through the manual **Consumer
installation** workflow so routine documentation and infrastructure commits do
not occupy a runner for dozens of sequential Angular builds.

## Verification

After a release completes:

```sh
npm view aevko-ui version --prefer-online
npm view aevko-ui dist-tags --prefer-online
npx --yes aevko-ui@latest --help
```

If the npm publisher configuration is created but does not complete a successful
publish within two days, delete the expired publisher and create it again before
merging the next release pull request.
