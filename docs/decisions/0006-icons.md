# ADR 0006: Optional application icons

Status: accepted

Use the official `@lucide/angular` package in the documentation, playground and
other first-party applications. Import standalone `Lucide*` components
individually and render their static `svg[lucideName]` directives; never import
the complete icon collection.

Installable registry components must not import, declare or install Lucide. They
expose ordinary content-projection slots where icon placement is part of the API.
Those slots accept SVG, Lucide, Tabler, Heroicons, images or custom components.
Required internal indicators use small inline SVG fallbacks and remain
replaceable when the control has a natural projection point.

First-party documentation icons use `currentColor`, 16 px dimensions and a 1.75
stroke width. Consumer classes and Tailwind utilities remain free to override
size, color and alignment.
