import { Page } from '@playwright/test';
import { LogInSignUpPage } from '../pages/login-signup-page';

export class PageManager {
  private page: Page;
  private homePage: LogInSignUpPage;

  constructor(page: Page) {
    this.page = page;
    this.homePage = new LogInSignUpPage(this.page);
  }

  getHomePage(): LogInSignUpPage {
    return this.homePage;
  }
}