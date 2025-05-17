import { apiClient } from '../client';
import { API_CONFIG } from '../config';
import { Order, OrderStatus } from '../types';

// Тип для создания заказа через API
export type CreateOrderParams = {
  products: Array<{ id: string; quantity: number }>;
  status?: OrderStatus;
};

export const ordersService = {
  async getOrders(): Promise<Order[]> {
    return apiClient.get<Order[]>(API_CONFIG.ENDPOINTS.ORDERS.LIST);
  },

  async getOrder(id: string): Promise<Order> {
    return apiClient.get<Order>(API_CONFIG.ENDPOINTS.ORDERS.DETAIL(id));
  },

  async createOrder(order: CreateOrderParams): Promise<Order> {
    return apiClient.post<Order>(API_CONFIG.ENDPOINTS.ORDERS.CREATE, order);
  },

  async updateOrder(id: string, order: Partial<Order>): Promise<Order> {
    return apiClient.patch<Order>(API_CONFIG.ENDPOINTS.ORDERS.UPDATE(id), order);
  },

  async deleteOrder(id: string): Promise<void> {
    return apiClient.delete(API_CONFIG.ENDPOINTS.ORDERS.DELETE(id));
  },
}; 