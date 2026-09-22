import {defineConfig } from '@playwright/test';
import { defineBddProject } from 'playwright-bdd';

const bddProject = defineBddProject({
    name: 'bdd',
    features: 'features/**/*.feature',
    steps: 'features/steps/**/*.ts',
});

export default defineConfig({
    use: {
        baseURL: 'http://localhost:3000',
    },
    projects: [
        bddProject,
    ],
});