import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';
import { config } from '../config/config';

export class CreateProgramPage extends BasePage {
  readonly createProgramTitle: Locator;
  readonly programDetailsHeading: Locator;
  readonly programNameInput: Locator;
  readonly categoryInput: Locator;
  readonly totalBudgetInput: Locator;
  readonly maxAwardInput: Locator;
  readonly openDateInput: Locator;
  readonly closeDateInput: Locator;
  readonly statusSelect: Locator;
  readonly descriptionTextarea: Locator;
  readonly createProgramButton: Locator;
  readonly cancelButton: Locator;
  readonly userMenuButton: Locator;
  readonly navigationMenu: Locator;
  readonly dashboardLink: Locator;
  readonly programsLink: Locator;

  constructor(page: Page) {
    super(page);
    this.createProgramTitle = page.locator('h1:has-text("Create Program")');
    this.programDetailsHeading = page.locator('h3:has-text("Program Details")');
    this.programNameInput = page.locator('#name');
    this.categoryInput = page.locator('#category');
    this.totalBudgetInput = page.locator('#total_budget');
    this.maxAwardInput = page.locator('#max_award_per_app');
    this.openDateInput = page.locator('#open_date');
    this.closeDateInput = page.locator('#close_date');
    this.statusSelect = page.locator('select');
    this.descriptionTextarea = page.locator('#description');
    this.createProgramButton = page.getByRole('button', { name: 'Create Program' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.userMenuButton = page.locator('#radix-\\:r7\\:');
    this.navigationMenu = page.locator('nav');
    this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
    this.programsLink = page.getByRole('link', { name: 'Programs' });
  }

  async navigateToCreateProgram() {
    await this.goto(`${config.baseUrl}/programs/create`);
  }

  async fillProgramName(name: string) {
    await this.programNameInput.fill(name);
  }

  async fillCategory(category: string) {
    await this.categoryInput.fill(category);
  }

  async fillTotalBudget(budget: string) {
    await this.totalBudgetInput.fill(budget);
  }

  async fillMaxAward(award: string) {
    await this.maxAwardInput.fill(award);
  }

  async fillOpenDate(date: string) {
    await this.openDateInput.fill(date);
  }

  async fillCloseDate(date: string) {
    await this.closeDateInput.fill(date);
  }

  async selectStatus(status: string) {
    await this.statusSelect.selectOption(status);
  }

  async fillDescription(description: string) {
    await this.descriptionTextarea.fill(description);
  }

  async clickCreateProgram() {
    await this.createProgramButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }

  async clickPrograms() {
    await this.programsLink.click();
  }
}