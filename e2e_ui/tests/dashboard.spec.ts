import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard-page';
import { config } from '../config/config';
import { loginUser, logoutUser } from '../fixtures/auth-fixture';

test.describe('Dashboard Page - Program Staff', () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await loginUser(page, config.users.staff.email, config.users.staff.password);
    await dashboardPage.navigateToDashboard();
  });

  test.afterEach(async ({ page }) => {
    await logoutUser(page);
  });

  test('should display dashboard title for program staff', async () => {
    await expect(dashboardPage.dashboardTitle).toBeVisible();
    await expect(dashboardPage.dashboardTitle).toHaveText('Dashboard');
  });

  test('should display metric cards for program staff', async () => {
    await expect(dashboardPage.totalApplicationsCard).toBeVisible();
    await expect(dashboardPage.activeProgramsCard).toBeVisible();
    await expect(dashboardPage.totalReviewsCard).toBeVisible();
  });

  test('should display navigation menu for program staff', async () => {
    await expect(dashboardPage.navigationMenu).toBeVisible();
    await expect(dashboardPage.dashboardLink).toBeVisible();
    await expect(dashboardPage.programsLink).toBeVisible();
    await expect(dashboardPage.applicationsLink).toBeVisible();
    await expect(dashboardPage.reviewsLink).toBeVisible();
    await expect(dashboardPage.reportsLink).toBeVisible();
  });

  test('should navigate to programs page for program staff', async () => {
    await dashboardPage.clickPrograms();
    await expect(dashboardPage.page).toHaveURL(/.*programs/);
  });

  test('should display quick actions section for program staff', async () => {
    await expect(dashboardPage.quickActionsSection).toBeVisible();
  });
});

test.describe('Dashboard Page - Applicant', () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await loginUser(page, config.users.applicant.email, config.users.applicant.password);
    await dashboardPage.navigateToDashboard();
  });

  test.afterEach(async ({ page }) => {
    await logoutUser(page);
  });

  test('should display dashboard title for applicant', async () => {
    await expect(dashboardPage.dashboardTitle).toBeVisible();
    await expect(dashboardPage.dashboardTitle).toHaveText('Dashboard');
  });

  test('should display metric cards for applicant', async () => {
    await expect(dashboardPage.totalApplicationsCard).toBeVisible();
    await expect(dashboardPage.inProgressCard).toBeVisible();
    await expect(dashboardPage.underReviewCard).toBeVisible();
    await expect(dashboardPage.awardedCard).toBeVisible();

  });

    test('should NOT display active and total review cards for applicant', async () => {
    await expect(dashboardPage.totalApplicationsCard).toBeVisible({visible:false});
    await expect(dashboardPage.inProgressCard).toBeVisible({visible:false});


  });

  test('should display navigation menu for applicant', async () => {
    await expect(dashboardPage.navigationMenu).toBeVisible();
    await expect(dashboardPage.dashboardLink).toBeVisible();
    await expect(dashboardPage.programsLink).toBeVisible();
    await expect(dashboardPage.applicationsLink).toBeVisible();
    await expect(dashboardPage.reviewsLink).toBeVisible({visible:false});
    await expect(dashboardPage.reportsLink).toBeVisible({visible:false});
  });
});

test.describe('Dashboard Page - Admin', () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await loginUser(page, config.users.admin.email, config.users.admin.password);
    await dashboardPage.navigateToDashboard();
  });

  test.afterEach(async ({ page }) => {
    await logoutUser(page);
  });

  test('should display dashboard title for admin', async () => {
    await expect(dashboardPage.dashboardTitle).toBeVisible();
    await expect(dashboardPage.dashboardTitle).toHaveText('Dashboard');
  });

  test('should display metric cards for admin', async () => {
    await expect(dashboardPage.totalApplicationsCard).toBeVisible();
    await expect(dashboardPage.activeProgramsCard).toBeVisible();
    await expect(dashboardPage.totalReviewsCard).toBeVisible();
  });

  test('should display full navigation menu for admin', async () => {
    await expect(dashboardPage.navigationMenu).toBeVisible();
    await expect(dashboardPage.dashboardLink).toBeVisible();
    await expect(dashboardPage.programsLink).toBeVisible();
    await expect(dashboardPage.applicationsLink).toBeVisible();
    await expect(dashboardPage.reviewsLink).toBeVisible();
    await expect(dashboardPage.reportsLink).toBeVisible();
  });

  test('should navigate to programs page for admin', async () => {
    await dashboardPage.clickPrograms();
    await expect(dashboardPage.page).toHaveURL(/.*programs/);
  });

  test('should display quick actions section for admin', async () => {
    await expect(dashboardPage.quickActionsSection).toBeVisible();
  });
});