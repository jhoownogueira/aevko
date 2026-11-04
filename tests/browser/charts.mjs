import { chromium } from 'playwright';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
const require = createRequire(new URL('../../apps/docs/package.json', import.meta.url));
const axe = await readFile(require.resolve('axe-core/axe.min.js'), 'utf8');
const base = process.env.AEVKO_DOCS_URL ?? 'http://localhost:4200';
const browser = await chromium.launch({ channel: 'chromium' });
const page = await browser.newPage({ permissions: ['clipboard-read', 'clipboard-write'] });
let errors = [];
page.on('pageerror', (e) => errors.push(e.message));
const checks = [];
await mkdir('tmp/chart-audit', { recursive: true });
async function audit(selector, name, width, theme) {
  await page.addScriptTag({ content: axe });
  const violations = await page.evaluate(
    async (selector) =>
      (await window.axe.run(selector, { iframes: false })).violations.map(({ id, nodes }) => ({
        id,
        targets: nodes.map((node) => node.target),
      })),
    selector,
  );
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
  checks.push({ name, width, theme, violations, overflow, errors: [...errors] });
  await page.screenshot({
    path: `tmp/chart-audit/${name}-${width}-${theme}.png`,
    fullPage: name === 'dashboard',
  });
  await writeFile('tmp/chart-audit/results.json', JSON.stringify(checks, null, 2));
}
try {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const theme of ['light', 'dark']) {
      errors = [];
      await page.goto(base + '/charts', { waitUntil: 'networkidle' });
      if ((await page.evaluate(() => document.documentElement.dataset.theme)) !== theme)
        await page.locator('.header-actions .icon-button').click();
      await page.locator('aevko-chart-canvas[data-ready="true"]').nth(11).waitFor();
      await page.waitForTimeout(550);
      assert.equal(await page.locator('aevko-chart-canvas').count(), 12);
      const drawings = await page.locator('aevko-chart-canvas canvas').evaluateAll((canvases) =>
        canvases.map((canvas) => ({
          width: canvas.width,
          height: canvas.height,
          drawn: [
            ...canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data,
          ].some((value, index) => index % 4 === 3 && value > 0),
        })),
      );
      assert(drawings.every((d) => d.width > 0 && d.height > 0 && d.drawn));
      await audit('aevko-charts-page', 'charts', width, theme);
      const featured = page.locator('.featured');
      const before = await featured.locator('canvas').evaluate((canvas) => canvas.toDataURL());
      await featured.locator('select').selectOption('30');
      await page.waitForTimeout(550);
      assert.notEqual(
        await featured.locator('canvas').evaluate((canvas) => canvas.toDataURL()),
        before,
      );
      await featured.locator('summary').click();
      assert.equal(await featured.locator('tbody tr').count(), 4);
      assert.match(await featured.locator('tbody').innerText(), /Week 4/);
      const desktop = featured.getByRole('button', { name: 'Desktop', exact: true });
      await desktop.click();
      await page.waitForTimeout(500);
      assert.equal(await desktop.getAttribute('aria-pressed'), 'false');
      await desktop.focus();
      await page.keyboard.press('Space');
      assert.equal(await desktop.getAttribute('aria-pressed'), 'true');
      for (const category of ['Bar', 'Line', 'Pie', 'Doughnut', 'Radar', 'Radial', 'Area', 'All']) {
        await page
          .getByRole('navigation', { name: 'Chart category' })
          .getByRole('button', { name: category, exact: true })
          .click();
        await page.locator('.gallery aevko-chart-canvas[data-ready="true"]').first().waitFor();
      }
      await featured.getByRole('button', { name: 'View code', exact: true }).click();
      await featured.getByRole('button', { name: 'Copy code', exact: true }).click();
      assert.match(await page.evaluate(() => navigator.clipboard.readText()), /AevkoChartCanvas/);
      await featured.getByRole('button', { name: 'Hide code', exact: true }).click();
      console.log('CHARTS', width, theme);
      await page.goto(base + '/blocks/preview/dashboard-01', { waitUntil: 'networkidle' });
      await page.locator('aevko-chart-canvas[data-ready="true"]').nth(1).waitFor();
      await page.waitForTimeout(550);
      await audit('aevko-dashboard-01-block', 'dashboard', width, theme);
      await page.getByRole('combobox', { name: 'Revenue period' }).selectOption('3');
      await page.locator('aevko-chart-canvas').first().locator('summary').click();
      assert.equal(await page.locator('aevko-chart-canvas').first().locator('tbody tr').count(), 3);
      await page.getByRole('searchbox', { name: 'Search projects' }).fill('Atlas');
      assert.equal(await page.locator('#projects tbody tr').count(), 1);
      const href = await page.getByRole('link', { name: 'Export CSV' }).getAttribute('href');
      assert(
        decodeURIComponent(href).includes('Atlas migration') &&
          !decodeURIComponent(href).includes('Checkout refresh'),
      );
      await page.getByRole('button', { name: 'New project' }).click();
      await page
        .getByRole('textbox', { name: 'Project name', exact: true })
        .fill('Customer portal');
      await page.getByRole('button', { name: 'Create project', exact: true }).click();
      await page.getByText('Project created.', { exact: true }).waitFor();
      assert.equal(await page.locator('#projects tbody tr').count(), 5);
      console.log('DASHBOARD', width, theme);
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  // Lazy preview frames may keep fetching after the gallery is interactive.
  // Wait for the controls and rendered chart below instead of network silence.
  await page.goto(base + '/blocks', { waitUntil: 'domcontentloaded' });
  await page.locator('aevko-block-preview').first().waitFor();
  assert.equal(await page.locator('aevko-block-preview').count(), 4);
  const block = page.locator('aevko-block-preview').first();
  await block.getByRole('button', { name: 'Mobile', exact: true }).click();
  assert(Math.abs((await block.locator('iframe').boundingBox()).width - 388) < 3);
  const frame = page.frameLocator('aevko-block-preview:first-child iframe');
  await frame.locator('aevko-chart-canvas[data-ready="true"]').nth(1).waitFor();
  assert.equal(await frame.locator('.site-header').count(), 0);
  await block.getByRole('button', { name: 'Code', exact: true }).click();
  await block.locator('aevko-manual-installation details').first().waitFor();
  assert.equal(await block.locator('[role="alert"]').count(), 0);
  assert(
    (await block.locator('aevko-manual-installation').innerText()).includes(
      'chart-canvas.component.ts',
    ),
  );
  await page
    .getByRole('navigation', { name: 'Block category' })
    .getByRole('button', { name: 'All', exact: true })
    .click();
  assert.equal(await page.locator('aevko-block-preview').count(), 27);
  console.log('BLOCK_GALLERY filters, viewport and canonical source');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(base + '/charts', { waitUntil: 'networkidle' });
  const reduced = page.locator('.featured');
  await reduced.locator('aevko-chart-canvas[data-ready="true"]').waitFor();
  await reduced.locator('select').selectOption('30');
  await page.waitForTimeout(70);
  const settled = await reduced.locator('canvas').evaluate((canvas) => canvas.toDataURL());
  await page.waitForTimeout(120);
  assert.equal(
    await reduced.locator('canvas').evaluate((canvas) => canvas.toDataURL()),
    settled,
    'Reduced motion renders updates without an ongoing animation',
  );
  const canvas = reduced.locator('canvas');
  const rect = await canvas.boundingBox();
  await page.mouse.move(rect.x + rect.width / 2, rect.y + rect.height / 2);
  await page.waitForTimeout(100);
  assert.notEqual(
    await canvas.evaluate((canvas) => canvas.toDataURL()),
    settled,
    'Hover draws a real Chart.js tooltip',
  );
  console.log('REDUCED_MOTION and TOOLTIP');
  const failures = checks.filter(
    (check) => check.violations.length || check.overflow || check.errors.length,
  );
  console.log(JSON.stringify(failures, null, 2));
  assert.equal(failures.length, 0);
  console.log(
    `PASS ${checks.length} chart/dashboard visual and accessibility cases plus interactions`,
  );
} finally {
  await browser.close();
}
