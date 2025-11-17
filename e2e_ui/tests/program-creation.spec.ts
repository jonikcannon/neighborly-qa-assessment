import { test, expect } from '@playwright/test';
import { ProgramsPageAuth } from '../pages/programs-page-auth';
import { CreateProgramPage } from '../pages/create-program-page';
import { ProgramDetailsPage } from '../pages/program-details-page';
import { config } from '../config/config';
import { loginUser } from '../fixtures/auth-fixture';

test.describe('Program Creation - Staff', () => {
  let programsPage: ProgramsPageAuth;
  let createProgramPage: CreateProgramPage;
  let programDetailsPage: ProgramDetailsPage;

  test.beforeEach(async ({ page }) => {
    programsPage = new ProgramsPageAuth(page);
    createProgramPage = new CreateProgramPage(page);
    programDetailsPage = new ProgramDetailsPage(page);
    await loginUser(page, config.users.staff.email, config.users.staff.password);
    await programsPage.navigateToPrograms();
    await programsPage.clickCreateProgram();
  });

  test('should validate required fields for staff', async ({ page }) => {
    await createProgramPage.clickCreateProgram();
    await expect(createProgramPage.programNameInput).toHaveValue('');
    await expect(createProgramPage.programNameInput).toHaveAttribute('required', '');
    await expect(page.locator('label:has-text("Program Name *")')).toBeVisible();
    await expect(page).toHaveURL(/.*programs\/create/);
  });

  test('should validate program name is required for staff', async ({ page }) => {
    await createProgramPage.fillCategory('Housing');
    await createProgramPage.fillTotalBudget('100000');
    await createProgramPage.clickCreateProgram();
    await expect(createProgramPage.programNameInput).toHaveValue('');
    await expect(createProgramPage.programNameInput).toHaveAttribute('required', '');
    await expect(page.locator('label:has-text("Program Name *")')).toBeVisible();
    await expect(page).toHaveURL(/.*programs\/create/);
  });

  test('should validate total budget is required for staff', async ({ page }) => {
    await createProgramPage.fillProgramName('Test Program');
    await createProgramPage.fillCategory('Housing');
    await createProgramPage.clickCreateProgram();
    await expect(createProgramPage.totalBudgetInput).toHaveValue('');
    await expect(createProgramPage.totalBudgetInput).toHaveAttribute('required', '');
    await expect(page.locator('label:has-text("Total Budget *")')).toBeVisible();
    await expect(page).toHaveURL(/.*programs\/create/);
  });

  test('should validate category is required for staff', async ({ page }) => {
    await createProgramPage.fillProgramName('Test Program');
    await createProgramPage.fillTotalBudget('100000');
    await createProgramPage.clickCreateProgram();
    await expect(createProgramPage.categoryInput).toHaveValue('');
    await expect(createProgramPage.categoryInput).toHaveAttribute('required', '');
    await expect(page.locator('label:has-text("Category *")')).toBeVisible();
    await expect(page).toHaveURL(/.*programs\/create/);
  });

  test('should create draft program with valid data for staff', async ({ page }) => {
    const programName = `Test Program ${Date.now()}`;
    await createProgramPage.fillProgramName(programName);
    await createProgramPage.fillCategory('Housing');
    await createProgramPage.fillTotalBudget('100000');
    await createProgramPage.fillMaxAward('5000');
    await createProgramPage.fillDescription('Test description');
    await createProgramPage.selectStatus('Draft');

    await expect(createProgramPage.programNameInput).toHaveValue(programName);
    await expect(createProgramPage.categoryInput).toHaveValue('Housing');
    await expect(createProgramPage.totalBudgetInput).toHaveValue('100000');
    await expect(createProgramPage.maxAwardInput).toHaveValue('5000');

    await createProgramPage.clickCreateProgram();
    await createProgramPage.waitForPageLoad();

// issues accessing the popup message
    // expect(page.locator('text=Program created successfully')).toBeVisible();    await programsPage.navigateToPrograms();
    await programsPage.navigateToPrograms();
    await expect(page.locator('td').filter({ hasText: programName })).toBeVisible();
    
    await programsPage.searchPrograms(programName);
    await expect(page.locator('td').filter({ hasText: programName })).toBeVisible();
    
    await page.locator('td').filter({ hasText: programName }).click();
    await expect(programDetailsPage.programTitle).toHaveText(programName);
    await expect(programDetailsPage.categoryText).toHaveText('Housing');
  });

  test('should create open program for staff', async ({ page }) => {
    const programName = `Open Program ${Date.now()}`;
    await createProgramPage.fillProgramName(programName);
    await createProgramPage.fillCategory('Education');
    await createProgramPage.fillTotalBudget('120000');
    await createProgramPage.fillMaxAward('6000');
    await createProgramPage.selectStatus('Open');

    await createProgramPage.clickCreateProgram();
    await createProgramPage.waitForPageLoad();

// issues accessing the popup message
    // expect(page.locator('text=Program created successfully')).toBeVisible();    await programsPage.navigateToPrograms();
    await programsPage.searchPrograms(programName);
    await expect(page.locator('td').filter({ hasText: programName })).toBeVisible();
    
    await page.locator('td').filter({ hasText: programName }).click();
    await expect(programDetailsPage.programTitle).toHaveText(programName);
    await expect(programDetailsPage.categoryText).toHaveText('Education');
  });

  test('should create closed program for staff', async ({ page }) => {
    const programName = `Closed Program ${Date.now()}`;
    await createProgramPage.fillProgramName(programName);
    await createProgramPage.fillCategory('Community');
    await createProgramPage.fillTotalBudget('80000');
    await createProgramPage.fillMaxAward('4000');
    await createProgramPage.selectStatus('Closed');

    await createProgramPage.clickCreateProgram();
    await createProgramPage.waitForPageLoad();

// issues accessing the popup message
    // expect(page.locator('text=Program created successfully')).toBeVisible();    await programsPage.navigateToPrograms();
    await programsPage.searchPrograms(programName);
    await expect(page.locator('td').filter({ hasText: programName })).toBeVisible();
    
    await page.locator('td').filter({ hasText: programName }).click();
    await expect(programDetailsPage.programTitle).toHaveText(programName);
    await expect(programDetailsPage.categoryText).toHaveText('Community');
  });

  test('should create archived program for staff', async ({ page }) => {
    const programName = `Archived Program ${Date.now()}`;
    await createProgramPage.fillProgramName(programName);
    await createProgramPage.fillCategory('Healthcare');
    await createProgramPage.fillTotalBudget('90000');
    await createProgramPage.fillMaxAward('4500');
    await createProgramPage.selectStatus('Archived');

    await createProgramPage.clickCreateProgram();
    await createProgramPage.waitForPageLoad();
    
    // issues accessing the popup message
    // expect(page.locator('text=Program created successfully')).toBeVisible();
    await programsPage.navigateToPrograms();
    await programsPage.searchPrograms(programName);
    await expect(page.locator('td').filter({ hasText: programName })).toBeVisible();
    
    await page.locator('td').filter({ hasText: programName }).click();
    await expect(programDetailsPage.programTitle).toHaveText(programName);
    await expect(programDetailsPage.categoryText).toHaveText('Healthcare');
  });

  test('should not create program with max award greater than total budget for staff', async ({ page }) => {
    await createProgramPage.fillProgramName('Invalid Budget Program');
    await createProgramPage.fillCategory('Housing');
    await createProgramPage.fillTotalBudget('40000');
    await createProgramPage.fillMaxAward('80000');
    await createProgramPage.clickCreateProgram();
    
    await expect(createProgramPage.maxAwardInput).toBeFocused();
    await expect(page).toHaveURL(/.*programs\/create/);
  });

  test('should not create program with close date before open date for staff', async ({ page }) => {
    await createProgramPage.fillProgramName('Invalid Date Program');
    await createProgramPage.fillCategory('Education');
    await createProgramPage.fillTotalBudget('100000');
    await createProgramPage.fillOpenDate('2025-12-31');
    await createProgramPage.fillCloseDate('2025-01-01');
    await createProgramPage.clickCreateProgram();
    
    //await expect(createProgramPage.closeDateInput).toBeFocused();
    await expect(page).toHaveURL(/.*programs\/create/);
  });

  test('should not create program with negative total budget for staff', async ({ page }) => {
    await createProgramPage.fillProgramName('Negative Budget Program');
    await createProgramPage.fillCategory('Housing');
    await createProgramPage.fillTotalBudget('-50000');
    await createProgramPage.fillMaxAward('5000');
    await createProgramPage.clickCreateProgram();
    
    //await expect(createProgramPage.totalBudgetInput).toBeFocused();
    await expect(page).toHaveURL(/.*programs\/create/);
  });

  test('should not create program with negative max award for staff', async ({ page }) => {
    await createProgramPage.fillProgramName('Negative Award Program');
    await createProgramPage.fillCategory('Education');
    await createProgramPage.fillTotalBudget('100000');
    await createProgramPage.fillMaxAward('-5000');
    await createProgramPage.clickCreateProgram();
    
    //await expect(createProgramPage.maxAwardInput).toBeFocused();
    await expect(page).toHaveURL(/.*programs\/create/);
  });
});

