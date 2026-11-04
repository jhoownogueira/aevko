import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
await mkdir('tmp', { recursive: true });

(async () => {
  const b = await chromium.launch({ channel: 'chromium' });
  const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
  await p.goto(`${process.env.AEVKO_DOCS_URL ?? 'http://127.0.0.1:4527'}/components/sidebar`, {
    waitUntil: 'networkidle',
  });
  let root = p.locator('.component-preview aevko-sidebar');
  await root.getByRole('button', { name: 'Collapse navigation' }).click();
  await p.waitForTimeout(220);
  assert((await root.locator('aside').boundingBox()).width <= 81);
  await root.getByRole('button', { name: 'Expand navigation' }).click();
  await p.waitForTimeout(220);
  assert((await root.locator('aside').boundingBox()).width > 200);
  await p.screenshot({ path: 'tmp/sidebar-desktop.png' });
  await p.setViewportSize({ width: 390, height: 844 });
  const trigger = root.getByRole('button', { name: 'Menu', exact: true });
  await trigger.click();
  await root.locator('aside').waitFor({ state: 'visible' });
  await p.keyboard.press('Escape');
  await root.locator('aside').waitFor({ state: 'hidden' });
  assert(await trigger.evaluate((e) => e === document.activeElement));
  console.log('SIDEBAR_INTERACTION_OK');
  await p.goto(`${process.env.AEVKO_DOCS_URL ?? 'http://127.0.0.1:4527'}/`, {
    waitUntil: 'networkidle',
  });
  assert(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await p.screenshot({ path: 'tmp/home-mobile.png', fullPage: true });
  await p.setViewportSize({ width: 1440, height: 1000 });
  await p.screenshot({ path: 'tmp/home-desktop.png' });
  console.log('HOME_RESPONSIVE_OK');
  await b.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
