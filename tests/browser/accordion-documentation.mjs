import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
const browser = await chromium.launch({ channel: 'chromium' });
const context = await browser.newContext({
  permissions: ['clipboard-read', 'clipboard-write'],
  viewport: { width: 1440, height: 1000 },
});
const page = await context.newPage();
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
try {
  await page.goto(`${process.env.AEVKO_DOCS_URL ?? 'http://localhost:4200'}/components/accordion`, {
    waitUntil: 'networkidle',
  });
  const accordion = page.locator('.accordion-overview');
  const region = accordion.locator('[role="region"]').first();
  await accordion.getByRole('button').first().click();
  await page.waitForTimeout(65);
  const opening = await region.evaluate((el) => el.getBoundingClientRect().height);
  await page.waitForTimeout(250);
  const opened = await region.evaluate((el) => el.getBoundingClientRect().height);
  assert(opening > 0 && opening < opened, 'accordion visibly animates open');
  await accordion.getByRole('button').first().click();
  await page.waitForTimeout(65);
  const closing = await region.evaluate((el) => el.getBoundingClientRect().height);
  assert(closing > 0 && closing < opened, 'accordion visibly animates closed');
  await page.waitForTimeout(250);
  assert.equal(await region.evaluate((el) => el.getBoundingClientRect().height), 0);
  const examples = page.locator('aevko-accordion-examples');
  await examples.waitFor();
  assert.equal(await examples.locator(':scope > section').count(), 5);
  for (const section of await examples.locator(':scope > section').all()) {
    await section.getByRole('button', { name: 'View code', exact: true }).click();
    await section.locator('aevko-code-editor').waitFor({ state: 'visible' });
    await section.getByRole('button', { name: 'Hide code', exact: true }).click();
  }
  const multiple = examples.locator('#example-multiple').locator('..');
  await multiple.locator('aevko-accordion button').nth(1).click();
  assert.equal(await multiple.locator('[aria-expanded="true"]').count(), 2);
  await page.getByRole('tab', { name: 'Manual', exact: true }).click();
  await page.keyboard.press('ArrowLeft');
  await page.locator('#installation-command-tab[aria-selected="true"]').waitFor();
  await page.keyboard.press('ArrowRight');
  await page.locator('#installation-manual-tab[aria-selected="true"]').waitFor();
  const manual = page.locator('aevko-manual-installation');
  await manual.locator('details').first().waitFor();
  assert.equal(await manual.locator('details').count(), 4);
  await manual.locator('summary').first().click();
  await manual.getByRole('button', { name: 'Copy code', exact: true }).first().click();
  assert((await page.evaluate(() => navigator.clipboard.readText())).includes('AevkoAccordion'));
  await page.getByRole('button', { name: 'Copy page', exact: true }).click();
  assert((await page.evaluate(() => navigator.clipboard.readText())).includes('# Accordion'));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert.equal(await region.evaluate((el) => getComputedStyle(el).transitionDuration), '0s');
  await mkdir('tmp', { recursive: true });
  await page.screenshot({ path: 'tmp/accordion-documentation.png', fullPage: true });
  assert.deepEqual(errors, []);
  console.log(
    'ACCORDION_DOCS_OK animation, five examples, manual source, clipboard, reduced motion',
  );
} finally {
  await browser.close();
}
