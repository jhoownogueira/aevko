# Aevko UI

Install accessible, editable Angular component source directly into your project.
Aevko UI is a source registry and CLI, not a runtime component package.

## Requirements

- Angular 22
- Node.js 22.22.3+, 24.15.0+ or 26
- A standalone Angular application

## Usage

Initialize Aevko UI in an Angular workspace:

```sh
npx aevko-ui@latest init --yes
```

Install one component and its declared source dependencies:

```sh
npx aevko-ui@latest add button --yes
```

List available components:

```sh
npx aevko-ui@latest list
```

Installed source belongs to the consumer project. It has no `aevko-ui` runtime
dependency, and installable components do not require an icon library.

Documentation: <https://aevko.jhonata.dev>

Issues: <https://github.com/jhoownogueira/aevko/issues>

## License

MIT
