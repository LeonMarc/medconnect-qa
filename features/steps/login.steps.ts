import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { FeedPage } from '../../pages/FeedPage';

const { Given, When, Then } = createBdd();

Given('I am on the login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
});

When('I log in with email {string} and password {string}', async ({ page }, email:string, password:string) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(email, password);
});

Then('I see the feed greeting', async ({ page }) => {
    const feedPage = new FeedPage(page);
    await feedPage.expectLoaded();
});