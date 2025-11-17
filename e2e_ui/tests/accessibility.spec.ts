import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { config } from '../config/config';
import { loginUser } from '../fixtures/auth-fixture';

test.describe.skip('Accessibility Tests', () => {
  test('login page should not have accessibility violations', async ({ page }, testInfo) => {
    await page.goto(config.baseUrl);
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    await testInfo.attach('accessibility-scan-results', {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: 'application/json',
    });
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('dashboard page should not have accessibility violations - staff', async ({ page }, testInfo) => {
    await loginUser(page, config.users.staff.email, config.users.staff.password);
    await page.goto(`${config.baseUrl}/dashboard`);
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    await testInfo.attach('accessibility-scan-results', {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: 'application/json',
    });
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('dashboard page should not have accessibility violations - applicant', async ({ page }, testInfo) => {
    await loginUser(page, config.users.applicant.email, config.users.applicant.password);
    await page.goto(`${config.baseUrl}/dashboard`);
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    await testInfo.attach('accessibility-scan-results', {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: 'application/json',
    });
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('dashboard page should not have accessibility violations - admin', async ({ page }, testInfo) => {
    await loginUser(page, config.users.admin.email, config.users.admin.password);
    await page.goto(`${config.baseUrl}/dashboard`);
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    await testInfo.attach('accessibility-scan-results', {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: 'application/json',
    });
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('programs page should not have accessibility violations - staff', async ({ page }, testInfo) => {
    await loginUser(page, config.users.staff.email, config.users.staff.password);
    await page.goto(`${config.baseUrl}/programs`);
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    await testInfo.attach('accessibility-scan-results', {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: 'application/json',
    });
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('programs page should not have accessibility violations - applicant', async ({ page }, testInfo) => {
    await loginUser(page, config.users.applicant.email, config.users.applicant.password);
    await page.goto(`${config.baseUrl}/programs`);
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    await testInfo.attach('accessibility-scan-results', {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: 'application/json',
    });
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('programs page should not have accessibility violations - admin', async ({ page }, testInfo) => {
    await loginUser(page, config.users.admin.email, config.users.admin.password);
    await page.goto(`${config.baseUrl}/programs`);
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    await testInfo.attach('accessibility-scan-results', {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: 'application/json',
    });
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('create program page should not have accessibility violations - staff', async ({ page }, testInfo) => {
    await loginUser(page, config.users.staff.email, config.users.staff.password);
    await page.goto(`${config.baseUrl}/programs/create`);
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    await testInfo.attach('accessibility-scan-results', {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: 'application/json',
    });
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('create program page should not have accessibility violations - admin', async ({ page }, testInfo) => {
    await loginUser(page, config.users.admin.email, config.users.admin.password);
    await page.goto(`${config.baseUrl}/programs/create`);
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    await testInfo.attach('accessibility-scan-results', {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: 'application/json',
    });
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
