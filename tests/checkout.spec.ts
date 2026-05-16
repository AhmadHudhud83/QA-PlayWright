import { test, expect } from '../pages/fixtures';

test.describe('Checkout and Session Features', () => {

    test('Checkout with multiple items successfully', async ({ inventoryPage, cartPage, checkoutPage }) => {
        await inventoryPage.navigate();
        await inventoryPage.addItemByIndex(0);
        await inventoryPage.addItemByIndex(1);

        await inventoryPage.cartLink.click();
        await cartPage.clickCheckout();

        await checkoutPage.fillInformation('Jane', 'Smith', '90210');
        await checkoutPage.clickFinish();

        await expect(checkoutPage.successHeader).toHaveText('Thank you for your order!');
    });

    test('Should show error when checkout form is incomplete', async ({ inventoryPage, cartPage, checkoutPage }) => {
        await inventoryPage.navigate();
        await inventoryPage.addItemByIndex(0);
        await inventoryPage.cartLink.click();
        await cartPage.clickCheckout();

        await checkoutPage.continueButton.click();
        await expect(checkoutPage.page.locator('[data-test="error"]')).toContainText('Error: First Name is required');
    });

    test('User should be able to logout and lose access', async ({ inventoryPage, loginPage, page }) => {
        await inventoryPage.navigate();

        await page.click('#react-burger-menu-btn');
        await page.click('#logout_sidebar_link');

        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await page.goto('https://www.saucedemo.com/inventory.html');
        await expect(loginPage.errorMessage).toBeVisible();
    });
});