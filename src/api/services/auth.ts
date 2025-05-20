import { apiClient } from '../client';
import { API_CONFIG } from '../config';
import { AuthResponse, LoginCredentials, RegisterCredentials } from '../types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>(API_CONFIG.ENDPOINTS.AUTH.LOGIN, credentials);
  },

  async logout(): Promise<void> {
    return apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
  },
}; 