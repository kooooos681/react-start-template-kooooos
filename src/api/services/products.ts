import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { Product } from '../types';

export const productsService = {
  async getProducts(): Promise<Product[]> {
    return apiClient.get<Product[]>(API_ENDPOINTS.PRODUCTS.LIST);
  },

  async getProduct(id: string): Promise<Product> {
    return apiClient.get<Product>(API_ENDPOINTS.PRODUCTS.DETAIL(id));
  },

  async createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    return apiClient.post<Product>(API_ENDPOINTS.PRODUCTS.LIST, product);
  },

  async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    return apiClient.put<Product>(API_ENDPOINTS.PRODUCTS.DETAIL(id), product);
  },

  async deleteProduct(id: string): Promise<void> {
    return apiClient.delete(API_ENDPOINTS.PRODUCTS.DETAIL(id));
  },
}; 