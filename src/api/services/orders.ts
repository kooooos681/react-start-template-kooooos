import { apiClient } from '../client';
import { API_CONFIG } from '../config';
import { Order, OrderStatus } from '../types';

export const ordersService = {
  async getOrders(): Promise<Order[]> {
    return apiClient.get<Order[]>(API_CONFIG.ENDPOINTS.ORDERS.LIST);
  },

  async getOrder(id: string): Promise<Order> {
    return apiClient.get<Order>(API_CONFIG.ENDPOINTS.ORDERS.DETAIL(id));
  },

  async createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    return apiClient.post<Order>(API_CONFIG.ENDPOINTS.ORDERS.CREATE, order);
  },

  async updateOrder(id: string, order: Partial<Order>): Promise<Order> {
    return apiClient.put<Order>(API_CONFIG.ENDPOINTS.ORDERS.UPDATE(id), order);
  },

  async deleteOrder(id: string): Promise<void> {
    return apiClient.delete(API_CONFIG.ENDPOINTS.ORDERS.DELETE(id));
  },
}; 