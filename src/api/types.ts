export interface User {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  photo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  products: OrderProduct[];
  user: User;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface OrderProduct {
  _id: string;
  product: Product;
  quantity: number;
}

export interface CartItem {
  id: string;
  quantity: number;
}

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  code: string;
  field?: string;
} 