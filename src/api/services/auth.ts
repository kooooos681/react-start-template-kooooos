import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { AuthResponse, LoginCredentials, RegisterCredentials } from '../types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, credentials);
  },

  async logout(): Promise<void> {
    return apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  },
}; 