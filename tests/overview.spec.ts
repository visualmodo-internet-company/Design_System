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
  expect(await height(page.locator('.ds-analytics-empty').getByRole('button', { name: 'Enable analytics' }))).toBe(32);
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

test('sidebar user menu matches the supplied account dropdown composition', async ({ page }) => {
  await page.getByRole('button', { name: 'Open user menu' }).click();
  const menu = page.getByRole('menu');
  await expect(menu).toBeVisible();

  const box = await menu.boundingBox();
  expect(Math.round(box?.width ?? 0)).toBe(330);

  await expect(menu.getByRole('menuitem', { name: 'Account settings' })).toBeVisible();
  for (const name of ['Feedback', 'Home Page', 'Changelog', 'Help', 'Docs', 'Log Out', 'Upgrade to Pro', 'All systems normal.']) {
    await expect(menu.getByRole('menuitem', { name, exact: true })).toBeVisible();
  }

  const upgrade = menu.getByRole('menuitem', { name: 'Upgrade to Pro' });
  expect(Math.round((await upgrade.boundingBox())?.height ?? 0)).toBe(36);

  const status = menu.getByRole('menuitem', { name: 'All systems normal.' });
  await expect(status.locator('.ds-user-menu-status-dot')).toBeVisible();

  const home = menu.getByRole('menuitem', { name: 'Home Page' });
  await home.hover();
  expect(await home.evaluate((node) => getComputedStyle(node).borderRadius)).toBe('6px');
});

