# ADR 0004: CDK and native primitives

Status: accepted

Prefer native HTML for buttons, inputs, tables and disclosure patterns. Use
Angular CDK selectively for overlays, focus traps, bidi and complex keyboard
models. Registry items declare CDK npm dependencies individually so installing a
simple component never installs the overlay stack.
