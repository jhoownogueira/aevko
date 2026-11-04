import { chromium } from 'playwright';
import { createRequire } from 'node:module';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
const require = createRequire(new URL('../../apps/docs/package.json', import.meta.url));
const axe = await readFile(require.resolve('axe-core/axe.min.js'), 'utf8');
const catalog = JSON.parse(await readFile('apps/docs/examples/coverage.json', 'utf8'));
const base = process.env.AEVKO_DOCS_URL ?? 'http://localhost:4200';
await mkdir('tmp/examples-audit', { recursive: true });
const browser = await chromium.launch({ channel: 'chromium' });
const page = await browser.newPage();
const results = process.env.AEVKO_RESUME
  ? JSON.parse(await readFile('tmp/examples-audit/results.json', 'utf8'))
  : [];
let errors = [];
page.on('pageerror', (error) => errors.push(error.message));
try {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const { slug, examples } of catalog) {
      if (results.some((r) => r.slug === slug && r.width === width && r.theme === 'dark')) continue;
      errors = [];
      await page.goto(`${base}/components/${slug}`, { waitUntil: 'networkidle' });
      await page
        .locator('#examples')
        .scrollIntoViewIfNeeded()
        .catch(async (error) => {
          console.log('PAGE_FAILURE', page.url(), await page.locator('body').innerText(), errors);
          throw error;
        });
      const root = page.locator('aevko-component-examples');
      await root.locator('.example-preview').first().waitFor();
      assert.equal(await root.locator('.example-preview').count(), examples.length, slug);
      await page.addScriptTag({ content: axe });
      for (const theme of ['light', 'dark']) {
        if ((await page.evaluate(() => document.documentElement.dataset.theme)) !== theme)
          await page.locator('.header-actions .icon-button').click();
        await root.locator('.example-preview').first().scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
        const violations = await page.evaluate(async () =>
          (await window.axe.run('aevko-component-examples')).violations.map(({ id, nodes }) => ({
            id,
            nodes: nodes.map(({ target, failureSummary }) => ({ target, failureSummary })),
          })),
        );
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth + 1,
        );
        await root.screenshot({ path: `tmp/examples-audit/${slug}-${width}-${theme}.png` });
        results.push({ slug, width, theme, violations, overflow, errors: [...errors] });
      }
      console.log('EXAMPLES', width, slug);
      await writeFile('tmp/examples-audit/results.json', JSON.stringify(results, null, 2));
    }
  }
} finally {
  await browser.close();
}
const failures = results.filter((r) => r.violations.length || r.overflow || r.errors.length);
console.log(JSON.stringify(failures, null, 2));
assert.equal(failures.length, 0, 'Examples must pass accessibility, rendering and overflow checks');
console.log(`PASS ${results.length} component/theme/viewport checks`);
