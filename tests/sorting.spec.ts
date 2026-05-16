import { test, expect } from '../pages/fixtures';

test.describe('Product Sorting Features', () => {

    test('should sort items alphabetically (A to Z)', async ({ inventoryPage }) => {
        await inventoryPage.navigate();
        await inventoryPage.selectSort('az');

        const names = await inventoryPage.getAllItemNames();
        expect(names).toEqual([...names].sort());
    });

    test('should sort items by price (High to Low)', async ({ inventoryPage }) => {
        await inventoryPage.navigate();
        await inventoryPage.selectSort('hilo');

        const prices = await inventoryPage.getAllItemPrices();
        expect(prices).toEqual([...prices].sort((a, b) => b - a));
    });

    test('Visual Regression - Inventory Page Look and Feel', async ({ inventoryPage, page }) => {
        await inventoryPage.navigate();

        await expect(page).toHaveScreenshot('inventory-page.png');
    });
});