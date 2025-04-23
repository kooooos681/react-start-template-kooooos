export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
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