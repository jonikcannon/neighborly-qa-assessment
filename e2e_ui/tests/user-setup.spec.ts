import { test, expect } from '@playwright/test';
import { LogInSignUpPage } from '../pages/login-signup-page';
import { config } from '../config/config';

test.describe('User Setup', () => {
  let loginPage: LogInSignUpPage;


  test.beforeEach(async ({ page }) => {
    loginPage = new LogInSignUpPage(page);
    await loginPage.navigateToHome();
  });

  test('should create staff user if not exists', async ({ page }) => {
    await loginPage.clickSignUpTab();
    await loginPage.fillSignupName(`Staff User`);
    await loginPage.fillSignupEmail(config.users.staff.email);
    await loginPage.fillSignupPassword(config.users.staff.password);
    await loginPage.selectRole('Program Staff');
    
    try {
      await loginPage.clickCreateAccount();
      await loginPage.waitForPageLoad();
      
      const currentUrl = page.url();
      expect(currentUrl).not.toContain('/login');
    } catch (error) {
      await loginPage.navigateToHome();
      await loginPage.clickLoginTab();
      await loginPage.fillEmail(config.users.staff.email);
      await loginPage.fillPassword(config.users.staff.password);
      await loginPage.clickSignIn();
      await loginPage.waitForPageLoad();
    }
  });

  test('should create applicant user if not exists', async ({ page }) => {
    await loginPage.clickSignUpTab();
    await loginPage.fillSignupName(`Applicant User`);
    await loginPage.fillSignupEmail(config.users.applicant.email);
    await loginPage.fillSignupPassword(config.users.applicant.password);
    await loginPage.selectRole('Applicant');
    
    try {
      await loginPage.clickCreateAccount();
      await loginPage.waitForPageLoad();
      
      const currentUrl = page.url();
      expect(currentUrl).not.toContain('/login');
    } catch (error) {
      await loginPage.navigateToHome();
      await loginPage.clickLoginTab();
      await loginPage.fillEmail(config.users.applicant.email);
      await loginPage.fillPassword(config.users.applicant.password);
      await loginPage.clickSignIn();
      await loginPage.waitForPageLoad();
    }
  });

  test('should create admin user if not exists', async ({ page }) => {
    await loginPage.clickSignUpTab();
    await loginPage.fillSignupName(`Admin User`);
    await loginPage.fillSignupEmail(config.users.admin.email);
    await loginPage.fillSignupPassword(config.users.admin.password);
    await loginPage.selectRole('System Admin');
    
    try {
      await loginPage.clickCreateAccount();
      await loginPage.waitForPageLoad();
      
      const currentUrl = page.url();
      expect(currentUrl).not.toContain('/login');
    } catch (error) {
      await loginPage.navigateToHome();
      await loginPage.clickLoginTab();
      await loginPage.fillEmail(config.users.admin.email);
      await loginPage.fillPassword(config.users.admin.password);
      await loginPage.clickSignIn();
      await loginPage.waitForPageLoad();
    }
  });
});