import axios from 'axios';
import { procoreConfig } from '../config/procore';

export class AuthService {
  private static accessToken: string | null = null;

  /**
   * Gets a token using Client Credentials flow.
   * Note: Ensure your Procore App supports this grant type.
   */
  public static async fetchClientToken(): Promise<string> {
    try {
      const response = await axios.post(procoreConfig.tokenUrl, {
        grant_type: 'client_credentials',
        client_id: procoreConfig.clientId,
        client_secret: procoreConfig.clientSecret,
      });

      this.accessToken = (response.data as any).access_token;
      return this.accessToken!;
    } catch (error: any) {
      console.error('Failed to fetch Procore access token:', error.response?.data || error.message);
      throw new Error('Authentication failed');
    }
  }

  /**
   * Generates the Procore Authorization URL.
   */
  public static getAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: procoreConfig.clientId,
      response_type: 'code',
      redirect_uri: procoreConfig.redirectUri,
    });
    return `${procoreConfig.authUrl}?${params.toString()}`;
  }

  /**
   * Exchanges an authorization code for an access token.
   */
  public static async exchangeCodeForToken(code: string): Promise<string> {
    try {
      const response = await axios.post(procoreConfig.tokenUrl, {
        grant_type: 'authorization_code',
        client_id: procoreConfig.clientId,
        client_secret: procoreConfig.clientSecret,
        code,
        redirect_uri: procoreConfig.redirectUri,
      });

      this.accessToken = (response.data as any).access_token;
      // You should also save response.data.refresh_token for long-term use
      return this.accessToken!;
    } catch (error: any) {
      console.error('Failed to exchange code for token:', error.response?.data || error.message);
      throw new Error('Token exchange failed');
    }
  }

  public static async getToken(): Promise<string> {
    // If we have a token in memory, return it.
    // Otherwise, check the .env file or fetch a new one.
    if (this.accessToken) return this.accessToken;
    
    if (process.env.PROCORE_ACCESS_TOKEN && process.env.PROCORE_ACCESS_TOKEN !== 'your_access_token') {
      return process.env.PROCORE_ACCESS_TOKEN;
    }

    return await this.fetchClientToken();
  }
}
