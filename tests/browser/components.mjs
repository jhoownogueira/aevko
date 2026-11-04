import { chromium } from 'playwright';
import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
const require = createRequire(new URL('../../apps/docs/package.json', import.meta.url));
const axe = await readFile(require.resolve('axe-core/axe.min.js'), 'utf8');
const base = process.env.AEVKO_DOCS_URL ?? 'http://127.0.0.1:4527';
const output = new URL('../../tmp/visual-audit/', import.meta.url);
await mkdir(output, { recursive: true });
const { items } = JSON.parse(
  await readFile(new URL('../../public-registry/index.json', import.meta.url), 'utf8'),
);
const browser = await chromium.launch({ channel: 'chromium' });
const page = await browser.newPage();
const results = [];
try {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const { name } of items) {
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          await page.goto(`${base}/components/${name}`, { waitUntil: 'networkidle' });
          break;
        } catch (error) {
          if (attempt === 2) throw error;
        }
      }
      await page.addScriptTag({ content: axe });
      for (const theme of ['light', 'dark']) {
        if ((await page.evaluate(() => document.documentElement.dataset.theme)) !== theme)
          await page.locator('.header-actions .icon-button').click();
        // Measure settled colors after the theme transition, not an intermediate frame.
        await page.evaluate(async () => {
          await Promise.all(
            document
              .getAnimations()
              .filter((animation) => animation.effect?.getTiming().iterations !== Infinity)
              .map((animation) => animation.finished.catch(() => undefined)),
          );
        });
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth + 1,
        );
        const violations = await page.evaluate(async () =>
          (await window.axe.run('.component-preview')).violations.map(({ id, impact, nodes }) => ({
            id,
            impact,
            nodes: nodes.map(({ target, failureSummary }) => ({ target, failureSummary })),
          })),
        );
        await page.screenshot({
          path: fileURLToPath(new URL(`${name}-${width}-${theme}.png`, output)),
        });
        results.push({ name, width, theme, overflow, violations });
      }
      await writeFile(new URL('results.json', output), JSON.stringify(results, null, 2) + '\n');
      console.log(`AUDIT ${width} ${name}`);
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  for (const slug of ['popover', 'dropdown-menu', 'select', 'combobox', 'context-menu']) {
    await page.goto(`${base}/components/${slug}`, { waitUntil: 'networkidle' });
    const root = page.locator(`.component-preview aevko-${slug}`).first();
    const panel = root.locator('[data-slot$="content"]');
    assert.equal(await panel.isVisible(), false, `${slug}: starts closed`);
    if (slug === 'context-menu')
      await root.locator('[aevkoContextMenuTrigger]').click({ button: 'right' });
    else if (slug === 'combobox') await root.locator('input').fill('a');
    else await root.locator('button').first().click();
    await panel.waitFor({ state: 'visible' });
    await page.addScriptTag({ content: axe });
    const openViolations = await page.evaluate(async () =>
      (await window.axe.run('.component-preview')).violations.map(({ id }) => id),
    );
    assert.deepEqual(openViolations, [], `${slug}: open accessibility`);
    const rect = await panel.boundingBox();
    assert(
      rect &&
        rect.x >= 0 &&
        rect.y >= 0 &&
        rect.x + rect.width <= 391 &&
        rect.y + rect.height <= 845,
      `${slug}: viewport bounds`,
    );
    await page.locator('h1').click();
    await panel.waitFor({ state: 'hidden' });
    console.log(`INTERACTION_OK ${slug}`);
  }
} finally {
  await writeFile(new URL('results.json', output), JSON.stringify(results, null, 2) + '\n');
  await browser.close();
}
const failures = results.filter((row) => row.overflow || row.violations.length);
console.log(`AUDIT_COMPLETE ${results.length} cases, ${failures.length} failures`);
if (failures.length) process.exitCode = 1;
