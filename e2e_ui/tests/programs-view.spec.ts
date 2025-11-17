import { test, expect } from '@playwright/test';
import { ProgramsPageAuth } from '../pages/programs-page-auth';
import { ProgramDetailsPage } from '../pages/program-details-page';
import { config } from '../config/config';
import { loginUser, logoutUser } from '../fixtures/auth-fixture';

test.describe('Programs Page - Program Staff', () => {
  let programsPage: ProgramsPageAuth;

  test.beforeEach(async ({ page }) => {
    programsPage = new ProgramsPageAuth(page);
    await loginUser(page, config.users.staff.email, config.users.staff.password);
    await programsPage.navigateToPrograms();
  });

  test.afterEach(async ({ page }) => {
    await logoutUser(page);
  });

  test('should display programs page title for staff', async () => {
    await expect(programsPage.programsTitle).toBeVisible();
    await expect(programsPage.programsTitle).toHaveText('Programs');
  });

  test('should display create program button for staff', async () => {
    await expect(programsPage.createProgramButton).toBeVisible();
  });

  test('should display programs table for staff', async () => {
    await expect(programsPage.programsTable).toBeVisible();
    await expect(programsPage.tableHeaders).toHaveCount(6);
  });

  test('should display search input for staff', async () => {
    await expect(programsPage.searchInput).toBeVisible();
  });

  test('should open and view program details for staff', async ({ page }) => {
    const programDetailsPage = new ProgramDetailsPage(page);
    await programsPage.clickProgramRow(1);
    await expect(programDetailsPage.programTitle).toBeVisible();
    await expect(programDetailsPage.programInformationHeading).toBeVisible();
    await expect(programDetailsPage.editProgramButton).toBeVisible();
  });
});
test.describe('Programs Page - Admin', () => {
  let programsPage: ProgramsPageAuth;

  test.beforeEach(async ({ page }) => {
    programsPage = new ProgramsPageAuth(page);
    await loginUser(page, config.users.admin.email, config.users.admin.password);
    await programsPage.waitForPageLoad();
    await programsPage.navigateToPrograms();
  });

  test.afterEach(async ({ page }) => {
    await logoutUser(page);
  });

  test('should display programs page title for admin', async () => {
    await expect(programsPage.programsTitle).toBeVisible();
    await expect(programsPage.programsTitle).toHaveText('Programs');
  });

  test('should display create program button for admin', async () => {
    await expect(programsPage.createProgramButton).toBeVisible();
  });

  test('should display programs table for admin', async () => {
    await expect(programsPage.programsTable).toBeVisible();
    await expect(programsPage.tableHeaders).toHaveCount(6);
  });

  test('should display search input for admin', async () => {
    await expect(programsPage.searchInput).toBeVisible();
  });

  test('should navigate to create program page for admin', async ({ page }) => {
    await programsPage.clickCreateProgram();
    await expect(page).toHaveURL(/.*programs\/create/);
  });

  test('should open and view program details for admin', async ({ page }) => {
    const programDetailsPage = new ProgramDetailsPage(page);
    await programsPage.clickProgramRow(1);
    await expect(programDetailsPage.programTitle).toBeVisible();
    await expect(programDetailsPage.programInformationHeading).toBeVisible();
    await expect(programDetailsPage.editProgramButton).toBeVisible();
    await expect(programDetailsPage.viewApplicationsButton).toBeVisible();
  });
});
test.describe('Programs Page - Applicant', () => {
  let programsPage: ProgramsPageAuth;

  test.beforeEach(async ({ page }) => {
    programsPage = new ProgramsPageAuth(page);
    await loginUser(page, config.users.applicant.email, config.users.applicant.password);
    await programsPage.navigateToPrograms();
  });

  test.afterEach(async ({ page }) => {
    await logoutUser(page);
  });

  test('should display programs page title for applicant', async () => {
    await expect(programsPage.programsTitle).toBeVisible();
    await expect(programsPage.programsTitle).toHaveText('Programs');
  });

  test('should not display create program button for applicant', async () => {
    await expect(programsPage.createProgramButton).not.toBeVisible();
  });

  test('should display programs table for applicant', async () => {
    await expect(programsPage.programsTable).toBeVisible();
  });

  test('should display search input for applicant', async () => {
    await expect(programsPage.searchInput).toBeVisible();
  });

  test('should open and view program details for applicant', async ({ page }) => {
    const programDetailsPage = new ProgramDetailsPage(page);
    await programsPage.clickProgramRow(1);
    await expect(programDetailsPage.programTitle).toBeVisible();
    await expect(programDetailsPage.programInformationHeading).toBeVisible();
    await expect(programDetailsPage.editProgramButton).not.toBeVisible();
  });
});

