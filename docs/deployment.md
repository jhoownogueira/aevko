# Deployment

Aevko publishes its prerendered documentation and generated component registry as
one static GitHub Pages artifact. The public URL remains
`https://aevko.jhonata.dev`, and the CLI reads registry files from
`https://aevko.jhonata.dev/registry`.

## Artifact layout

Run the same build used by GitHub Actions:

```sh
pnpm pages:build
```

The command writes an ignored deployment artifact to `dist/pages`:

```text
dist/pages/
├── index.html
├── 404.html
├── LICENSE.txt
├── components/
└── registry/
    ├── index.json
    ├── components/
    └── schema/
```

`404.html` bootstraps the client application for valid client-side navigation,
and `.nojekyll` prevents Jekyll processing from changing static asset behavior.

## GitHub repository setup

The one-time repository configuration is:

1. Open **Settings → Pages**.
2. Under **Build and deployment**, select **GitHub Actions** as the source.
3. Set the custom domain to `aevko.jhonata.dev`.
4. In the DNS provider for `jhonata.dev`, create a `CNAME` record named `aevko`
   pointing to `jhoownogueira.github.io`.
5. After DNS validation succeeds, enable **Enforce HTTPS**.

Do not commit a `CNAME` file. GitHub ignores it when Pages is deployed by a custom
Actions workflow; the custom domain is managed in repository settings.

## Deployment workflow

`.github/workflows/pages.yml` runs only after the `CI` workflow succeeds for the
`main` branch. It checks out the exact verified commit, rebuilds the static
artifact, uploads it with the official Pages actions and deploys through the
protected `github-pages` environment.

The workflow also supports a manual run from **Actions → Deploy documentation and
registry → Run workflow**. A manual run still builds the artifact from source.

## Verification

After deployment, verify the public boundaries:

```sh
curl --fail https://aevko.jhonata.dev/
curl --fail https://aevko.jhonata.dev/registry/index.json
curl --fail https://aevko.jhonata.dev/registry/schema/item.v1.json
```

On Windows, verify DNS with:

```powershell
Resolve-DnsName aevko.jhonata.dev
```

The custom domain decouples clients from GitHub Pages. A future hosting migration
only requires changing DNS while keeping the CLI registry URL stable.
