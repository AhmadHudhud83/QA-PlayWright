import { test, expect } from '../pages/fixtures';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Scans', () => {
    test('Inventory page should not have any automatically detectable accessibility violations', async ({ page, inventoryPage }) => {
        await inventoryPage.navigate();
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    });
});