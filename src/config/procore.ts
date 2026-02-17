export const procoreConfig = {
  clientId: process.env.PROCORE_CLIENT_ID || '',
  clientSecret: process.env.PROCORE_CLIENT_SECRET || '',
  companyId: process.env.PROCORE_COMPANY_ID || '',
  redirectUri: process.env.PROCORE_REDIRECT_URI || '',
  apiBaseUrl: 'https://api.procore.com',
  tokenUrl: 'https://api.procore.com/oauth/token',
  authUrl: 'https://api.procore.com/oauth/authorize',
};
