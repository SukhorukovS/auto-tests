import { test, expect } from '@playwright/test';

test('should search pin', async ({ page }, testInfo) => {
    await page.goto('https://ru.pinterest.com/ideas');

    const searchInput = page.locator('input[name="searchBoxInput"]');
    await expect(searchInput).toBeVisible();

    await searchInput.fill('Красивая анимация');
    await searchInput.press('Enter');

    const firstPin = page.locator('[data-test-pin-slot-index="0"]');
    await firstPin.click();

    await expect(page).toHaveURL(/pin/);

    const screenshot = await page.screenshot();
  
    await testInfo.attach('screenshot-name', {
        body: screenshot,
        contentType: 'image/png',
    });
});
