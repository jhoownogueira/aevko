import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  outputDir: './test-results',
  fullyParallel: true,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:4200',
    channel: 'chromium',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'pnpm --filter @aevko/docs start --host 127.0.0.1',
    url: 'http://127.0.0.1:4200',
    reuseExistingServer: false,
    timeout: 120_000,
  },
  projects: [
    { name: 'chromium-desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'chromium-mobile', use: { ...devices['Pixel 7'] } },
  ],
});
