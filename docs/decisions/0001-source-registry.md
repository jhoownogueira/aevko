# ADR 0001: Source registry and installation

Status: accepted

Canonical component files live in `registry/components`; manifests describe
files, component dependencies, shared files, npm dependencies and compatibility.
A deterministic build embeds file content in versioned JSON. The CLI validates
every target path before writing it. This makes local and HTTPS registries use the
same contract while preserving copy-to-project ownership.
