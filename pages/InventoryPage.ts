import { Locator, Page, expect } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly inventoryItems: Locator;
    readonly addItemButtons: Locator;
    readonly removeItemButtons: Locator;
    readonly cartBadge: Locator;
    readonly cartLink: Locator;
    readonly sortDropdown: Locator;
    readonly itemNames: Locator;
    readonly itemPrices: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItems = page.locator('.inventory_item');
        this.addItemButtons = page.locator('button[id^="add-to-cart"]');
        this.removeItemButtons = page.locator('button[id^="remove-"]');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartLink = page.locator('.shopping_cart_link');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.itemNames = page.locator('.inventory_item_name');
        this.itemPrices = page.locator('.inventory_item_price');
    }

    async navigate() {
        await this.page.goto('/inventory.html');
    }

    async addItemByIndex(index: number) {
        await this.addItemButtons.nth(index).click();
    }

    async removeItemByIndex(index: number) {
        await this.removeItemButtons.nth(index).click();
    }

    async selectSort(option: 'az' | 'za' | 'lohi' | 'hilo') {
        await this.sortDropdown.selectOption(option);
    }

    async getAllItemNames() {
        return await this.itemNames.allTextContents();
    }

    async getAllItemPrices() {
        const prices = await this.itemPrices.allTextContents();
        return prices.map(price => parseFloat(price.replace('$', '')));
    }
}