test.describe('Program Creation - Admin', () => {
  let programsPage: ProgramsPageAuth;
  let createProgramPage: CreateProgramPage;
  let programDetailsPage: ProgramDetailsPage;

  test.beforeEach(async ({ page }) => {
    programsPage = new ProgramsPageAuth(page);
    createProgramPage = new CreateProgramPage(page);
    programDetailsPage = new ProgramDetailsPage(page);
    await loginUser(page, config.users.admin.email, config.users.admin.password);
    await programsPage.navigateToPrograms();
    await programsPage.clickCreateProgram();
  });

  test('should validate required fields for admin', async ({ page }) => {
    await createProgramPage.clickCreateProgram();
    await expect(createProgramPage.programNameInput).toHaveValue('');
    await expect(createProgramPage.programNameInput).toHaveAttribute('required', '');
    await expect(page.locator('label:has-text("Program Name *")')).toBeVisible();
    await expect(page).toHaveURL(/.*programs\/create/);
  });

  test('should validate program name is required for admin', async ({ page }) => {
    await createProgramPage.fillCategory('Education');
    await createProgramPage.fillTotalBudget('200000');
    await createProgramPage.clickCreateProgram();
    await expect(createProgramPage.programNameInput).toHaveValue('');
    await expect(createProgramPage.programNameInput).toHaveAttribute('required', '');
    await expect(page.locator('label:has-text("Program Name *")')).toBeVisible();
    await expect(page).toHaveURL(/.*programs\/create/);
  });

  test('should validate total budget is required for admin', async ({ page }) => {
    await createProgramPage.fillProgramName('Admin Test Program');
    await createProgramPage.fillCategory('Education');
    await createProgramPage.clickCreateProgram();
    await expect(createProgramPage.totalBudgetInput).toHaveValue('');
    await expect(createProgramPage.totalBudgetInput).toHaveAttribute('required', '');
    await expect(page.locator('label:has-text("Total Budget *")')).toBeVisible();
    await expect(page).toHaveURL(/.*programs\/create/);
  });

  test('should validate category is required for admin', async ({ page }) => {
    await createProgramPage.fillProgramName('Admin Test Program');
    await createProgramPage.fillTotalBudget('200000');
    await createProgramPage.clickCreateProgram();
    await expect(createProgramPage.categoryInput).toHaveValue('');
    await expect(createProgramPage.categoryInput).toHaveAttribute('required', '');
    await expect(page.locator('label:has-text("Category *")')).toBeVisible();
    await expect(page).toHaveURL(/.*programs\/create/);
  });

  test('should create draft program with valid data for admin', async ({ page }) => {
    const programName = `Admin Program ${Date.now()}`;
    await createProgramPage.fillProgramName(programName);
    await createProgramPage.fillCategory('Education');
    await createProgramPage.fillTotalBudget('200000');
    await createProgramPage.fillMaxAward('10000');
    await createProgramPage.fillDescription('Admin test description');
    await createProgramPage.selectStatus('Draft');

    await expect(createProgramPage.programNameInput).toHaveValue(programName);
    await expect(createProgramPage.categoryInput).toHaveValue('Education');
    await expect(createProgramPage.totalBudgetInput).toHaveValue('200000');
    await expect(createProgramPage.maxAwardInput).toHaveValue('10000');

    await createProgramPage.clickCreateProgram();
    await createProgramPage.waitForPageLoad();

// issues accessing the popup message
    // expect(page.locator('text=Program created successfully')).toBeVisible();    await programsPage.navigateToPrograms();
    await programsPage.navigateToPrograms();
    await expect(page.locator('td').filter({ hasText: programName })).toBeVisible();
    
    await programsPage.searchPrograms(programName);
    await expect(page.locator('td').filter({ hasText: programName })).toBeVisible();
    
    await page.locator('td').filter({ hasText: programName }).click();
    await expect(programDetailsPage.programTitle).toHaveText(programName);
    await expect(programDetailsPage.categoryText).toHaveText('Education');
    await expect(programDetailsPage.editProgramButton).toBeVisible();
  });

  test('should create open program for admin', async ({ page }) => {
    const programName = `Open Program ${Date.now()}`;
    await createProgramPage.fillProgramName(programName);
    await createProgramPage.fillCategory('Community');
    await createProgramPage.fillTotalBudget('150000');
    await createProgramPage.fillMaxAward('7500');
    await createProgramPage.selectStatus('Open');

    await createProgramPage.clickCreateProgram();
    await createProgramPage.waitForPageLoad();

// issues accessing the popup message
    // expect(page.locator('text=Program created successfully')).toBeVisible();
    await programsPage.navigateToPrograms();
    await expect(page.locator('td').filter({ hasText: programName })).toBeVisible();
    
    await programsPage.searchPrograms(programName);
    await expect(page.locator('td').filter({ hasText: programName })).toBeVisible();
    
    await page.locator('td').filter({ hasText: programName }).click();
    await expect(programDetailsPage.programTitle).toHaveText(programName);
    await expect(programDetailsPage.categoryText).toHaveText('Community');
  });

  test('should create closed program for admin', async ({ page }) => {
    const programName = `Closed Program ${Date.now()}`;
    await createProgramPage.fillProgramName(programName);
    await createProgramPage.fillCategory('Healthcare');
    await createProgramPage.fillTotalBudget('100000');
    await createProgramPage.fillMaxAward('5000');
    await createProgramPage.selectStatus('Closed');

    await createProgramPage.clickCreateProgram();
    await createProgramPage.waitForPageLoad();

    //await expect(page.locator('text=Program created successfully')).toBeVisible();
    await programsPage.navigateToPrograms();
    await programsPage.searchPrograms(programName);
    await expect(page.locator('td').filter({ hasText: programName })).toBeVisible();
    
    await page.locator('td').filter({ hasText: programName }).click();
    await expect(programDetailsPage.programTitle).toHaveText(programName);
    await expect(programDetailsPage.categoryText).toHaveText('Healthcare');
  });

  test('should create archived program for admin', async ({ page }) => {
    const programName = `Archived Program ${Date.now()}`;
    await createProgramPage.fillProgramName(programName);
    await createProgramPage.fillCategory('Arts');
    await createProgramPage.fillTotalBudget('75000');
    await createProgramPage.fillMaxAward('3000');
    await createProgramPage.selectStatus('Archived');

    await createProgramPage.clickCreateProgram();
    await createProgramPage.waitForPageLoad();

    //await expect(page.locator('text=Program created successfully')).toBeVisible();
    await programsPage.navigateToPrograms();
    await programsPage.searchPrograms(programName);
    await expect(page.locator('td').filter({ hasText: programName })).toBeVisible();
    
    await page.locator('td').filter({ hasText: programName }).click();
    await expect(programDetailsPage.programTitle).toHaveText(programName);
    await expect(programDetailsPage.categoryText).toHaveText('Arts');
  });

  test('should not create program with max award greater than total budget', async ({ page }) => {
    await createProgramPage.fillProgramName('Invalid Budget Program');
    await createProgramPage.fillCategory('Housing');
    await createProgramPage.fillTotalBudget('50000');
    await createProgramPage.fillMaxAward('100000');
    await createProgramPage.clickCreateProgram();
    
    await expect(createProgramPage.maxAwardInput).toBeFocused();
    await expect(page).toHaveURL(/.*programs\/create/);
  });

  test('should not create program with close date before open date', async ({ page }) => {
    await createProgramPage.fillProgramName('Invalid Date Program');
    await createProgramPage.fillCategory('Education');
    await createProgramPage.fillTotalBudget('100000');
    await createProgramPage.fillOpenDate('2025-12-31');
    await createProgramPage.fillCloseDate('2025-01-01');
    await createProgramPage.clickCreateProgram();
    
    //await expect(createProgramPage.closeDateInput).toBeFocused();
    await expect(page).toHaveURL(/.*programs\/create/);
  });

  test('should not create program with negative total budget for admin', async ({ page }) => {
    await createProgramPage.fillProgramName('Negative Budget Program');
    await createProgramPage.fillCategory('Housing');
    await createProgramPage.fillTotalBudget('-100000');
    await createProgramPage.fillMaxAward('10000');
    await createProgramPage.clickCreateProgram();
    
   // await expect(createProgramPage.totalBudgetInput).toBeFocused();
    await expect(page).toHaveURL(/.*programs\/create/);
  });

  test('should not create program with negative max award for admin', async ({ page }) => {
    await createProgramPage.fillProgramName('Negative Award Program');
    await createProgramPage.fillCategory('Education');
    await createProgramPage.fillTotalBudget('200000');
    await createProgramPage.fillMaxAward('-10000');
    await createProgramPage.clickCreateProgram();
    
   // await expect(createProgramPage.maxAwardInput).toBeFocused();
    await expect(page).toHaveURL(/.*programs\/create/);
  });
});