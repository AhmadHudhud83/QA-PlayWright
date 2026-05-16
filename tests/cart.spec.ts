import { test, expect } from '../pages/fixtures';


test.describe('Cart and Removal Features', () => {

    test('Add one item, verify, and remove it', async ({ inventoryPage, cartPage }) => {
        await inventoryPage.navigate();

        await inventoryPage.addItemByIndex(0);
        await expect(inventoryPage.cartBadge).toHaveText('1');

        await inventoryPage.cartLink.click();
        expect(await cartPage.getCartItemCount()).toBe(1);

        await cartPage.removeItemByIndex(0);
        expect(await cartPage.getCartItemCount()).toBe(0);
        await expect(inventoryPage.cartBadge).not.toBeVisible();
    });

    test('Add multiple items and remove them sequentially', async ({ inventoryPage, cartPage }) => {
        await inventoryPage.navigate();

        await inventoryPage.addItemByIndex(0);
        await inventoryPage.addItemByIndex(1);
        await inventoryPage.addItemByIndex(2);

        await inventoryPage.cartLink.click();
        expect(await cartPage.getCartItemCount()).toBe(3);

        await cartPage.removeItemByIndex(0);
        expect(await cartPage.getCartItemCount()).toBe(2);
        await expect(inventoryPage.cartBadge).toHaveText('2');

        await cartPage.removeItemByIndex(0);
        await cartPage.removeItemByIndex(0);
        expect(await cartPage.getCartItemCount()).toBe(0);
    });

    test('Should add item to cart from individual product page', async ({ inventoryPage, page }) => {
        await inventoryPage.navigate();
        await inventoryPage.itemNames.first().click();

        await expect(page).toHaveURL(/inventory-item.html/);
        await page.locator('[data-test^="add-to-cart"]').click();
        await expect(inventoryPage.cartBadge).toHaveText('1');
    });


    test('Price consistency between inventory and detail page', async ({ inventoryPage, page }) => {
        await inventoryPage.navigate();

        const mainPagePrice = await inventoryPage.itemPrices.first().innerText();

        await inventoryPage.itemNames.first().click();

        const detailPagePrice = await page.locator('.inventory_details_price').innerText();

        expect(mainPagePrice).toBe(detailPagePrice);
    });


    test('Cart items should persist after page reload', async ({ inventoryPage, page }) => {
        await inventoryPage.navigate();
        await inventoryPage.addItemByIndex(0);
        await expect(inventoryPage.cartBadge).toHaveText('1');
        await page.reload();
        await expect(inventoryPage.cartBadge).toHaveText('1');
    });
});