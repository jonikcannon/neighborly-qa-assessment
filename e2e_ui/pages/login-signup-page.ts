import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';
import { config } from '../config/config';

export class LogInSignUpPage extends BasePage {
  readonly pageTitle: Locator;
  readonly loginTab: Locator;
  readonly signUpTab: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly closeButton: Locator;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupPasswordInput: Locator;
  readonly roleSelect: Locator;
  readonly createAccountButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('h3.font-semibold');
    this.loginTab = page.locator('#radix-\\:r0\\:-trigger-login');
    this.signUpTab = page.locator('#radix-\\:r0\\:-trigger-signup');
    this.emailInput = page.locator('#login-email');
    this.passwordInput = page.locator('#login-password');
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
    this.closeButton = page.locator('#lovable-badge-close');
    this.signupNameInput = page.locator('#signup-name');
    this.signupEmailInput = page.locator('#signup-email');
    this.signupPasswordInput = page.locator('#signup-password');
    this.roleSelect = page.locator('select');
    this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
  }

  async navigateToHome() {
    await this.goto(config.baseUrl);
  }

  async clickLoginTab() {
    await this.loginTab.click();
  }

  async clickSignUpTab() {
    await this.signUpTab.click();
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickSignIn() {
    await this.signInButton.click();
  }

  async fillSignupName(name: string) {
    await this.signupNameInput.fill(name);
  }

  async fillSignupEmail(email: string) {
    await this.signupEmailInput.fill(email);
  }

  async fillSignupPassword(password: string) {
    await this.signupPasswordInput.fill(password);
  }

  async selectRole(role: string) {
    await this.roleSelect.selectOption(role);
  }

  async clickCreateAccount() {
    await this.createAccountButton.click();
  }

  async closeBadge() {
    await this.closeButton.click();
  }
}