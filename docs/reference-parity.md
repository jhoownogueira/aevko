# Reference parity audit

This audit records product-scope observations from ZardUI without making its
brand, copy, templates or source code part of Aevko. ZardUI is an MIT-licensed
Angular project inspired by shadcn/ui and ng-zorro. Its license notice must remain
with any substantial copied portion; Aevko instead uses an independent
implementation and its own visual contract.

Audit baseline: `zard-ui/zardui` commit
`cbd200bfaa1b5e29b13c71cb48bb773baa735afb` (ZardUI 1.1.1, inspected
2026-10-30).

## Component coverage

- ZardUI documents 55 component entries.
- Aevko publishes 65 independently installable component entries.
- `dropdown` maps to Aevko `dropdown-menu`.
- `sonner` maps to Aevko `toast`.
- `kbd` maps to Aevko's native `kbd[aevkoKbd]` primitive and optional projected
  shortcut group.
- Aevko additionally provides Code Block, Data Table, Direction, Label, Menubar,
  Message Scroller, Native Select, Questionnaire, Scroll Area and Trace.

Component-count parity is therefore already met. Future work must improve real
examples and composed experiences instead of duplicating implemented primitives.

## Porting status

| Slice                              | Status   | Evidence                                                                                                                                       |
| ---------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Shared component-page presentation | complete | Copy page, previous/next navigation, section navigation, collapsible preview source and command/manual installation are shared by all 65 pages |
| Landing component wall             | complete | Canonical Aevko components, responsive layout and reduced-motion behavior                                                                      |
| Action primitives                  | complete | Button, Button Group, Toggle, Badge and Kbd reviewed against ZardUI; Angular tests and isolated consumers pass                                 |
| Forms and selection                | complete | 17 controls reviewed with Forms, keyboard, slots, docs and isolated consumers                                                                  |
| Overlay and menu systems           | complete | 13 components reviewed for focus, keyboard, dismissal, slots and isolated installation                                                         |
| Layout, content and data           | complete | 30 remaining primitives reviewed; all 65 registry components expose stable styling slots and clean isolated installation evidence              |
| Blocks                             | complete | 27 independent Aevko compositions, separate registry index, canonical previews, axe coverage and isolated Angular consumers                    |

`complete` in this table means the parity pass itself has evidence; it does not
mean Aevko copies upstream defects. For example, Aevko intentionally omits
`aria-orientation` from a plain `role="group"` because axe correctly reports that
combination as invalid.

## Experience gaps

| Area                |                                                           Reference evidence | Aevko direction                                                                                                     |
| ------------------- | ---------------------------------------------------------------------------: | ------------------------------------------------------------------------------------------------------------------- |
| Landing composition |                                          Animated wall of component examples | Original live Aevko component wall with reduced-motion support                                                      |
| Blocks              |                              27 blocks: dashboard, login, signup and sidebar | Build independent Aevko blocks from canonical registry components                                                   |
| Charts              |                                   Dedicated gallery with many chart examples | Chart.js renderer, 12 interactive examples and an accessible data table; original projected frame remains supported |
| Guides              | Installation, theming, RTL, registry, CLI, monorepo, skills and contribution | Preserve existing guides and add missing focused guides only with verified behavior                                 |
| Ecosystem pages     |        Themes, typeset, roadmap, changelog, version support and contribution | Aevko-owned Charts, Themes and Typeset galleries now complement maintained roadmap and contribution documents       |

## Block backlog

The reference contains 27 composed blocks across four families:

- one dashboard composition;
- five login compositions;
- five signup compositions;
- sixteen sidebar compositions.

Aevko blocks must be authored independently, use canonical installable
components, support light/dark and responsive layouts, and remain editable local
source. A block is not counted as delivered until its registry item, preview,
source view, accessibility evidence and isolated consumer build pass.

All 27 entries now meet that boundary. The CLI resolves them through
`blocks-index.json`, installs only declared canonical component dependencies and
writes block source below `src/app/ui/blocks` without an Aevko runtime or Lucide.

## Non-negotiable Aevko differences

- Aevko remains a copy-to-project registry, not a runtime component package.
- Default radius remains zero and the palette remains neutral.
- Lucide remains optional and documentation-only.
- Public UI copy remains original and in English.
- Reduced-motion preferences disable non-essential landing motion.
- ZardUI names, logos, screenshots and marketing copy are not republished.
