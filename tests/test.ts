import { expect, test } from '@playwright/test';

test('index page has expected navbar', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'printstimate' })).toBeVisible();
});
