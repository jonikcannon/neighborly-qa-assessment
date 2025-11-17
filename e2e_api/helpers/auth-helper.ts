import { APIRequestContext } from '@playwright/test';
import { apiConfig } from '../config/config';

export class AuthHelper {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getAuthToken(email: string, password: string): Promise<string> {
    const response = await this.request.post(apiConfig.authUrl, {
      headers: {
        'apikey': apiConfig.apiKey,
        'content-type': 'application/json',
        'x-client-info': 'supabase-js-web/2.0.0',
        'x-supabase-api-version': '2024-01-01'
      },
      data: {
        email: email,
        password: password
      }
    });

    const responseBody = await response.json();
    return responseBody.access_token;
  }
}