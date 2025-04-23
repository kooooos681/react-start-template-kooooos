import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { Order, OrderStatus } from '../types';

export const ordersService = {
  async getOrders(): Promise<Order[]> {
    return apiClient.get<Order[]>(API_ENDPOINTS.ORDERS.LIST);
  },

  async getOrder(id: string): Promise<Order> {
    return apiClient.get<Order>(API_ENDPOINTS.ORDERS.DETAIL(id));
  },

  async createOrder(productIds: string[]): Promise<Order> {
    return apiClient.post<Order>(API_ENDPOINTS.ORDERS.CREATE, { productIds });
  },

  async updateOrder(id: string, status: OrderStatus): Promise<Order> {
    return apiClient.put<Order>(API_ENDPOINTS.ORDERS.UPDATE(id), { status });
  },

  async deleteOrder(id: string): Promise<void> {
    return apiClient.delete(API_ENDPOINTS.ORDERS.DELETE(id));
  },
}; 