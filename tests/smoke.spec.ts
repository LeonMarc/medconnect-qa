import { test, expect } from '@playwright/test';

test('nombre descriptivo', async ({ page }) => { 
    await page.setContent('<h1>Hola</h1>');
    await expect(page.getByRole('heading')).toHaveText('Hola');
    })