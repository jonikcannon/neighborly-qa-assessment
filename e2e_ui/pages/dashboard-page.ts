import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';
import { config } from '../config/config';

export class DashboardPage extends BasePage {
  readonly dashboardTitle: Locator;
  readonly totalApplicationsCard: Locator;
  readonly activeProgramsCard: Locator;
  readonly totalReviewsCard: Locator;
  readonly quickActionsSection: Locator;
  readonly navigationMenu: Locator;
  readonly dashboardLink: Locator;
  readonly programsLink: Locator;
  readonly applicationsLink: Locator;
  readonly reviewsLink: Locator;
  readonly reportsLink: Locator;
  readonly userMenuButton: Locator;
  readonly closeButton: Locator;
  readonly inProgressCard: Locator;
  readonly underReviewCard: Locator;
  readonly awardedCard: Locator;

  constructor(page: Page) {
    super(page);
    this.dashboardTitle = page.locator('h1:has-text("Dashboard")');
    this.totalApplicationsCard = page.locator('h3:has-text("Total Applications")');
    this.activeProgramsCard = page.locator('h3:has-text("Active Programs")');
    this.totalReviewsCard = page.locator('h3:has-text("Total Reviews")');
    this.inProgressCard = page.locator('h3:has-text("In Progress")');
    this.underReviewCard = page.locator('h3:has-text("Under Review")');
    this.awardedCard = page.locator('h3:has-text("Awarded")');
    this.quickActionsSection = page.locator('h3:has-text("Quick Actions")');
    this.navigationMenu = page.locator('nav');
    this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
    this.programsLink = page.getByRole('link', { name: 'Programs' });
    this.applicationsLink = page.getByRole('link', { name: 'Applications' });
    this.reviewsLink = page.getByRole('link', { name: 'Reviews' });
    this.reportsLink = page.getByRole('link', { name: 'Reports' });
    this.userMenuButton = page.locator('#radix-\\:r3\\:');
    this.closeButton = page.locator('#lovable-badge-close');
  }

  async navigateToDashboard() {
    await this.goto(`${config.baseUrl}/dashboard`);
  }

  async clickPrograms() {
    await this.programsLink.click();
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

  async clickUserMenu() {
    await this.userMenuButton.click();
  }
}