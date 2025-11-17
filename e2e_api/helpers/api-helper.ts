import { APIRequestContext } from '@playwright/test';

export class ApiHelper {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async get(url: string, options?: any) {
    return await this.request.get(url, options);
  }

  async post(url: string, options?: any) {
    return await this.request.post(url, options);
  }

  async put(url: string, options?: any) {
    return await this.request.put(url, options);
  }

  async delete(url: string, options?: any) {
    return await this.request.delete(url, options);
  }

  async patch(url: string, options?: any) {
    return await this.request.patch(url, options);
  }
}