# ADR 0005: Monaco in documentation

Status: accepted

Use Monaco only in the documentation application. Load its AMD runtime and
workers from local static assets after browser rendering, retain a semantic
`pre` fallback during SSR, and configure read-only editors with Aevko
high-contrast light and dark themes. Monaco is never a registry or component
runtime dependency.
