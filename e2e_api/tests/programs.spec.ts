import { test, expect } from '../fixtures/api-fixtures';
import { apiConfig } from '../config/config';

test.describe('Programs API Tests', () => {
  test('should get all programs', async ({ programs }) => {
    expect(programs).toBeDefined();
    expect(Array.isArray(programs)).toBeTruthy();
  });

  test('should get programs with authentication', async ({ request, authToken }) => {
    const response = await request.get(`${apiConfig.restUrl}/programs?select=*&order=created_at.desc`, {
      headers: {
        'apikey': apiConfig.apiKey,
        'authorization': `Bearer ${authToken}`,
        'accept-profile': 'public'
      }
    });
    
    expect(response.status()).toBe(200);
    const programs = await response.json();
    expect(Array.isArray(programs)).toBeTruthy();
  });

  test('should fail without authentication', async ({ request }) => {
    const response = await request.get(`${apiConfig.restUrl}/programs?select=*&order=created_at.desc`, {
      headers: {
        'apikey': apiConfig.apiKey,
        'accept-profile': 'public'
      }
    });
    
    expect(response.status()).toBe(401);
  });

  test('should create a program', async ({ request, authToken }) => {
    const newProgram = {
      name: `Test Program ${Date.now()}`,
      category: 'Housing',
      total_budget: 100000,
      max_award: 5000,
      status: 'Draft',
      description: 'Test program description'
    };

    const response = await request.post(`${apiConfig.restUrl}/programs`, {
      headers: {
        'apikey': apiConfig.apiKey,
        'authorization': `Bearer ${authToken}`,
        'accept-profile': 'public',
        'content-type': 'application/json',
        'prefer': 'return=representation'
      },
      data: newProgram
    });
    
    expect(response.status()).toBe(201);
    const createdProgram = await response.json();
    expect(createdProgram[0].name).toBe(newProgram.name);
    expect(createdProgram[0].category).toBe(newProgram.category);
  });

  test('should get a single program by id', async ({ request, authToken, programs }) => {
    if (programs.length === 0) {
      test.skip();
    }

    const programId = programs[0].id;
    const response = await request.get(`${apiConfig.restUrl}/programs?id=eq.${programId}&select=*`, {
      headers: {
        'apikey': apiConfig.apiKey,
        'authorization': `Bearer ${authToken}`,
        'accept-profile': 'public'
      }
    });
    
    expect(response.status()).toBe(200);
    const program = await response.json();
    expect(program[0].id).toBe(programId);
  });

  test('should update a program', async ({ request, authToken, programs }) => {
    if (programs.length === 0) {
      test.skip();
    }

    const programId = programs[0].id;
    const updatedData = {
      description: `Updated description ${Date.now()}`
    };

    const response = await request.patch(`${apiConfig.restUrl}/programs?id=eq.${programId}`, {
      headers: {
        'apikey': apiConfig.apiKey,
        'authorization': `Bearer ${authToken}`,
        'accept-profile': 'public',
        'content-type': 'application/json'
      },
      data: updatedData
    });
    
    expect(response.status()).toBe(204);
  });

  test('should filter programs by status', async ({ request, authToken }) => {
    const response = await request.get(`${apiConfig.restUrl}/programs?status=eq.Draft&select=*`, {
      headers: {
        'apikey': apiConfig.apiKey,
        'authorization': `Bearer ${authToken}`,
        'accept-profile': 'public'
      }
    });
    
    expect(response.status()).toBe(200);
    const programs = await response.json();
    programs.forEach((program: any) => {
      expect(program.status).toBe('Draft');
    });
  });

  test('should filter programs by category', async ({ request, authToken }) => {
    const response = await request.get(`${apiConfig.restUrl}/programs?category=eq.Housing&select=*`, {
      headers: {
        'apikey': apiConfig.apiKey,
        'authorization': `Bearer ${authToken}`,
        'accept-profile': 'public'
      }
    });
    
    expect(response.status()).toBe(200);
    const programs = await response.json();
    programs.forEach((program: any) => {
      expect(program.category).toBe('Housing');
    });
  });
});
