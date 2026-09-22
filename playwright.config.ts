import { defineConfig } from '@playwright/test';
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
    {
      name: 'api',
      testMatch: /.*\.api\.spec\.ts/,
    },
    {
      name: 'e2e',
      testMatch: /.*\.e2e\.spec\.ts/,
    },
    bddProject,
  ],
  webServer: {
    command: 'node app/server.js',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
  },
});