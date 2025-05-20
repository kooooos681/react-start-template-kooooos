import axios, { AxiosError } from 'axios';
import { API_CONFIG } from './config';

console.log('API_URL:', API_CONFIG.BASE_URL); // Добавляем лог для проверки URL

export enum ErrorCode {
  ERR_INCORRECT_EMAIL_OR_PASSWORD = 'ERR_INCORRECT_EMAIL_OR_PASSWORD',
  ERR_ACCOUNT_ALREADY_EXIST = 'ERR_ACCOUNT_ALREADY_EXIST',
  ERR_FIELD_REQUIRED = 'ERR_FIELD_REQUIRED',
  ERR_INCORRECT_PASSWORD = 'ERR_INCORRECT_PASSWORD',
  ERR_INVALID_PASSWORD = 'ERR_INVALID_PASSWORD',
  ERR_NOT_VALID = 'ERR_NOT_VALID',
  ERR_AUTH = 'ERR_AUTH',
  ERR_NO_FILES = 'ERR_NO_FILES',
  ERR_NOT_ALLOWED = 'ERR_NOT_ALLOWED',
  ERR_NOT_FOUND = 'ERR_NOT_FOUND',
  ERR_VALIDATION_ERROR = 'ERR_VALIDATION_ERROR',
  ERR_INVALID_QUERY_PARAMS = 'ERR_INVALID_QUERY_PARAMS',
  ERR_INTERNAL_SERVER = 'ERR_INTERNAL_SERVER',
}

export interface ServerError {
  extensions: {
    code: ErrorCode;
  };
  name: string;
  fieldName?: string;
  stack: string;
  message: string;
}

export interface ServerErrors {
  errors: ServerError[];
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: unknown,
    public code?: ErrorCode,
    public fieldName?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export interface LoginResponse {
  token: string;
}

const saveToken = (token: string) => {
  localStorage.setItem('token', token);
  // Устанавливаем токен для всех последующих запросов
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const clearToken = () => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
};

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`;
    console.log('Full login URL:', url);
    console.log('Request payload:', { email, password });
    console.log('Request headers:', {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
    
    const response = await axios.post<LoginResponse>(url, {
      email,
      password,
    }, {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    
    console.log('Login response:', response.data);
    saveToken(response.data.token);
    return response.data;
  } catch (error) {
    console.error('Login API error:', error);
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      const data = error.response?.data as ServerErrors;
      const message = error.message;

      console.error('Axios error details:', {
        status,
        data,
        message,
        code: error.code,
        config: error.config,
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        headers: error.config?.headers,
        method: error.config?.method,
      });

      if (error.code === 'ECONNABORTED') {
        throw new ApiError('Превышено время ожидания ответа от сервера');
      }

      if (data?.errors?.[0]) {
        const serverError = data.errors[0];
        throw new ApiError(
          serverError.message,
          status,
          data,
          serverError.extensions.code,
          serverError.fieldName
        );
      }

      switch (status) {
        case 400:
          throw new ApiError('Неверный email или пароль', status, data);
        case 401:
          throw new ApiError('Неверный email или пароль', status, data);
        case 500:
          throw new ApiError('Внутренняя ошибка сервера', status, data);
        case 504:
          throw new ApiError('Сервер не отвечает', status, data);
        default:
          throw new ApiError(`Произошла ошибка при входе: ${message}`, status, data);
      }
    }
    throw new ApiError('Произошла неизвестная ошибка');
  }
};

export const logout = () => {
  clearToken();
};

// Инициализация токена при загрузке
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} 