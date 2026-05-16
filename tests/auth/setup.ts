import { test as setup } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { STORAGE_STATE } from '../../playwright.config';

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await setup.step('Login to SauceDemo', async () => {
        await loginPage.navigate();
        // We pull these from our .env file via process.env
        await loginPage.login(
            process.env.USER_NAME!, 
            process.env.PASSWORD!
        );
    });

    // Wait for the URL to change to the inventory page to ensure login worked
    await page.waitForURL('**/inventory.html');

    // Save the cookies and local storage to a file
    await page.context().storageState({ path: STORAGE_STATE });
});