import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const selected = process.env.AEVKO_COMPONENTS?.split(',');
const catalog = JSON.parse(await readFile('apps/docs/examples/coverage.json', 'utf8')).filter(
  (row) => !selected || selected.includes(row.slug),
);
const browser = await chromium.launch({ channel: 'chromium' });
const page = await browser.newPage({ permissions: ['clipboard-read', 'clipboard-write'] });
const base = process.env.AEVKO_DOCS_URL ?? 'http://localhost:4200';
let count = 0;
try {
  for (const { slug, examples } of catalog) {
    await page.goto(`${base}/components/${slug}`, { waitUntil: 'networkidle' });
    await page.locator('#examples').scrollIntoViewIfNeeded();
    const root = page.locator('aevko-component-examples');
    await root
      .locator('.example-preview')
      .first()
      .waitFor()
      .catch(async (error) => {
        console.log('LOAD_FAILURE', slug, page.url(), await root.allTextContents());
        throw error;
      });
    const duplicates = await page.evaluate(() => {
      const ids = [...document.querySelectorAll('[id]')].map((el) => el.id);
      return [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
    });
    assert.deepEqual(duplicates, [], slug + ': unique IDs');
    for (let i = 0; i < examples.length; i++) {
      const section = root.locator(':scope > section').nth(i);
      const toggle = section.locator('button.code-toggle');
      await toggle.click();
      const code = section.locator('.example-code aevko-code-editor').last();
      await code.getByRole('button', { name: 'Copy code', exact: true }).click();
      const text = await page.evaluate(() => navigator.clipboard.readText());
      assert(
        text.includes('@Component(') &&
          text.includes('template:') &&
          text.includes('ChangeDetectionStrategy.OnPush'),
        slug,
      );
      assert(!text.includes('../../../../../registry'));
      await toggle.click();
      await section.locator('.example-code').waitFor({ state: 'detached' });
      count++;
    }
    console.log('SOURCE', slug);
  }
  console.log(
    `PASS ${count} complete code/copy controls and ${catalog.length} pages with unique IDs`,
  );
} finally {
  await browser.close();
}
