import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';
import { config } from '../config/config';

export class ProgramsPageAuth extends BasePage {
  readonly programsTitle: Locator;
  readonly allProgramsHeading: Locator;
  readonly createProgramButton: Locator;
  readonly searchInput: Locator;
  readonly programsTable: Locator;
  readonly tableHeaders: Locator;
  readonly tableRows: Locator;
  readonly userMenuButton: Locator;
  readonly navigationMenu: Locator;
  readonly dashboardLink: Locator;
  readonly programsLink: Locator;
  readonly applicationsLink: Locator;
  readonly reviewsLink: Locator;
  readonly reportsLink: Locator;

  constructor(page: Page) {
    super(page);
    this.programsTitle = page.locator('h1:has-text("Programs")');
    this.allProgramsHeading = page.locator('h3:has-text("All Programs")');
    this.createProgramButton = page.getByRole('button', { name: 'Create Program' });
    this.searchInput = page.locator('input[class*="max-w-sm"]');
    this.programsTable = page.locator('table[class*="w-full"]');
    this.tableHeaders = page.locator('th');
    this.tableRows = page.locator('tr');
    this.userMenuButton = page.locator('#radix-\\:r5\\:');
    this.navigationMenu = page.locator('nav');
    this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
    this.programsLink = page.getByRole('link', { name: 'Programs' });
    this.applicationsLink = page.getByRole('link', { name: 'Applications' });
    this.reviewsLink = page.getByRole('link', { name: 'Reviews' });
    this.reportsLink = page.getByRole('link', { name: 'Reports' });
  }

  async navigateToPrograms() {
    await this.goto(`${config.baseUrl}/programs`);
  }

  async clickCreateProgram() {
    await this.createProgramButton.click();
  }

  async searchPrograms(searchTerm: string) {
    await this.searchInput.fill(searchTerm);
  }

  async clickProgramRow(index: number) {
    await this.tableRows.nth(index).click();
  }

  async clickDashboard() {
    await this.dashboardLink.click();
  }

  async clickApplications() {
    await this.applicationsLink.click();
  }

  async clickReviews() {
    await this.reviewsLink.click();
  }

  async clickReports() {
    await this.reportsLink.click();
  }
}