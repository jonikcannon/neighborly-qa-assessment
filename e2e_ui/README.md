# E2E UI Tests

Playwright-based end-to-end UI tests for the Neighborly application.

## Setup

```bash
npm install
```

## Run Tests

```bash
# Run all tests
npm run test:ui

# Run in headed mode
npm run test:ui:head

# Run in debug mode
npm run test:ui:debug
```

## Test Coverage

### Authentication & User Management
- **Login/Signup** (`login-signup.spec.ts`)
  - Page display and navigation
  - Tab switching between login/signup
  - Form field validation
  - Negative tests (invalid credentials, empty fields)

- **User Setup** (`user-setup.spec.ts`)
  - Create staff, applicant, and admin users
  - Role-based signup with name field

### Dashboard (`dashboard.spec.ts`)
- **Program Staff**
  - Dashboard title and metric cards (Total Applications, Active Programs, Total Reviews)
  - Navigation menu (Dashboard, Programs, Applications, Reviews, Reports)
  - Quick actions section
  - Navigation to programs page

- **Applicant**
  - Dashboard title and metric cards (Total Applications, In Progress, Under Review, Awarded)
  - Limited navigation menu (no Reviews/Reports)
  - Visibility restrictions

- **Admin**
  - Full dashboard access with all metric cards
  - Complete navigation menu
  - Quick actions section
  - Navigation to programs page

### Programs View (`programs-view.spec.ts`)
- **Program Staff**
  - Programs page title and table display
  - Create program button visibility
  - Search functionality
  - Program details navigation with edit access

- **Applicant**
  - Programs page title and table display
  - No create program button (read-only)
  - Search functionality
  - Program details navigation without edit access

- **Admin**
  - Full programs page access
  - Create program button and navigation
  - Search functionality
  - Program details with edit and view applications buttons

### Program Creation (`program-creation.spec.ts`)
- **Validation Tests (Staff & Admin)**
  - Required field validation (Program Name*, Category*, Total Budget*)
  - Max Award cannot exceed Total Budget
  - Close Date must be after Open Date
  - No negative values for budget/award fields

- **Program Status Tests (Staff & Admin)**
  - Create Draft programs
  - Create Open programs
  - Create Closed programs
  - Create Archived programs

- **End-to-End Flow**
  - Create program → Search → Navigate to details → Validate all fields
  - Verify program appears in programs list
  - Confirm category, budget, and status display correctly

### Program Creation Flow (`program-creation-flow.spec.ts`)
- Complete end-to-end program creation workflow
- User authentication with ensureUserExists fixture
- Program creation and validation

### Accessibility (`accessibility.spec.ts`)
- **ADA Compliance Testing** using axe-core
- **Login Page** - WCAG 2.1 AA compliance
- **Dashboard** - All roles (Staff, Applicant, Admin)
- **Programs Page** - All roles with accessibility validation
- **Create Program Page** - Staff and Admin accessibility checks
- **Automated Scans** - Detects violations in color contrast, ARIA labels, keyboard navigation, screen reader compatibility

## Test Architecture

### Page Object Model
- **base-page.ts** - Common methods (goto, click, fill, waitForElement)
- **login-signup-page.ts** - Login and signup forms
- **dashboard-page.ts** - Dashboard metrics and navigation
- **programs-page-auth.ts** - Programs list with search and create
- **create-program-page.ts** - Program creation form
- **program-details-page.ts** - Program details view

### Fixtures
- **auth-fixture.ts** - loginUser() and ensureUserExists() helpers
- **page-manager.ts** - Centralized page object instantiation

### Configuration
- **config.ts** - Base URL and user credentials (staff, applicant, admin)
- **.env** - Environment variables (BASE_URL, credentials, CI flag)
- **playwright.config.ts** - Screenshot on failure, trace on retry

## Test Users

- **Staff**: staff@test.com / password123
- **Applicant**: applicant@test.com / password123
- **Admin**: admin@test.com / password123

All user names include a random 5-character prefix for tracking (e.g., "abc12 Staff User").

## Key Features

- Role-based testing (Staff, Applicant, Admin)
- Required field validation with asterisk (*) indicators
- Negative value testing
- Date validation (Open/Close dates)
- Budget validation (Max Award ≤ Total Budget)
- Screenshot capture on test failure
- Program details verification after creation
- Search functionality testing
