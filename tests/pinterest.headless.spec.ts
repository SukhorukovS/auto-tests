import { test, expect } from '@playwright/test';

test('should be logged in to Pinterest', async ({ page }) => {
    await page.goto('https://ru.pinterest.com/ideas');

    const searchInput = page.locator('input[name="searchBoxInput"]');
    await expect(searchInput).toBeVisible();

    await searchInput.fill('Красивая анимация');
    await searchInput.press('Enter');

    const firstPin = page.locator('[data-test-pin-slot-index="0"]');
    await firstPin.click();

    await expect(page).toHaveURL(/pin/);
});
