import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const browser = await chromium.launch({ channel: 'chromium' });
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  permissions: ['clipboard-read', 'clipboard-write'],
});
const base = process.env.AEVKO_DOCS_URL ?? 'http://localhost:4200';
async function visit(slug) {
  await page.goto(`${base}/components/${slug}`, { waitUntil: 'networkidle' });
  console.log('VISIT', page.url(), (await page.locator('h1').allTextContents()).join(','));
  await page.locator('#examples').scrollIntoViewIfNeeded();
  await page.locator('aevko-component-examples .example-preview').first().waitFor();
  return page.locator('aevko-component-examples .example-preview');
}
async function bounds(panel) {
  await page.waitForTimeout(250);
  const r = await panel.boundingBox();
  assert(
    r && r.x >= -1 && r.y >= -1 && r.x + r.width <= 391 && r.y + r.height <= 845,
    JSON.stringify(r),
  );
}
try {
  for (const slug of [
    'popover',
    'dropdown-menu',
    'context-menu',
    'select',
    'combobox',
    'date-picker',
  ]) {
    const previews = await visit(slug);
    const root = previews.first();
    const panel = root
      .locator(`[data-slot="${slug === 'date-picker' ? 'popover' : slug}-content"]`)
      .first();
    if (slug === 'context-menu')
      await root.locator('[aevkoContextMenuTrigger]').click({ button: 'right' });
    else if (slug === 'combobox') await root.locator('input').fill('a');
    else await root.locator('button').first().click();
    await panel.waitFor({ state: 'visible' });
    await bounds(panel);
    await page.locator('h1').click();
    await panel.waitFor({ state: 'hidden' });
    if (slug === 'context-menu')
      await root.locator('[aevkoContextMenuTrigger]').click({ button: 'right' });
    else if (slug === 'combobox') await root.locator('input').fill('an');
    else await root.locator('button').first().click();
    await panel.waitFor({ state: 'visible' });
    await page.keyboard.press('Escape');
    await panel.waitFor({ state: 'hidden' });
    console.log('DISMISS', slug);
  }
  for (const slug of ['dialog', 'alert-dialog', 'sheet', 'drawer']) {
    const previews = await visit(slug);
    await previews.first().locator('button').first().click();
    const panel = previews.first().locator('dialog');
    await panel.waitFor({ state: 'visible' });
    await bounds(panel);
    if (slug !== 'alert-dialog') {
      await panel.locator('input').fill('Accessible workspace');
      await panel.getByRole('button', { name: 'Save changes', exact: true }).click();
      await panel.waitFor({ state: 'hidden' });
      assert.match(await previews.first().innerText(), /Project saved: Accessible workspace/);
    } else {
      await panel.getByRole('button', { name: 'Confirm archive' }).click();
      await panel.waitFor({ state: 'hidden' });
      assert.match(await previews.first().innerText(), /Project archived/);
    }
    await panel.waitFor({ state: 'hidden' });
    await previews.nth(1).getByRole('button', { name: 'Open details' }).click();
    const alternate = previews.nth(1).locator('dialog');
    await alternate.waitFor({ state: 'visible' });
    await bounds(alternate);
    if (slug === 'drawer') {
      const r = await alternate.boundingBox();
      assert(Math.abs(r.x + r.width - 390) < 2, 'Right drawer touches right viewport edge');
    }
    await page.keyboard.press('Escape');
    await alternate.waitFor({ state: 'hidden' });
    console.log('MODAL', slug);
  }
  const collapsibles = await visit('collapsible');
  const c = collapsibles.first();
  await c.locator('button').click();
  await page.waitForTimeout(65);
  const during = await c.locator('.panel').evaluate((el) => el.getBoundingClientRect().height);
  await page.waitForTimeout(240);
  const after = await c.locator('.panel').evaluate((el) => el.getBoundingClientRect().height);
  assert(during > 0 && during < after);
  await c.locator('button').click();
  assert(await c.locator('.panel').evaluate((el) => el.inert));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert.equal(
    await c.locator('.panel').evaluate((el) => getComputedStyle(el).transitionDuration),
    '0s',
  );
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  console.log('MOTION collapsible');
  const sidebar = await visit('sidebar');
  const side = sidebar.first();
  await side.getByRole('button', { name: 'Menu', exact: true }).click();
  await bounds(side.locator('aside'));
  await side
    .getByRole('button', { name: 'Close navigation', exact: true })
    .click({ position: { x: 380, y: 400 } });
  assert.equal(
    await side.getByRole('button', { name: 'Menu', exact: true }).getAttribute('aria-expanded'),
    'false',
  );
  console.log('SIDEBAR backdrop');
  const toast = await visit('toast');
  await toast.first().getByRole('button', { name: 'Success', exact: true }).click();
  assert.equal(await page.getByText('Changes saved', { exact: true }).count(), 1);
  await toast.nth(1).getByRole('button', { name: 'Archive project', exact: true }).click();
  await toast.nth(1).getByRole('button', { name: 'Undo', exact: true }).click();
  assert.match(await toast.nth(1).innerText(), /Project restored/);
  console.log('TOAST isolated stores and undo');
  const button = await visit('button');
  await button.first().getByRole('button', { name: 'Primary', exact: true }).click();
  assert.match(await button.first().innerText(), /primary selected/);
  console.log('ACTION button');
  console.log('PASS extra example interactions');
} finally {
  await browser.close();
}
