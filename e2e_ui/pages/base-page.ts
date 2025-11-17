import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async click(locator: Locator) {
    await locator.click();
  }

  async fill(locator: Locator, text: string) {
    await locator.fill(text);
  }

  async selectOption(locator: Locator, value: string) {
    await locator.selectOption(value);
  }

  async getText(locator: Locator): Promise<string> {
    return await locator.textContent() || '';
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  async waitForElement(locator: Locator) {
    await locator.waitFor();
  }
}