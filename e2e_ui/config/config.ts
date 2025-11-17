const randomPrefix = Math.random().toString(36).substring(2, 7);

export const config = {
  baseUrl: process.env.BASE_URL || 'https://neighborly-qa-sandbox-test.lovable.app',
  users: {
    staff: {
      name: `${randomPrefix} Staff User`,
      email: process.env.STAFF_EMAIL || 'staff@test.com',
      password: process.env.STAFF_PASSWORD || 'password123',
      role: 'Program Staff'
    },
    applicant: {
      name: `${randomPrefix} Applicant User`,
      email: process.env.APPLICANT_EMAIL || 'applicant@test.com',
      password: process.env.APPLICANT_PASSWORD || 'password123',
      role: 'Applicant'
    },
    admin: {
      name: `${randomPrefix} Admin User`,
      email: process.env.ADMIN_EMAIL || 'admin@test.com',
      password: process.env.ADMIN_PASSWORD || 'password123',
      role: 'System Admin'
    }
  }
};