test('account settings pages are navigable from the user menu with the complete settings sidebar', async ({ page }) => {
  await page.getByRole('button', { name: 'Open user menu' }).click();
  await page.getByRole('menuitem', { name: 'Account settings' }).click();
  await expect(page.getByRole('main')).toContainText('Display Name');

  const expectedLinks = ['Authentication', 'Sign in with Vercel', 'Billing Information', 'Billing Items', 'Invoices', 'Tokens'];
  for (const label of expectedLinks) await expect(page.getByRole('link', { name: label, exact: true })).toBeVisible();

  await page.getByRole('link', { name: 'Authentication', exact: true }).click();
  await expect(page.getByRole('main')).toContainText('Sign-in Methods');
  await expect(page.getByRole('main')).toContainText('Two-Factor Authentication');

  await page.getByRole('link', { name: 'Sign in with Vercel', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Sign in with Vercel', exact: true })).toBeVisible();
  await expect(page.getByRole('searchbox', { name: 'Filter applications' })).toBeVisible();

  await page.getByRole('link', { name: 'Billing Information', exact: true }).click();
  await expect(page.getByRole('textbox', { name: 'Invoice Email Recipient' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Company Name' })).toBeVisible();

  await page.getByRole('link', { name: 'Billing Items', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Personal' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Teams' })).toBeVisible();

  await page.getByRole('link', { name: 'Invoices', exact: true }).click();
  await expect(page.getByText('No Invoices', { exact: true })).toBeVisible();

  await page.getByRole('link', { name: 'Tokens', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Tokens', exact: true })).toBeVisible();
  await expect(page.getByRole('table', { name: 'Access tokens' })).toBeVisible();

  await page.getByRole('button', { name: 'Back', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Project overview' })).toHaveCount(1);
});

test('account pages do not expose personal account export identifiers', async ({ page }) => {
  await page.getByRole('button', { name: 'Open user menu' }).click();
  await page.getByRole('menuitem', { name: 'Account settings' }).click();
  const text = await page.getByRole('main').innerText();
  expect(text).not.toContain('contact-');
  expect(text).not.toContain('team_');
  expect(text).not.toContain('dpl_');
});

test('account submenu typography exactly matches the primary sidebar item typography', async ({ page }) => {
  await page.getByRole('button', { name: 'Open user menu' }).click();
  await page.getByRole('menuitem', { name: 'Account settings' }).click();

  const primary = page.getByRole('link', { name: 'Overview', exact: true });
  const child = page.getByRole('link', { name: 'Authentication', exact: true });
  const styles = async (locator: ReturnType<typeof page.getByRole>) => locator.evaluate((node) => {
    const css = getComputedStyle(node);
    return {
      family: css.fontFamily,
      size: css.fontSize,
      weight: css.fontWeight,
      lineHeight: css.lineHeight,
      letterSpacing: css.letterSpacing,
    };
  });
  expect(await styles(child)).toEqual(await styles(primary));
});

test('account Settings typography follows the supplied Geist heading and copy classes', async ({ page }) => {
  await page.getByRole('button', { name: 'Open user menu' }).click();
  await page.getByRole('menuitem', { name: 'Account settings' }).click();

  const title = page.getByRole('heading', { name: 'Display Name' });
  const description = page.getByText('Please enter your full name, or a display name you are comfortable with.');
  const footerCopy = page.getByText('Please use 32 characters at maximum.');

  const titleStyle = await title.evaluate((node) => {
    const css = getComputedStyle(node);
    return { size: css.fontSize, weight: css.fontWeight, lineHeight: css.lineHeight, letterSpacing: css.letterSpacing };
  });
  expect(titleStyle.size).toBe('20px');
  expect(titleStyle.weight).toBe('600');
  expect(titleStyle.lineHeight).toBe('28px');

  for (const locator of [description, footerCopy]) {
    const copyStyle = await locator.evaluate((node) => {
      const css = getComputedStyle(node);
      return { size: css.fontSize, weight: css.fontWeight, lineHeight: css.lineHeight };
    });
    expect(copyStyle.size).toBe('14px');
    expect(copyStyle.weight).toBe('400');
    expect(copyStyle.lineHeight).toBe('20px');
  }
});

test('account settings matches the reference card geometry and footer alignment', async ({ page }) => {
  await page.getByRole('button', { name: 'Open user menu' }).click();
  await page.getByRole('menuitem', { name: 'Account settings' }).click();

  const header = page.locator('.ds-header[data-variant="account"]');
  expect(Math.round((await header.boundingBox())?.height ?? 0)).toBe(56);

  const firstCard = page.locator('.ds-account-card').first();
  expect(Math.round((await firstCard.boundingBox())?.width ?? 0)).toBe(928);

  const stack = page.locator('.ds-account-stack');
  expect(await stack.evaluate((node) => getComputedStyle(node).gap)).toBe('32px');

  const displayInput = page.getByRole('textbox', { name: 'Display Name' });
  const borderCheck = await displayInput.evaluate((node) => {
    const input = getComputedStyle(node);
    const probe = document.createElement('span');
    probe.style.color = 'var(--ds-account-input-border)';
    document.body.append(probe);
    const token = getComputedStyle(probe).color;
    probe.remove();
    return { inputBorder: input.borderTopColor, token };
  });
  expect(borderCheck.inputBorder).toBe(borderCheck.token);

  const displayCard = page.getByRole('heading', { name: 'Display Name' }).locator('..').locator('..').locator('..');
  const footer = displayCard.locator('.ds-account-card-footer');
  expect(Math.round((await footer.boundingBox())?.height ?? 0)).toBe(56);
  const save = footer.getByRole('button', { name: 'Save' });
  await expect(save).toBeDisabled();
  const rightGap = await footer.evaluate((node) => {
    const button = node.querySelector('button');
    if (!(button instanceof HTMLElement)) return -1;
    const a = node.getBoundingClientRect();
    const b = button.getBoundingClientRect();
    return Math.round(a.right - b.right);
  });
  expect(rightGap).toBeGreaterThanOrEqual(20);
  expect(rightGap).toBeLessThanOrEqual(28);

  const emailCard = page.getByRole('heading', { name: 'Email', exact: true }).locator('..').locator('..').locator('..');
  const addAnother = emailCard.getByRole('button', { name: 'Add Another' });
  expect(Math.round((await addAnother.boundingBox())?.width ?? 0)).toBeLessThan(180);
});

test('sidebar user trigger uses the same radius as navigation items', async ({ page }) => {
  const userTrigger = page.getByRole('button', { name: 'Open user menu' });
  const navItem = page.getByRole('link', { name: 'Overview', exact: true });
  const radius = async (locator: ReturnType<typeof page.getByRole>) =>
    locator.evaluate((node) => getComputedStyle(node).borderRadius);
  expect(await radius(userTrigger)).toBe(await radius(navItem));
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
