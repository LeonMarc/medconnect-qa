import { Page, Locator, expect } from '@playwright/test';

export class FeedPage {
    readonly page: Page;
    readonly greeting: Locator;
    readonly publicationCards: Locator;

    constructor(page: Page) {
        this.page = page;
        this.greeting = page.getByTestId('feed-greeting');
        this.publicationCards= page.getByTestId('pub-card');
    }

    async expectLoaded() {
        await expect(this.greeting).toBeVisible();
    }

    async expectPublicationsCount(count: number) {
        await expect(this.publicationCards).toHaveCount(count);
    }
}