# Aevko visual contract

- Identity is monochrome so consumer products can lead: near-white/near-black
  canvases, muted neutral surfaces and subtle borders.
- Default geometry is square (`--aevko-radius: 0`). Do not copy rounded shadcn
  geometry merely because it is used as a presentation reference.
- Focus uses one consistent neutral-gray 2 px ring with a 1 px offset. It must
  pass contrast checks in both themes.
- Component previews use the page canvas; nested examples may use the surface
  token. Dark mode should be near black, not medium gray.
- Code shells use a quiet header, individual package-manager controls, icon-only
  copy with an accessible label, formatted source and 16 px terminal text inset.
- Documentation icons use 16 px, 1.75 stroke width, `currentColor` and inline
  alignment unless a specific composition needs another documented size.
- Keep content width and typography compact enough to scan at 1280 px. Tables
  should fit desktop content and use a keyboard-focusable overflow container only
  when smaller viewports genuinely overflow.
