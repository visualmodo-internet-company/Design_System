import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test.beforeEach(async ({ page }) => { await page.goto('/'); });
test('overview composes the shared shell with semantic headings', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Project overview' })).toHaveCount(1);
  await expect(page.getByRole('heading', { name: 'Production deployment', exact: false })).toBeVisible();
  await expect(page.getByRole('main')).toHaveCount(1);
});
test('dropdown labels and selected indicators follow the Vercel menu geometry', async ({ page }) => {
  await page.getByRole('button', { name: 'Change theme' }).click();
  const menu = page.getByRole('menu');
  await expect(menu).toBeVisible();
  const label = menu.locator('.ds-menu-label');
  await expect(label).toHaveText('Appearance');
  expect(await label.evaluate((node) => getComputedStyle(node).fontSize)).toBe('14px');
  const selected = menu.getByRole('menuitemradio', { name: 'Dark' });
  expect(Math.round((await selected.boundingBox())?.height ?? 0)).toBe(40);
  const geometry = await selected.evaluate((item) => {
    const content = item.querySelector('.ds-menu-item-content');
    const selection = item.querySelector('.ds-menu-selection');
    if (!(content instanceof HTMLElement) || !(selection instanceof HTMLElement)) return null;
    const contentRect = content.getBoundingClientRect();
    const selectionRect = selection.getBoundingClientRect();
    return { contentRight: contentRect.right, selectionLeft: selectionRect.left };
  });
  expect(geometry).not.toBeNull();
  expect((geometry?.selectionLeft ?? 0)).toBeGreaterThan(geometry?.contentRight ?? 0);
  await page.keyboard.press('Escape');

  await page.getByRole('button', { name: /Status/ }).click();
  const statusItem = page.getByRole('menuitemradio', { name: 'All statuses' });
  await expect(statusItem).toHaveAttribute('data-state', 'checked');
  expect(Math.round((await statusItem.boundingBox())?.height ?? 0)).toBe(40);
});

test('page-level controls use 36px while compact card actions use 32px', async ({ page }) => {
  const height = async (locator: ReturnType<typeof page.getByRole>) => Math.round((await locator.boundingBox())?.height ?? 0);
  expect(await height(page.locator('.ds-toolbar .ds-search'))).toBe(36);
  expect(await height(page.getByRole('button', { name: /Status/ }))).toBe(36);
  expect(await height(page.getByRole('button', { name: 'Connect Git' }))).toBe(36);
  expect(await height(page.getByRole('button', { name: 'Instant rollback' }))).toBe(36);
  expect(await height(page.getByRole('button', { name: 'Visit', exact: true }))).toBe(36);
  expect(await height(page.getByRole('button', { name: 'Visit options' }))).toBe(36);
  expect(await height(page.getByRole('button', { name: 'Enable analytics' }))).toBe(32);
  expect(await height(page.getByRole('button', { name: 'Documentation' }))).toBe(32);
});

test('branch search recovers from an empty result', async ({ page }) => {
  await page.getByRole('searchbox', { name: 'Search branches' }).fill('not-a-real-branch');
  await expect(page.getByRole('heading', { name: 'No matching branches' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(page.getByText('main', { exact: true }).last()).toBeVisible();
});
test('contextual sidebar back control keeps its label centered with the icon anchored left', async ({ page }) => {
  await page.getByRole('link', { name: 'Network' }).click();
  const back = page.getByRole('button', { name: 'Back to overview' });
  await expect(back).toBeVisible();
  const geometry = await back.evaluate((button) => {
    const label = button.querySelector('.ds-nav-back-label');
    const icon = button.querySelector('svg');
    if (!(label instanceof HTMLElement) || !(icon instanceof SVGElement)) return null;
    const buttonRect = button.getBoundingClientRect();
    const labelRect = label.getBoundingClientRect();
    const iconRect = icon.getBoundingClientRect();
    return {
      buttonCenter: buttonRect.left + buttonRect.width / 2,
      labelCenter: labelRect.left + labelRect.width / 2,
      iconLeft: iconRect.left,
      buttonLeft: buttonRect.left,
    };
  });
  expect(geometry).not.toBeNull();
  expect(Math.abs((geometry?.buttonCenter ?? 0) - (geometry?.labelCenter ?? 0))).toBeLessThanOrEqual(1);
  expect((geometry?.iconLeft ?? 0) - (geometry?.buttonLeft ?? 0)).toBeLessThan(20);
});

test('team switcher matches the scoped popover interaction', async ({ page }) => {
  const trigger = page.getByRole('button', { name: 'Switch team' });
  await trigger.click();
  const popover = page.getByRole('dialog', { name: 'Switch team' });
  await expect(popover).toBeVisible();
  await expect(page.getByRole('searchbox', { name: 'Search teams' })).toBeFocused();
  await expect(popover.getByText('Teams you create and join appear here for quick context switching.')).toBeVisible();
  await expect(popover.getByRole('button', { name: 'Create Team', exact: false })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(popover).toHaveCount(0);
});

test('keyboard search opens the sidebar command panel and closes without a mouse', async ({ page }) => {
  await page.keyboard.press('f');
  const panel = page.getByRole('dialog', { name: 'Find' });
  await expect(panel).toBeVisible();
  await expect(page.getByRole('searchbox', { name: 'Find' })).toBeFocused();
  await expect(panel.getByText('Navigation Assistant')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(panel).toHaveCount(0);
});
test('sidebar keyboard resizing persists its bounded width', async ({ page }) => {
  const resizer = page.getByRole('separator', { name: 'Resize sidebar' });
  await resizer.focus(); await page.keyboard.press('End');
  await expect(resizer).toHaveAttribute('aria-valuenow', '400');
  await page.reload(); await expect(resizer).toHaveAttribute('aria-valuenow', '400');
  await resizer.focus(); await page.keyboard.press('Home');
  await expect(resizer).toHaveAttribute('aria-valuenow', '240');
});
for (const width of [390, 768, 960, 961, 1440, 2048]) {
  test(`no document overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
test('mobile navigation closes with Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Open sidebar' }).click();
  await expect(page.getByRole('dialog', { name: 'Navigation' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
});
test('automated WCAG 2 AA scan of the overview', async ({ page }) => {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(results.violations).toEqual([]);
});
