# Azure Pipeline Configuration

## Pipeline Stages

The pipeline runs automatically on changes to the `main` branch with the following stages:

### 1. Deploy
- Deploys application to target environment
- Installs Node.js 18.x

### 2. Performance Test (Smoke)
- Runs after deployment
- Executes performance smoke test (10s @ 1 req/sec)
- Validates authentication and endpoint availability
- Uses Artillery Cloud for reporting

### 3. E2E Tests
- Runs after performance smoke test passes
- **API Tests**: Validates REST API endpoints
- **UI Tests**: Validates UI functionality with Playwright
  - Publishes test results and reports
  - Captures screenshots on failure

### 4. Full Load Test
- Runs only if all E2E tests pass
- Executes full performance load test (3 min, ~1500 requests)
- Uses Artillery Cloud for detailed metrics

## Required Variable Group

Create a variable group named `neighborly-test-credentials` in Azure DevOps with:

```
ADMIN_EMAIL=admin@test.com
ADMIN_PASSWORD=<password>
STAFF_EMAIL=staff@test.com
STAFF_PASSWORD=<password>
APPLICANT_EMAIL=applicant@test.com
APPLICANT_PASSWORD=<password>
TEST_USER_EMAIL=<test-user-email>
TEST_USER_PASSWORD=<test-user-password>
BASE_URL=https://neighborly-qa-sandbox-test.lovable.app
SUPABASE_API_KEY=<supabase-key>
ARTILLERY_CLOUD_API_KEY=<artillery-key>
```

## Pipeline Flow

```
main branch push
    ↓
Deploy Application
    ↓
Performance Smoke Test (validates deployment)
    ↓
E2E Tests (API + UI in parallel)
    ↓
Full Load Test (if all tests pass)
```

## Artifacts

- **UI Test Results**: Published as JUnit format
- **Playwright Report**: Published on test failure
- **Artillery Cloud**: Performance metrics available in Artillery dashboard
