import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const { items } = JSON.parse(await readFile('public-registry/index.json', 'utf8'));
const browser = await chromium.launch({ channel: 'chromium' });
const context = await browser.newContext({ permissions: ['clipboard-read', 'clipboard-write'] });
const page = await context.newPage();
try {
  for (const { name } of items) {
    await page.goto(`${process.env.AEVKO_DOCS_URL ?? 'http://localhost:4200'}/components/${name}`, {
      waitUntil: 'networkidle',
    });
    const example = page.locator('#preview');
    await example.locator('button.view-code').click();
    await page.locator('#component-source aevko-code-editor').waitFor({ state: 'visible' });
    await page
      .locator('#component-source')
      .getByRole('button', { name: 'Copy code', exact: true })
      .click();
    assert((await page.evaluate(() => navigator.clipboard.readText())).length > 0);
    await example.locator('button.view-code').click();
    await page.locator('#component-source').waitFor({ state: 'detached' });
    await page.getByRole('tab', { name: 'Manual', exact: true }).click();
    const manual = page.locator('aevko-manual-installation');
    await manual.locator('details').first().waitFor();
    assert.equal(await manual.locator('[role="alert"]').count(), 0);
    assert((await manual.locator('details').count()) > 0);
    console.log('DOC_CONTROLS_OK', name);
  }
} finally {
  await browser.close();
}
