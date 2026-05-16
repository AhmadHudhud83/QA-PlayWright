import { test, expect } from '../pages/fixtures';
import users from '../test-data/users.json';

test.describe('Login Parameterized Tests', () => {

    for (const user of users) {
        test(`Login test for ${user.username} (${user.description})`, async ({ loginPage, page }) => {
            await loginPage.navigate();
            await loginPage.login(user.username, process.env.PASSWORD!);

            if (user.shouldPass) {
                await expect(page).toHaveURL(/inventory/);
            } else {
                await expect(loginPage.errorMessage).toContainText(user.expectedError!);
            }
        });
    }

    test('Detect broken images for problem_user', async ({ page, loginPage, inventoryPage }) => {
        await loginPage.navigate();
        await loginPage.login('problem_user', process.env.PASSWORD!);

        const images = page.locator('.inventory_item_img img');
        const allImages = await images.all();

        for (const img of allImages) {
            const naturalWidth = await img.evaluate((node: HTMLImageElement) => node.naturalWidth);
            expect(naturalWidth).toBeGreaterThan(0);
        }
    });
});