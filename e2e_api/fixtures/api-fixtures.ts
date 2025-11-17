import { test as base } from '@playwright/test';
import { ApiHelper } from '../helpers/api-helper';
import { AuthHelper } from '../helpers/auth-helper';
import { apiConfig } from '../config/config';

type ApiFixtures = {
  apiHelper: ApiHelper;
  authHelper: AuthHelper;
  authToken: string;
  programs: any[];
};

export const test = base.extend<ApiFixtures>({
  apiHelper: async ({ request }, use) => {
    const apiHelper = new ApiHelper(request);
    await use(apiHelper);
  },
  
  authHelper: async ({ request }, use) => {
    const authHelper = new AuthHelper(request);
    await use(authHelper);
  },
  
  authToken: async ({ authHelper }, use) => {
    const email = process.env.TEST_USER_EMAIL || 'test@example.com';
    const password = process.env.TEST_USER_PASSWORD || 'password123';
    const token = await authHelper.getAuthToken(email, password);
    await use(token);
  },
  
  programs: async ({ request, authToken }, use) => {
    const response = await request.get(`${apiConfig.restUrl}/programs?select=*&order=created_at.desc`, {
      headers: {
        'apikey': apiConfig.apiKey,
        'authorization': `Bearer ${authToken}`,
        'accept-profile': 'public'
      }
    });
    const programs = await response.json();
    await use(programs);
  }
});

export { expect } from '@playwright/test';