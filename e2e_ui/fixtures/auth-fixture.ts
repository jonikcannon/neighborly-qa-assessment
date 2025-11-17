import { Page } from '@playwright/test';
import { LogInSignUpPage } from '../pages/login-signup-page';

export async function loginUser(page: Page, email: string, password: string) {
  const loginPage = new LogInSignUpPage(page);
  await loginPage.navigateToHome();
  await loginPage.fillEmail(email);
  await loginPage.fillPassword(password);
  await loginPage.clickSignIn();
  await loginPage.waitForPageLoad();
}

export async function ensureUserExists(page: Page, name: string, email: string, password: string, role: string) {
  const loginPage = new LogInSignUpPage(page);
  await loginPage.navigateToHome();
  
  try {
    await loginPage.fillEmail(email);
    await loginPage.fillPassword(password);
    await loginPage.clickSignIn();
    await loginPage.waitForPageLoad();
  } catch (error) {
    await loginPage.navigateToHome();
    await loginPage.clickSignUpTab();
    await loginPage.fillSignupName(name);
    await loginPage.fillSignupEmail(email);
    await loginPage.fillSignupPassword(password);
    await loginPage.selectRole(role);
    await loginPage.clickCreateAccount();
    await loginPage.waitForPageLoad();
  }
}

export async function logoutUser(page: Page) {
  await page.click('button[aria-haspopup="menu"]');
  await page.click('text=Log Out');
}