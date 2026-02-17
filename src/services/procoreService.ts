import axios from 'axios';
import { procoreConfig } from '../config/procore';
import { AuthService } from './authService';

export class ProcoreService {
  protected static async getAccessToken() {
    return await AuthService.getToken();
  }

  protected static async getRequest<T>(endpoint: string, params: any = {}): Promise<T> {
    const token = await this.getAccessToken();
    const response = await axios.get(`${procoreConfig.apiBaseUrl}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Procore-Company-Id': procoreConfig.companyId,
        'Accept': 'application/json',
      },
      params
    });
    return response.data as T;
  }
}
