# Neighborly QA Assessment

Comprehensive test suite for the Neighborly application including UI automation, API testing, and performance validation.

## Test Folders Overview

### 📱 E2E UI Tests (`e2e_ui/`)
Playwright-based end-to-end UI tests covering authentication, dashboard functionality, program management, and accessibility compliance.

**Key Features:**
- Role-based testing (Staff, Applicant, Admin)
- Page Object Model architecture
- Accessibility testing with axe-core
- Screenshot capture on failures

**Run Commands:**
```bash
# Run all UI tests
npm run test:ui

# Run in headed mode (visible browser)
npm run test:ui:head

# Run in debug mode
npm run test:ui:debug
```

*See [e2e_ui/README.md](e2e_ui/README.md) for detailed test coverage and architecture.*

### 🔌 E2E API Tests (`e2e_api/`)
Playwright-based API tests validating REST endpoints and backend functionality.

**Key Features:**
- API endpoint validation
- Authentication testing
- Data integrity checks

**Run Commands:**
```bash
# Run API tests
npm run test:api
```

### ⚡ Performance Tests (`performance/`)
Artillery-based performance testing for load validation and capacity planning.

**Test Types:**
- **Smoke Test**: 10s @ 1 req/sec (~10 requests)
- **Load Test**: 3 minutes @ 5-10 req/sec (~1500 requests)

**Run Commands:**
```bash
cd performance

# Quick smoke test
npm run test:smoke

# Full load test
npm test

# With Artillery Cloud reporting
npm run test:cloud
```

*See [performance/README.md](performance/README.md) for detailed performance metrics and analysis.*

### ☁️ Azure Pipeline (`.azure/`)
CI/CD pipeline configuration for automated testing in Azure DevOps.

**Pipeline Stages:**
1. Deploy → Performance Smoke Test → E2E Tests → Full Load Test

*See [.azure/README.md](.azure/README.md) for pipeline configuration and variable setup.*

### 🔄 GitHub Workflow (`.github/workflows/`)
GitHub Actions workflow for automated testing on push and pull requests.

**Triggers:**
- Push to `main` or `master` branch
- Pull requests to `main` or `master` branch

**Workflow Steps:**
1. Install Node.js LTS and dependencies
2. Install Playwright browsers
3. Run all tests (`npm run test:all`)
4. Upload test reports as artifacts

**Artifacts:**
- Playwright test reports (retained for 30 days)
- Screenshots and traces on test failures

## Quick Start

### Install Dependencies
```bash
# Root level (installs for UI and API tests)
npm install

# Performance tests
cd performance && npm install
```

### Run All Tests
```bash
# Run both UI and API tests
npm run test:all

# Individual test suites
npm run test:ui    # UI tests only
npm run test:api   # API tests only
```

### Environment Setup
Each test folder contains environment configuration:
- `e2e_ui/.env` - UI test credentials and base URL
- `performance/.env` - Performance test credentials and Artillery Cloud key

## Test Architecture

- **UI Tests**: Page Object Model with fixtures for authentication
- **API Tests**: Direct REST API validation with helper utilities
- **Performance**: Artillery scenarios with Supabase authentication
- **CI/CD**: Azure Pipeline with parallel test execution

## Key Test Users

- **Staff**: staff@test.com
- **Applicant**: applicant@test.com  
- **Admin**: admin@test.com

*All passwords and sensitive data are stored in environment files.*