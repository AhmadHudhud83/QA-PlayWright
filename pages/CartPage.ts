import { Locator, Page } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;
    readonly cartItemNames: Locator;
    readonly removeButtons: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.cartItemNames = page.locator('.inventory_item_name');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.removeButtons = page.locator('button[id^="remove-"]');
    }

    async navigate() {
        await this.page.goto('/cart.html');
    }

    async removeItemByIndex(index: number) {
        await this.removeButtons.nth(index).click();
    }

    async getCartItemCount() {
        return await this.cartItems.count();
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }
}