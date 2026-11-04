import { readFile, writeFile, mkdir } from 'node:fs/promises';
import prettier from 'prettier';
import { catalog } from '../examples/catalog.mjs';
const root = new URL('../', import.meta.url);
const bases = JSON.parse(await readFile(new URL('examples/base-sources.json', root), 'utf8'));
const output = new URL('src/app/examples/', root);
await mkdir(output, { recursive: true });
const styles = `:host { display: grid; gap: 1rem; min-width: 0; width: 100%; max-width: 40rem; margin-inline: auto; font-size: 0.875rem; line-height: 1.6; }
:host > button, :host > a { justify-self: start; } p { margin: 0; } .row { display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center; } .between { justify-content: space-between; } .stack { display: grid; gap: 0.75rem; } .grow { flex: 1; min-width: 0; } .columns { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 1rem; } .panel { border: 1px solid var(--aevko-border); padding: 1.25rem; min-width: 0; } .media { display: grid; place-items: center; background: var(--aevko-surface); color: var(--aevko-muted); width: 100%; height: 100%; min-height: 8rem; } .muted { color: var(--aevko-muted); } .feedback { color: var(--aevko-muted); min-height: 1.5rem; } .native-input { box-sizing: border-box; width: 100%; min-height: 2.75rem; padding: 0.625rem 0.75rem; border: 1px solid var(--aevko-border); background: var(--aevko-background); color: var(--aevko-foreground); font: inherit; } .native-input:focus-visible { outline: 2px solid var(--aevko-focus); outline-offset: 1px; } label { font-weight: 500; } fieldset { border: 1px solid var(--aevko-border); padding: 1rem; display: grid; gap: 0.75rem; } legend { padding-inline: 0.375rem; } a { color: inherit; text-underline-offset: 3px; } .list-row { padding: 0.75rem; border-bottom: 1px solid var(--aevko-border); } .context-target { border: 1px dashed var(--aevko-border); padding: 3rem 1.5rem; text-align: center; } aevko-sidebar a { display: flex; align-items: center; gap: 0.5rem; padding: 0.625rem; text-decoration: none; } aevko-sidebar a:hover { background: var(--aevko-surface); } aevko-sidebar { max-width: 100%; } svg { max-width: 100%; } button[aevkoAttachmentAction], button[aevkoItemAction], button[aevkoMessageAction], button[aevkoBubbleReactions] { cursor: pointer; font: inherit; border: 1px solid var(--aevko-border); padding: 0.375rem 0.75rem; background: var(--aevko-background); color: inherit; } @media (max-width: 480px) { .columns { grid-template-columns: minmax(0,1fr); } }`;
const loaders = [];
const summary = [];
for (const [slug, entries] of Object.entries(catalog)) {
  const base = bases[slug];
  if (!base) throw new Error(`Unknown component ${slug}`);
  const modules = new Map();
  const specs = [];
  let classText = '';
  entries.forEach((entry, index) => {
    const baseImports = base.imports.split('\n').filter(Boolean);
    const combined = [...baseImports, ...entry.extraImports];
    const imports = new Map();
    for (const line of combined) {
      const match = line.match(/import\s*\{([^}]+)\}\s*from\s*['"]([^'"]+)['"]/);
      if (!match) throw new Error(line);
      const names = imports.get(match[2]) ?? new Set();
      match[1].split(',').forEach((n) => names.add(n.trim()));
      imports.set(match[2], names);
    }
    const optionalImports = {
      AevkoChart: 'aevko-chart ',
      AevkoKbdGroup: 'aevkoKbdGroup',
      AevkoInputGroupButton: 'aevkoInputGroupButton',
      AevkoInputGroupAddon: 'aevko-input-group-addon',
      AevkoFieldGroup: 'aevko-field-group',
    };
    for (const names of imports.values()) {
      for (const [name, selector] of Object.entries(optionalImports)) {
        if (!entry.template.includes(selector)) names.delete(name);
      }
    }
    const angular = imports.get('@angular/core');
    angular.add('ChangeDetectionStrategy');
    if (entry.classBody.includes('inject(')) angular.add('inject');
    if (!entry.classBody.includes('FormControl'))
      imports.get('@angular/forms')?.delete('FormControl');
    if (!entry.template.includes('[formControl]'))
      imports.get('@angular/forms')?.delete('ReactiveFormsModule');
    for (const [module, names] of imports) {
      if (!names.size) continue;
      const shared = modules.get(module) ?? new Set();
      for (const name of names) shared.add(name);
      modules.set(module, shared);
    }
    const componentImports = [...imports]
      .filter(([module]) => module.startsWith('./ui/'))
      .flatMap(([, names]) => [...names])
      .filter((name) => name !== 'AevkoToastStore');
    if (entry.template.includes('[formControl]')) componentImports.push('ReactiveFormsModule');
    let template = entry.template;
    const ids = [...template.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
    for (const id of ids) {
      for (const attribute of ['id', 'for', 'aria-describedby', 'aria-labelledby'])
        template = template.replaceAll(
          `${attribute}="${id}"`,
          `${attribute}="${slug}-${index}-${id}"`,
        );
    }
    let sequence = 0;
    template = template.replace(
      /<(aevko-(?:popover|dropdown-menu|combobox|select|command|tooltip|hover-card|tabs|sidebar|date-picker))(?=[\s>])([^>]*)>/g,
      (full, tag, attrs) =>
        /\bid=/.test(attrs)
          ? full
          : `<${tag} [id]="'${slug}-${index}-surface-${sequence++}'"${attrs}>`,
    );
    template = template.replace(/<aevko-collapsible(?=[\s>])([^>]*)>/g, (full, attrs) =>
      attrs.includes('panelId=')
        ? full
        : `<aevko-collapsible panelId="${slug}-${index}-panel-${sequence++}"${attrs}>`,
    );
    template = template.replace(/<input\b[^>]*>/g, (tag) =>
      tag.includes('type="radio"')
        ? tag.replace(/name="([^"]+)"/, (_, name) => `name="${slug}-${index}-${name}"`)
        : tag,
    );
    const className = `${slug
      .split('-')
      .map((v) => v[0].toUpperCase() + v.slice(1))
      .join('')}Example${index + 1}`;
    const exampleStyles =
      slug === 'chart' ? styles.replace('max-width: 40rem', 'max-width: 100%') : styles;
    const component = `@Component({selector:'aevko-example-${slug}-${index}',standalone:true,imports:[${componentImports.join(',')}],${slug === 'toast' ? 'providers:[AevkoToastStore],' : ''}changeDetection:ChangeDetectionStrategy.OnPush,template:${'`' + template.replaceAll('`', '\\`').replaceAll('${', '\\${') + '`'},styles:${'`' + exampleStyles + '`'}})\nexport class ${className} { ${entry.classBody} }\n`;
    classText += component;
    const sampleImports = [...imports]
      .filter(([, names]) => names.size)
      .map(([module, names]) => `import {${[...names].join(',')}} from '${module}';`)
      .join('\n');
    specs.push({
      title: entry.title,
      description: entry.description,
      component: className,
      code: sampleImports + '\n' + component,
      dependencies: [...imports.keys()].filter((m) => m.startsWith('./ui/')).map((m) => m.slice(5)),
    });
  });
  const imports = [...modules]
    .filter(([, names]) => names.size)
    .map(
      ([module, names]) =>
        `import {${[...names].join(',')}} from '${module.replace('./ui/', '../../../../../registry/components/')}';`,
    )
    .join('\n');
  for (const spec of specs)
    spec.code = await prettier.format(spec.code, {
      parser: 'typescript',
      singleQuote: true,
      printWidth: 100,
    });
  const exports = `export const examples = [${specs.map((s) => `{title:${JSON.stringify(s.title)},description:${JSON.stringify(s.description)},component:${s.component},code:${JSON.stringify(s.code)},dependencies:${JSON.stringify(s.dependencies)}}`).join(',')}];`;
  await writeFile(
    new URL(`${slug}.examples.ts`, output),
    await prettier.format(
      '// Generated by scripts/generate-examples.mjs. Edit examples/catalog.mjs.\n' +
        imports +
        '\n' +
        classText +
        exports,
      { parser: 'typescript', singleQuote: true, printWidth: 100 },
    ),
  );
  loaders.push(
    `'${slug}': () => import('./examples/${slug}.examples').then(module => module.examples)`,
  );
  summary.push({ slug, examples: specs.map(({ title }) => title) });
}
await writeFile(
  new URL('src/app/example-loaders.ts', root),
  await prettier.format(
    `// Generated by scripts/generate-examples.mjs.\nexport const exampleLoaders = {${loaders.join(',')}};`,
    { parser: 'typescript', singleQuote: true, printWidth: 100 },
  ),
);
await writeFile(
  new URL('examples/coverage.json', root),
  await prettier.format(JSON.stringify(summary), { parser: 'json', printWidth: 100 }),
);
console.log(
  `Generated ${summary.reduce((count, row) => count + row.examples.length, 0)} examples for ${summary.length} components.`,
);
