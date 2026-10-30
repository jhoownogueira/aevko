import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('component pages render canonical previews and pass axe', async ({ page }, testInfo) => {
  test.setTimeout(240_000);
  test.skip(testInfo.project.name.includes('mobile'), 'Covered by the dedicated mobile flow.');

  for (const component of [
    'accordion',
    'aspect-ratio',
    'button',
    'button-group',
    'toggle',
    'badge',
    'alert',
    'progress',
    'spinner',
    'skeleton',
    'avatar',
    'attachment',
    'marker',
    'pagination',
    'breadcrumb',
    'bubble',
    'message',
    'trace',
    'checkbox',
    'switch',
    'radio-group',
    'toggle-group',
    'input-group',
    'input-otp',
    'slider',
    'message-scroller',
    'tabs',
    'code-block',
    'chart',
    'data-table',
    'dialog',
    'alert-dialog',
    'drawer',
    'sheet',
    'popover',
    'hover-card',
    'tooltip',
    'toast',
    'command',
    'dropdown-menu',
    'context-menu',
    'menubar',
    'navigation-menu',
    'calendar',
    'combobox',
    'date-picker',
    'questionnaire',
    'select',
    'card',
    'carousel',
    'collapsible',
    'direction',
    'empty',
    'field',
    'input',
    'item',
    'label',
    'native-select',
    'resizable',
    'scroll-area',
    'separator',
    'sidebar',
    'table',
    'textarea',
  ]) {
    await page.goto(`/components/${component}`);
    const title =
      component === 'input-otp'
        ? 'Input OTP'
        : component
            .split('-')
            .map((word) => word[0]!.toUpperCase() + word.slice(1))
            .join(' ');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
    await expect(page.locator('.component-preview')).toBeVisible();
    await expect(page.locator('.api-table')).toBeVisible();
    await expect(page.locator('.api-table tbody tr').first()).toBeVisible();
    const accessibility = await new AxeBuilder({ page }).analyze();
    expect(accessibility.violations).toEqual([]);
  }
});

test('layout keyboard interactions update state', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.includes('mobile'), 'Desktop keyboard flow.');
  await page.goto('/components/accordion');
  const accordion = page.locator('aevko-accordion button').first();
  await accordion.focus();
  await page.keyboard.press('Enter');
  await expect(accordion).toHaveAttribute('aria-expanded', 'true');

  await page.goto('/components/carousel');
  await page.getByRole('button', { name: 'Next slide' }).click();
  await expect(page.locator('aevko-carousel')).toContainText('2 / 2');

  await page.goto('/components/resizable');
  const separator = page.getByRole('separator');
  await separator.focus();
  await page.keyboard.press('ArrowRight');
  await expect(separator).toHaveAttribute('aria-valuenow', '55');
});

