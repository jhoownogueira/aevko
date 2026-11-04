import { chromium } from 'playwright';
import { createRequire } from 'node:module';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const require = createRequire(new URL('../../apps/docs/package.json', import.meta.url));
const axe = await readFile(require.resolve('axe-core/axe.min.js'), 'utf8');
const base = process.env.AEVKO_DOCS_URL ?? 'http://localhost:4200';
const { items } = JSON.parse(await readFile('public-registry/index.json', 'utf8'));
const { items: blocks } = JSON.parse(await readFile('public-registry/blocks-index.json', 'utf8'));
const guides = [
  '',
  'getting-started',
  'components',
  'theming',
  'icons',
  'cli',
  'contributing',
  'themes',
  'typeset',
  'layout-showcase',
  'charts',
  'blocks',
];
const paths = [
  ...guides,
  ...items.map((item) => 'components/' + item.name),
  ...blocks.map((item) => 'blocks/' + item.name),
];
const routes = new Set(paths.map((path) => '/' + path));
const browser = await chromium.launch({ channel: 'chromium' });
const page = await browser.newPage({ permissions: ['clipboard-read', 'clipboard-write'] });
const results = process.env.AEVKO_RESUME
  ? JSON.parse(await readFile('tmp/release-review/pages.json', 'utf8'))
  : [];
let errors = [];
page.on('pageerror', (error) => errors.push(error.message));
await mkdir('tmp/release-review', { recursive: true });
try {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const path of paths) {
      if (results.some((result) => result.path === '/' + path && result.width === width)) continue;
      errors = [];
      let response;
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          response = await page.goto(base + '/' + path, { waitUntil: 'domcontentloaded' });
          break;
        } catch (error) {
          if (attempt === 2) throw error;
        }
      }
      await page.locator('h1').first().waitFor();
      await page.locator('.site-header').waitFor();
      if (path !== 'blocks') await page.waitForLoadState('networkidle');
      await page.evaluate(() => document.fonts.ready);
      await page.addScriptTag({ content: axe });
      const links = await page.locator('a[href]').evaluateAll((anchors) =>
        anchors
          .filter((a) => !a.closest('iframe'))
          .map((a) => ({
            href: a.getAttribute('href'),
            label: a.textContent.trim(),
            found: !a.hash || !!document.getElementById(decodeURIComponent(a.hash.slice(1))),
          })),
      );
      const broken = links.filter((link) =>
        link.href.startsWith('#')
          ? !link.found
          : link.href.startsWith('/') &&
            !routes.has(link.href.replace(/\/$/, '').split('#')[0].split('?')[0] || '/'),
      );
      const violations = await page.evaluate(async () =>
        (await window.axe.run(document, { iframes: false })).violations.map(({ id, nodes }) => ({
          id,
          targets: nodes.map((node) => node.target),
        })),
      );
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 1,
      );
      results.push({
        path: '/' + path,
        width,
        status: response.status(),
        broken,
        violations,
        overflow,
        errors: [...errors],
      });
      console.log(
        'PAGE',
        width,
        path || '/',
        JSON.stringify({
          broken: broken.length,
          violations: violations.length,
          overflow,
          errors: errors.length,
        }),
      );
    }
  }
  await page.goto(base + '/themes', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Preview Carbon', exact: true }).click();
  assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), 'dark');
  await page.locator('.header-actions .icon-button').click();
  assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), 'light');
  assert.equal(
    await page.evaluate(() =>
      document.documentElement.style.getPropertyValue('--aevko-background'),
    ),
    '',
  );
  await page.getByRole('button', { name: 'Preview Stone', exact: true }).click();
  await page.getByRole('button', { name: 'Copy code', exact: true }).click();
  assert(
    (await page.evaluate(() => navigator.clipboard.readText())).includes(
      '--aevko-background: #fafaf9',
    ),
  );
  await page.getByRole('button', { name: 'Reset theme', exact: true }).click();
  assert.equal(
    await page.evaluate(() =>
      document.documentElement.style.getPropertyValue('--aevko-background'),
    ),
    '',
  );
  await page.goto(base + '/icons', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Save changes', exact: true }).click();
  assert(
    (await page.getByRole('status').allTextContents()).some((text) =>
      text.includes('Example changes saved'),
    ),
  );
  console.log('THEME_AND_ICON_CONTROLS_OK');
} finally {
  await writeFile('tmp/release-review/pages.json', JSON.stringify(results, null, 2));
  await browser.close();
}
const failures = results.filter(
  (result) =>
    result.status !== 200 ||
    result.broken.length ||
    result.violations.length ||
    result.overflow ||
    result.errors.length,
);
console.log(JSON.stringify(failures, null, 2));
assert.equal(failures.length, 0);
console.log(`RELEASE_PAGES_OK ${results.length} page/viewport cases`);
