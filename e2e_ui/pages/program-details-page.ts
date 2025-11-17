import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';
import { config } from '../config/config';

export class ProgramDetailsPage extends BasePage {
  readonly programTitle: Locator;
  readonly programInformationHeading: Locator;
  readonly categoryText: Locator;
  readonly descriptionHeading: Locator;
  readonly descriptionText: Locator;
  readonly totalBudgetLabel: Locator;
  readonly totalBudgetValue: Locator;
  readonly maxAwardLabel: Locator;
  readonly maxAwardValue: Locator;
  readonly timelineHeading: Locator;
  readonly openDateLabel: Locator;
  readonly openDateValue: Locator;
  readonly closeDateLabel: Locator;
  readonly closeDateValue: Locator;
  readonly createdLabel: Locator;
  readonly createdValue: Locator;
  readonly actionsHeading: Locator;
  readonly editProgramButton: Locator;
  readonly viewApplicationsButton: Locator;
  readonly userMenuButton: Locator;

  constructor(page: Page) {
    super(page);
    this.programTitle = page.locator('h1.text-3xl');
    this.programInformationHeading = page.locator('h3:has-text("Program Information")');
    this.categoryText = page.locator('p.text-muted-foreground').first();
    this.descriptionHeading = page.locator('h3:has-text("Description")');
    this.descriptionText = page.locator('p.mt-1');
    this.totalBudgetLabel = page.locator('p:has-text("Total Budget")');
    this.totalBudgetValue = page.locator('p.text-2xl.font-bold');
    this.maxAwardLabel = page.locator('p:has-text("Max Award Per Application")');
    this.maxAwardValue = page.locator('p.text-xl.font-semibold');
    this.timelineHeading = page.locator('h3:has-text("Timeline")');
    this.openDateLabel = page.locator('p:has-text("Open Date")');
    this.openDateValue = page.locator('p.text-lg').first();
    this.closeDateLabel = page.locator('p:has-text("Close Date")');
    this.closeDateValue = page.locator('p.text-lg').last();
    this.createdLabel = page.locator('p:has-text("Created")');
    this.createdValue = page.locator('p.text-sm').last();
    this.actionsHeading = page.locator('h3:has-text("Actions")');
    this.editProgramButton = page.getByRole('button', { name: 'Edit Program' });
    this.viewApplicationsButton = page.getByRole('button', { name: 'View Applications' });
    this.userMenuButton = page.locator('#radix-\\:r7\\:');
  }

  async navigateToProgramDetails(programId: string) {
    await this.goto(`${config.baseUrl}/programs/${programId}`);
  }

  async clickEditProgram() {
    await this.editProgramButton.click();
  }

  async clickViewApplications() {
    await this.viewApplicationsButton.click();
  }
}