test('basic action and feedback components expose real state', async ({ page }, testInfo) => {
  test.setTimeout(90_000);
  test.skip(testInfo.project.name.includes('mobile'), 'Desktop keyboard flow.');
  await page.goto('/components/toggle');
  const toggle = page.locator('.component-preview button[aevkoToggle]');
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await toggle.focus();
  await page.keyboard.press('Space');
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');

  await page.goto('/components/progress');
  await expect(page.locator('.component-preview aevko-progress')).toHaveAttribute(
    'aria-valuenow',
    '64',
  );

  await page.goto('/components/alert');
  await expect(page.locator('.component-preview aevko-alert')).toHaveAttribute('role', 'status');

  await page.goto('/components/pagination');
  const nextPage = page.getByRole('button', { name: 'Next page' }).first();
  await nextPage.click();
  await expect(page.getByRole('button', { name: 'Page 2' }).first()).toHaveAttribute(
    'aria-current',
    'page',
  );

  await page.goto('/components/breadcrumb');
  await expect(page.locator('.component-preview aevko-breadcrumb-item').last()).toHaveAttribute(
    'aria-current',
    'page',
  );

  await page.goto('/components/trace');
  await expect(
    page.locator('.component-preview aevko-trace-item[data-state="running"]'),
  ).toContainText('Running now');

  await page.goto('/components/checkbox');
  const checkbox = page.locator('.component-preview input[aevkoCheckbox]');
  await expect(checkbox).toBeChecked();
  await checkbox.press('Space');
  await expect(checkbox).not.toBeChecked();

  await page.goto('/components/radio-group');
  const compact = page.locator('.component-preview input[value="compact"]');
  await compact.check();
  await expect(compact).toBeChecked();

  await page.goto('/components/toggle-group');
  const center = page.locator('.component-preview button[data-value="center"]');
  await center.click();
  await expect(center).toHaveAttribute('aria-pressed', 'true');

  await page.goto('/components/input-otp');
  const otp = page.getByRole('textbox', { name: 'Verification code' });
  await otp.fill('12a-34');
  await expect(otp).toHaveValue('12a34');

  await page.goto('/components/slider');
  const slider = page.locator('.component-preview input[type="range"]');
  await slider.focus();
  await page.keyboard.press('ArrowRight');
  await expect(slider).toHaveValue('65');

  await page.goto('/components/message-scroller');
  await expect(page.getByRole('region', { name: 'Project conversation' })).toBeVisible();
  await expect(page.locator('.component-preview [role="log"]')).toContainText('Ready for review');

  await page.goto('/components/tabs');
  const activityTab = page.getByRole('tab', { name: 'Activity' });
  await activityTab.focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Settings' })).toHaveAttribute(
    'aria-selected',
    'true',
  );

  await page.goto('/components/data-table');
  const customerSort = page.getByRole('button', { name: 'Customer' });
  await customerSort.click();
  await expect(customerSort.locator('xpath=..')).toHaveAttribute('aria-sort', 'ascending');
  const firstSelection = page.locator('.component-preview input[type="checkbox"]').first();
  await firstSelection.check();
  await expect(firstSelection).toBeChecked();

  await page.goto('/components/dialog');
  const dialogTrigger = page.getByRole('button', { name: 'Edit workspace' }).first();
  await dialogTrigger.click();
  const dialog = page.getByRole('dialog', { name: 'Edit workspace' });
  await expect(dialog).toBeVisible();
  await expect(page.locator('#dialog-name')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(dialogTrigger).toBeFocused();

  await page.goto('/components/alert-dialog');
  await page.getByRole('button', { name: 'Delete workspace' }).first().click();
  const alertDialog = page.getByRole('alertdialog', { name: 'Delete workspace?' });
  await expect(alertDialog).toBeVisible();
  await page.locator('#keep-workspace').click();
  await expect(alertDialog).toBeHidden();

  await page.goto('/components/popover');
  const popoverTrigger = page.getByRole('button', { name: 'Open options' }).first();
  await popoverTrigger.click();
  await expect(page.getByRole('dialog', { name: 'Workspace options' })).toBeVisible();
  await expect(popoverTrigger).toHaveAttribute('aria-expanded', 'true');

  await page.goto('/components/tooltip');
  const tooltipTrigger = page.getByRole('button', { name: 'Save workspace' }).first();
  await tooltipTrigger.focus();
  await expect(page.getByRole('tooltip')).toBeVisible();

  await page.goto('/components/toast');
  await page.getByRole('button', { name: 'Show toast' }).click();
  await expect(page.getByRole('status')).toContainText('Workspace saved');

  await page.goto('/components/dropdown-menu');
  const menuTrigger = page.getByRole('button', { name: 'Open menu' });
  await menuTrigger.press('ArrowDown');
  await expect(page.getByRole('menu')).toBeVisible();
  await expect(page.getByRole('menuitem').first()).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(menuTrigger).toBeFocused();

  await page.goto('/components/command');
  const commandSearch = page.getByRole('searchbox', { name: 'Project commands' });
  await commandSearch.fill('settings');
  await expect(page.getByRole('option', { name: /Open settings/ })).toBeVisible();

  await page.goto('/components/calendar');
  const selectedDate = page.locator('[data-aevko-date="2026-10-30"]');
  await expect(selectedDate).toHaveAttribute('aria-selected', 'true');
  await selectedDate.focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('[data-aevko-date="2026-10-31"]')).toHaveAttribute(
    'aria-selected',
    'true',
  );

  await page.goto('/components/combobox');
  const combo = page.getByRole('combobox', { name: 'Framework' });
  await combo.fill('Angular');
  await combo.press('Enter');
  await expect(combo).toHaveValue('Angular');

  await page.goto('/components/select');
  const selectTrigger = page.getByRole('button', { name: 'Theme' });
  await selectTrigger.press('ArrowDown');
  await selectTrigger.press('Enter');
  await expect(selectTrigger).toContainText('Light');

  await page.goto('/components/questionnaire');
  await page.getByLabel('A component').check();
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByText('What should verification include?')).toBeVisible();
});

test('layout showcase matches the visual system', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.includes('mobile'), 'Desktop visual baseline.');
  await page.goto('/layout-showcase');
  await expect(page).toHaveScreenshot('layout-showcase-desktop.png', { fullPage: true });
});

