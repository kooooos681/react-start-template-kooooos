import axios from 'axios';
import { API_CONFIG } from './config';
import { ApiError } from './auth';
import { BaseFilters } from './types/common';

// Настраиваем axios для работы с CORS
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

export abstract class BaseService<T> {
  protected constructor(
    protected readonly baseEndpoint: string,
    protected readonly detailEndpoint: (id: string) => string
  ) {}

  protected async getList(filters?: BaseFilters): Promise<T[]> {
    try {
      const url = `${API_CONFIG.BASE_URL}${this.baseEndpoint}`;
      const params = this.buildFilterParams(filters);

      const response = await axios.get<T[]>(url, {
        params,
        headers: {
          Accept: 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new ApiError(`Ошибка при получении списка: ${error.message}`);
      }
      throw new ApiError('Произошла неизвестная ошибка');
    }
  }

  protected async getDetail(id: string): Promise<T> {
    try {
      const url = `${API_CONFIG.BASE_URL}${this.detailEndpoint(id)}`;
      
      const response = await axios.get<T>(url, {
        headers: {
          Accept: 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new ApiError(`Ошибка при получении деталей: ${error.message}`);
      }
      throw new ApiError('Произошла неизвестная ошибка');
    }
  }

  protected async create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
    try {
      const url = `${API_CONFIG.BASE_URL}${this.baseEndpoint}`;
      
      const response = await axios.post<T>(url, data, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new ApiError(`Ошибка при создании: ${error.message}`);
      }
      throw new ApiError('Произошла неизвестная ошибка');
    }
  }

  protected async update(id: string, data: Partial<T>): Promise<T> {
    try {
      const url = `${API_CONFIG.BASE_URL}${this.detailEndpoint(id)}`;
      
      const response = await axios.put<T>(url, data, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new ApiError(`Ошибка при обновлении: ${error.message}`);
      }
      throw new ApiError('Произошла неизвестная ошибка');
    }
  }

  protected async delete(id: string): Promise<void> {
    try {
      const url = `${API_CONFIG.BASE_URL}${this.detailEndpoint(id)}`;
      
      await axios.delete(url, {
        headers: {
          Accept: 'application/json',
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new ApiError(`Ошибка при удалении: ${error.message}`);
      }
      throw new ApiError('Произошла неизвестная ошибка');
    }
  }

  protected buildFilterParams(filters?: BaseFilters): URLSearchParams {
    const params = new URLSearchParams();
    
    if (filters) {
      if (filters.ids) {
        params.append('ids', JSON.stringify(filters.ids));
      }
      if (filters.name) {
        params.append('name', filters.name);
      }
      if (filters.pagination) {
        params.append('pagination', JSON.stringify(filters.pagination));
      }
      if (filters.sorting) {
        params.append('sorting', JSON.stringify(filters.sorting));
      }
    }

    return params;
  }
} 