import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { FeedPage } from '../pages/FeedPage'

test('login por UI funciona', async ({ page }) => { 
    const loginPage = new LoginPage(page);
    const feedPage = new FeedPage(page);

    await loginPage.goto();
    await loginPage.login('dra.rivas@medconnect.test', 'Salud2024!');

    await feedPage.expectLoaded();

 });

test('tras login, el feed muestra las publicaciones', async ({ page}) => {
    const loginPage = new LoginPage(page);
    const feedPage = new FeedPage(page);

    await loginPage.goto();
    await loginPage.login('dra.rivas@medconnect.test', 'Salud2024!');

    await feedPage.expectLoaded();
    await feedPage.expectPublicationsCount(3);

})