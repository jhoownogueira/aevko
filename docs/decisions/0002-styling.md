# ADR 0002: Token-first styling

Status: accepted

Use semantic `--aevko-*` variables, low-specificity component CSS and ordinary
host classes. The defaults use Commissioner, a 4 px rhythm, square corners and a
neutral black-to-white scale so consumer identity can lead. The canonical logo
assets are versioned in `apps/docs/public/brand`. Tailwind 4 is optional for
components and enabled in the docs/consumer examples. No gradient, Shadow DOM,
`::ng-deep` or routine `!important` is allowed.
