import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { Category } from '../types';

export const categoriesService = {
  async getCategories(): Promise<Category[]> {
    return apiClient.get<Category[]>(API_ENDPOINTS.CATEGORIES.LIST);
  },

  async getCategory(id: string): Promise<Category> {
    return apiClient.get<Category>(API_ENDPOINTS.CATEGORIES.DETAIL(id));
  },

  async createCategory(category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> {
    return apiClient.post<Category>(API_ENDPOINTS.CATEGORIES.LIST, category);
  },

  async updateCategory(id: string, category: Partial<Category>): Promise<Category> {
    return apiClient.put<Category>(API_ENDPOINTS.CATEGORIES.DETAIL(id), category);
  },

  async deleteCategory(id: string): Promise<void> {
    return apiClient.delete(API_ENDPOINTS.CATEGORIES.DETAIL(id));
  },
}; 