import { test, expect } from '@playwright/test';

test.use({ storageState: 'auth.json' });

test('should be logged in to Pinterest', async ({ page }) => {
    await page.goto('https://ru.pinterest.com');

    const searchInput = page.locator('input[name="searchBoxInput"]');
    await expect(searchInput).toBeVisible();

    const profileButton = page.locator('[data-test-id="header-profile"]');
    await expect(profileButton).toBeVisible();

    await searchInput.fill('Красивая анимация');
    await searchInput.press('Enter');

    const firstPin = page.locator('[data-test-pin-slot-index="0"]');
    await firstPin.click();

    await expect(page).toHaveURL(/pin/);

    const likeButton = page.locator('button[aria-label="Отреагировать"]');
    await likeButton.waitFor({ state: 'visible', timeout: 15000 });

    const isLiked = await likeButton.getAttribute('aria-pressed') === 'true';

    if (isLiked) {
        await likeButton.click();
        await expect(likeButton).toHaveAttribute('aria-pressed', 'false');
    }

    await likeButton.click();
    
    await page.reload({ waitUntil: 'domcontentloaded' });

    await expect(likeButton).toHaveAttribute('aria-pressed', 'true');
});
