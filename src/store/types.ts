import { configureStore } from '@reduxjs/toolkit';
export * from './baseTypes';

// Создаем временный store только для получения типов
const tempStore = configureStore({
  reducer: {},
});

export type RootState = ReturnType<typeof tempStore.getState>;
export type AppDispatch = typeof tempStore.dispatch;

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface CartItem {
  id: string;
  quantity: number;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
}

export interface ProfileState {
  data: User | null;
  loading: boolean;
  error: string | null;
}

export interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

export interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

export interface AppState {
  isInitialized: boolean;
} 