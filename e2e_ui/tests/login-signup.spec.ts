import { test, expect } from '@playwright/test';
import { LogInSignUpPage } from '../pages/login-signup-page';

test.describe('Login/Sign Up Page', () => {
  let programsPage: LogInSignUpPage;

  test.beforeEach(async ({ page }) => {
    programsPage = new LogInSignUpPage(page);
    await programsPage.navigateToHome();
  });

  test('should display page title', async () => {
    await expect(programsPage.pageTitle).toHaveText('Neighborly Software QA Sandbox');
  });

  test('should switch between login and signup tabs', async () => {
    await programsPage.clickSignUpTab();
    await expect(programsPage.signUpTab).toHaveAttribute('data-state', 'active');
    
    await programsPage.clickLoginTab();
    await expect(programsPage.loginTab).toHaveAttribute('data-state', 'active');
  });

  test('should fill login form', async () => {
    await programsPage.fillEmail('test@example.com');
    await programsPage.fillPassword('password123');
    
    await expect(programsPage.emailInput).toHaveValue('test@example.com');
    await expect(programsPage.passwordInput).toHaveValue('password123');
  });

  test('should have sign in button enabled', async () => {
    await expect(programsPage.signInButton).toBeEnabled();
  });

  test('should close badge when clicked', async () => {
    await programsPage.closeBadge();
    await expect(programsPage.closeButton).not.toBeVisible();
  });
});

test.describe('Login/Sign Up Page - Negative Tests', () => {
  let programsPage: LogInSignUpPage;

  test.beforeEach(async ({ page }) => {
    programsPage = new LogInSignUpPage(page);
    await programsPage.navigateToHome();
  });

  test('should not login with invalid email', async ({ page }) => {
    await programsPage.fillEmail('invalid@test.com');
    await programsPage.fillPassword('password123');
    await programsPage.clickSignIn();
    await programsPage.waitForPageLoad();
    
    const currentUrl = page.url();
    expect(currentUrl).toContain('/');
  });

  test('should not login with invalid password', async ({ page }) => {
    await programsPage.fillEmail('test@example.com');
    await programsPage.fillPassword('wrongpassword');
    await programsPage.clickSignIn();
    await programsPage.waitForPageLoad();
    
    const currentUrl = page.url();
    expect(currentUrl).toContain('/');
  });

  test('should not login with empty email', async () => {
    await programsPage.fillPassword('password123');
    await expect(programsPage.emailInput).toBeEmpty();
  });

  test('should not login with empty password', async () => {
    await programsPage.fillEmail('test@example.com');
    await expect(programsPage.passwordInput).toBeEmpty();
  });
});