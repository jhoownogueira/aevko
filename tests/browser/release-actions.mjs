import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const base = process.env.AEVKO_DOCS_URL ?? 'http://localhost:4200';
const browser = await chromium.launch({ channel: 'chromium' });
const page = await browser.newPage({ permissions: ['clipboard-read', 'clipboard-write'] });
const cases = [];
try {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const family of ['login', 'signup', 'sidebar']) {
      for (let index = 1; index <= (family === 'sidebar' ? 16 : 5); index++) {
        const slug = `${family}-${String(index).padStart(2, '0')}`;
        await page.goto(`${base}/blocks/${slug}`, { waitUntil: 'networkidle' });
        const host = page.locator(`[data-slot="${slug}-block"]`);
        if (family === 'sidebar') {
          if (width === 390) await host.getByRole('button', { name: 'Menu', exact: true }).click();
          const search = host.getByRole('searchbox', { name: 'Filter navigation' });
          await search.fill('no matches');
          await host.getByText('No matching pages.', { exact: true }).waitFor();
          await search.fill('');
          const link = host.locator('.sidebar-nav a').nth(1);
          const name = (await link.innerText()).replace('›', '').trim();
          await link.click();
          assert.equal((await host.locator('h1').innerText()).trim(), name);
          if (width === 390) await page.keyboard.press('Escape');
          await host.getByRole('button', { name: 'Create new', exact: true }).click();
          await host
            .getByRole('textbox', { name: 'Project name', exact: true })
            .fill('Release review');
          await host.getByRole('button', { name: 'Create project', exact: true }).click();
          await host
            .getByRole('status')
            .filter({ hasText: 'Project created: Release review' })
            .waitFor();
          assert(
            (await host.locator('[aria-label="Created projects"]').innerText()).includes(
              'Release review',
            ),
          );
        } else {
          const submit = host.getByRole('button', {
            name: family === 'login' ? 'Sign in' : 'Create account',
            exact: true,
          });
          await submit.click();
          assert.equal(await host.getByRole('status').innerText(), '');
          await host
            .getByRole('textbox', { name: 'Email', exact: true })
            .fill('review@example.com');
          await host.getByLabel('Password', { exact: true }).fill('example-password');
          if (family === 'signup') {
            await host.getByRole('textbox', { name: 'Name', exact: true }).fill('Example person');
            await host.getByRole('checkbox').check();
          }
          await submit.click();
          await host.getByRole('status').filter({ hasText: 'Form validated.' }).waitFor();
          assert.equal(await host.getByLabel('Password', { exact: true }).inputValue(), '');
          assert.equal(
            await host.getByRole('button', { name: 'Continue with a provider' }).count(),
            0,
          );
        }
        cases.push({ slug, width });
        console.log('BLOCK_ACTIONS_OK', width, slug);
      }
    }
  }
  for (const [slug, trigger, action] of [
    ['dropdown-menu', 'Open menu', 'Profile'],
    ['dialog', 'Edit workspace', 'Save changes'],
    ['alert-dialog', 'Delete workspace', 'Delete workspace'],
    ['drawer', 'Open filters', 'Apply filters'],
    ['sheet', 'Open settings', 'Save changes'],
    ['menubar', null, 'File'],
    ['empty', null, 'Create project'],
    ['item', null, 'Open'],
    ['tooltip', null, 'Save workspace'],
  ]) {
    await page.goto(`${base}/components/${slug}`, { waitUntil: 'networkidle' });
    const preview = page.locator('.component-preview');
    if (trigger) await preview.getByRole('button', { name: trigger, exact: true }).click();
    // Menu items expose menuitem, while dialog actions retain native button roles.
    const target = preview.locator('button').filter({ hasText: action });
    if (slug === 'tooltip') await preview.getByRole('button', { name: action }).click();
    else await target.last().click();
    await page.locator('.preview-status').waitFor();
    assert((await page.locator('.preview-status').innerText()).length > 0);
    console.log('PREVIEW_ACTION_OK', slug);
  }
  await page.getByRole('button', { name: 'Copy page', exact: true }).click();
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  assert(copied.includes('## API reference') && copied.includes('## Accessibility'));
  await page
    .getByRole('navigation', { name: 'On this page' })
    .getByRole('link', { name: 'API', exact: true })
    .click();
  assert.equal(new URL(page.url()).pathname, '/components/tooltip');
  assert.equal(await page.evaluate(() => document.activeElement?.id), 'api-reference');
} finally {
  await mkdir('tmp/release-review', { recursive: true });
  await writeFile('tmp/release-review/actions.json', JSON.stringify(cases, null, 2));
  await browser.close();
}
console.log(`RELEASE_ACTIONS_OK ${cases.length} block cases and 9 component actions`);