test('component catalog keeps an editorial desktop scale', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.includes('mobile'), 'Desktop visual baseline.');
  await page.goto('/components');
  await expect(page).toHaveScreenshot('component-catalog-desktop.png', { fullPage: true });
});

test('button keyboard focus and theme switch remain visible', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.includes('mobile'), 'Desktop keyboard flow.');
  await page.goto('/components/button');
  await expect(page.locator('.monaco-editor')).toHaveCount(2);
  await page.locator('.component-preview button').first().focus();
  await expect(page.locator('.component-preview button').first()).toBeFocused();
  await expect(page).toHaveScreenshot('button-light-desktop.png', { fullPage: true });
  await page.getByRole('button', { name: 'Dark' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page).toHaveScreenshot('button-dark-desktop.png', { fullPage: true });
});

test('code examples switch package managers, copy and format markup', async ({
  page,
  context,
}, testInfo) => {
  test.setTimeout(60_000);
  test.skip(testInfo.project.name.includes('mobile'), 'Desktop documentation flow.');
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/components/field');

  const installation = page.locator('aevko-code-editor').nth(1);
  await installation.getByRole('button', { name: 'pnpm', exact: true }).click();
  await expect(installation.locator('.view-lines')).toContainText(
    'pnpm dlx aevko-ui@latest add field --yes',
  );
  await installation.getByRole('button', { name: 'Copy code' }).click();
  await expect(installation.getByRole('button', { name: 'Code copied' })).toHaveText('Copied');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    'pnpm dlx aevko-ui@latest add field --yes',
  );

  const usage = page.locator('aevko-code-editor').first();
  await usage.getByRole('button', { name: 'Copy code' }).click();
  const formatted = await page.evaluate(() => navigator.clipboard.readText());
  expect(formatted).toContain('\n  <label');
  expect(formatted).toMatch(/\n {4}Email\r?\n/);
});

test('icons guide uses Lucide without coupling installable components', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name.includes('mobile'), 'Desktop documentation flow.');
  await page.goto('/icons');
  await expect(
    page.getByRole('heading', { level: 1, name: 'Icons are optional content.' }),
  ).toBeVisible();
  await expect(page.locator('button[aevkoButton] svg[lucideSave]')).toBeVisible();
  await expect(page.getByText('@lucide/angular', { exact: true })).toBeVisible();
  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations).toEqual([]);
});

test('table keeps native semantics in light and dark themes', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.includes('mobile'), 'Desktop table visual baseline.');
  await page.goto('/components/table');
  const preview = page.locator('.component-preview');
  await expect(preview.locator('table caption')).toContainText('recent invoices');
  await expect(preview.locator('th[scope="col"]')).toHaveCount(4);
  await expect(page).toHaveScreenshot('table-light-desktop.png', { fullPage: true });
  await page.getByRole('button', { name: 'Dark' }).click();
  await expect(page).toHaveScreenshot('table-dark-desktop.png', { fullPage: true });
});

test('documentation guides use the shared Monaco presentation', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.includes('mobile'), 'Desktop documentation flow.');

  for (const [route, editors] of [
    ['/getting-started', 3],
    ['/theming', 1],
    ['/cli', 1],
  ] as const) {
    await page.goto(route);
    await expect(page.locator('aevko-code-editor')).toHaveCount(editors);
    await expect(page.locator('.article > pre')).toHaveCount(0);
    if (route === '/getting-started') {
      await expect(page).toHaveScreenshot('getting-started-desktop.png', { fullPage: true });
    }
  }
});

test('directional components remain usable in RTL', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.includes('mobile'), 'Desktop RTL audit.');

  for (const route of [
    '/components/navigation-menu',
    '/components/calendar',
    '/components/date-picker',
  ]) {
    await page.goto(route);
    await page.evaluate(() => document.documentElement.setAttribute('dir', 'rtl'));
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect(page.locator('.component-preview')).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
    ).toBe(true);
    const accessibility = await new AxeBuilder({ page }).analyze();
    expect(accessibility.violations).toEqual([]);
  }
});

test('mobile navigation exposes every primary guide', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.includes('desktop'), 'Mobile-only flow.');
  await page.goto('/');
  await page.getByRole('button', { name: 'Menu' }).click();
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
  await expect(page).toHaveScreenshot('home-navigation-mobile.png', { fullPage: true });
  await page.getByRole('link', { name: 'Components' }).last().click();
  await expect(page.getByRole('heading', { level: 1, name: 'Components' })).toBeVisible();
});
