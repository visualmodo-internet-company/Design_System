import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test.beforeEach(async ({ page }) => { await page.goto('/'); });
test('overview composes the shared shell with semantic headings', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Project overview' })).toHaveCount(1);
  await expect(page.getByRole('heading', { name: 'Production deployment', exact: false })).toBeVisible();
  await expect(page.getByRole('main')).toHaveCount(1);
});
test('branch search recovers from an empty result', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Search branches' }).fill('not-a-real-branch');
  await expect(page.getByRole('heading', { name: 'No matching branches' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(page.getByText('main', { exact: true }).last()).toBeVisible();
});
test('keyboard search opens and closes without a mouse', async ({ page }) => {
  await page.keyboard.press('f');
  await expect(page.getByRole('dialog', { name: 'Find in navigation' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
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
