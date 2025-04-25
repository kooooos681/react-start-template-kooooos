export const API_CONFIG = {
  BASE_URL: 'http://19429ba06ff2.vps.myjino.ru/api',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/signup',
      LOGOUT: '/auth/logout',
    },
    PRODUCTS: {
      LIST: '/products',
      DETAIL: (id: string) => `/products/${id}`,
    },
    ORDERS: {
      LIST: '/orders',
      DETAIL: (id: string) => `/orders/${id}`,
      CREATE: '/orders',
      UPDATE: (id: string) => `/orders/${id}`,
      DELETE: (id: string) => `/orders/${id}`,
    },
    CATEGORIES: {
      LIST: '/categories',
      DETAIL: (id: string) => `/categories/${id}`,
    },
    UPLOAD: '/upload',
  },
} as const; 