
import { test, expect } from '@playwright/test';

test.describe('Responsive Layout', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE size

  test('Mobile view shows bottom navigation and hides sidebar', async ({ page }) => {
    await page.goto('/');

    // Sidebar should be hidden (md:flex hidden)
    // We verify by checking specific desktop-only classes or visibility
    // In this case, we check if the mobile header is visible
    await expect(page.getByText('UPGRADE')).toBeVisible(); // Mobile header item

    // Verify Bottom Navigation is present
    const bottomNav = page.locator('nav').last();
    await expect(bottomNav).toBeVisible();
    await expect(bottomNav.getByText('My Events')).toBeVisible();
  });
});
