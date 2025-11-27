
import { test, expect } from '@playwright/test';

test.describe('Critical Path', () => {
  test('User can load dashboard and navigate to Create Event', async ({ page }) => {
    // 1. Visit Home
    await page.goto('/');

    // 2. Check Dashboard Loaded
    await expect(page.getByText('Budget Overview')).toBeVisible();
    await expect(page.getByText('Namaste, Jay Deep!')).toBeVisible();

    // 3. Click "Plan New Event"
    await page.getByText('Plan New Event').click();

    // 4. Verify Wizard Loaded
    await expect(page.getByText('Plan New Event')).toBeVisible();
    await expect(page.getByText('Wedding')).toBeVisible();
  });

  test('User can view Marketplace', async ({ page }) => {
    await page.goto('/');
    
    // Click Sidebar link
    await page.getByText('Marketplace').click();
    
    // Verify Vendor List
    await expect(page.getByText('Vendor Marketplace')).toBeVisible();
    await expect(page.getByText('Royal Heritage Banquet')).toBeVisible();
  });
});
