# Performance Tests

Artillery-based performance tests for the Neighborly API using Supabase backend.

## Setup

```bash
npm install
```

## Run Tests

```bash
# Run smoke test (10s @ 1 req/sec)
npm run test:smoke

# Run smoke test with Artillery Cloud recording
npm run test:smoke:cloud

# Run full load test (3 minutes)
npm test

# Run full load test with Artillery Cloud recording
npm run test:cloud

# Run with HTML report
npm run test:report
```

## Test Coverage

### Smoke Test (`programs-smoke-test.yml`)
- **Duration**: 10 seconds @ 1 request/sec (~10 requests)
- **Purpose**: Quick validation of authentication and endpoint availability
- **Expected**: 100% success rate (200 OK responses)
- **Use Case**: Pre-deployment validation, CI/CD pipeline checks

### Load Test (`programs-load-test.yml`)
- **Phase 1 - Warm up**: 60s @ 5 requests/sec (~300 requests)
- **Phase 2 - Sustained load**: 120s @ 10 requests/sec (~1200 requests)
- **Total Duration**: 3 minutes (~1500 requests)
- **Purpose**: Validate system performance under sustained load
- **Use Case**: Performance baseline, capacity planning

## Test Architecture

### Authentication Flow
- **Processor**: `auth-processor.js`
- **Method**: Supabase authentication via POST to `/auth/v1/token`
- **Credentials**: Admin user (admin@test.com)
- **Token**: Retrieved before each scenario and used in Authorization header

### API Endpoint
- **Target**: `https://zowdchiqxaedaniokvqe.supabase.co`
- **Endpoint**: `GET /rest/v1/programs?select=*&order=created_at.desc`
- **Headers**:
  - `apikey`: Supabase anon key
  - `authorization`: Bearer token from authentication
  - `accept-profile`: public

### Configuration Files
- **programs-smoke-test.yml** - Smoke test configuration
- **programs-load-test.yml** - Full load test configuration
- **auth-processor.js** - Authentication token retrieval logic
- **.env** - Admin credentials and Artillery Cloud API key

## Artillery Cloud Integration

- **API Key**: Stored in `.env` file
- **Recording**: Enabled with `--record --key` flags
- **Dashboard**: Results uploaded to Artillery Cloud for analysis
- **Metrics**: Response times, error rates, throughput, virtual users

## Key Metrics

- **Response Time**: Min, max, mean, median, p95, p99
- **HTTP Status Codes**: 200 (success), 401 (auth failure)
- **Request Rate**: Requests per second
- **Virtual Users**: Created, completed, failed
- **Session Length**: Duration of each virtual user session

## Environment Variables

```
ADMIN_EMAIL=admin@test.com
ADMIN_PASSWORD=[HIDDEN]
ARTILLERY_CLOUD_API_KEY=[HIDDEN]
```

## Success Criteria

- **Smoke Test**: 100% success rate, all 200 OK responses
- **Load Test**: >95% success rate, p95 response time <500ms
- **Authentication**: No 401 errors, tokens retrieved successfully
- **Stability**: No connection errors or timeouts

## Performance Test Results

### Smoke Test Results
- **Total Requests**: 10
- **Success Rate**: 100% (10/10 requests returned 200 OK)
- **Response Time**:
  - Min: 166ms
  - Max: 214ms
  - Mean: 187.8ms
  - Median: 186.8ms
  - P95: 206.5ms
  - P99: 206.5ms
- **Session Length**: ~587ms average
- **Status**: ✅ All tests passed

### Load Test Results
- **Total Requests**: 1500
- **Success Rate**: 7.9% (119/1500 requests returned 200 OK)
- **Failed Requests**: 1380 returned 401 (authentication issues)
- **Response Time (200 OK)**:
  - Min: 151ms
  - Max: 472ms
  - Mean: 201ms
  - Median: 175.9ms
  - P95: 347.3ms
  - P99: 399.5ms
- **Response Time (401 errors)**:
  - Min: 130ms
  - Max: 1358ms
  - Mean: 162.2ms
  - Median: 156ms
  - P95: 194.4ms
  - P99: 320.6ms
- **Session Length**: ~445ms average
- **Errors**: 1499 cookie parse errors, 1 connection reset
- **Status**: ⚠️ High failure rate due to authentication token expiration

### Performance Analysis

**Smoke Test Performance**:
- Excellent response times (mean: 187.8ms)
- Consistent performance (low variance between min/max)
- 100% success rate indicates stable authentication
- P95 under 210ms meets performance targets

**Load Test Issues**:
- Authentication tokens expiring during sustained load
- Only 7.9% success rate (119 successful out of 1500 requests)
- Successful requests show good performance (mean: 201ms, p95: 347.3ms)
- Token refresh mechanism needed for long-running tests

**Recommendations**:
1. Implement token refresh logic in auth-processor.js
2. Cache tokens per virtual user session
3. Add token expiration handling
4. Reduce cookie parse errors with proper header management
5. Target: >95% success rate for production readiness
