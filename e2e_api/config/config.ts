export const apiConfig = {
  baseUrl: process.env.API_BASE_URL || 'https://neighborly-qa-sandbox-test.lovable.app/api',
  authUrl: 'https://zowdchiqxaedaniokvqe.supabase.co/auth/v1/token?grant_type=password',
  restUrl: 'https://zowdchiqxaedaniokvqe.supabase.co/rest/v1',
  apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpvd2RjaGlxeGFlZGFuaW9rdnFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwMzU4MjMsImV4cCI6MjA3ODYxMTgyM30.1OXF9oRteK__YIeGMHPUCr6B8D1wsHUNhGPIiIQWZRI',
  timeout: 30000
};