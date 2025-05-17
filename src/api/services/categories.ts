import { API_CONFIG } from '../config';
import { BaseService } from '../base-service';
import { BaseFilters, BaseResponse } from '../types/common';
import axios from "axios";
import { ApiError } from "src/api/auth";

export interface Category {
  id: string;
  name: string;
  photo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CategoryFilters = BaseFilters;
export type CategoriesResponse = BaseResponse<Category>;

class CategoryService extends BaseService<Category> {
  constructor() {
    super(
      API_CONFIG.ENDPOINTS.CATEGORIES.LIST,
      API_CONFIG.ENDPOINTS.CATEGORIES.DETAIL
    );
  }

  async getCategories(filters?: CategoryFilters): Promise<CategoriesResponse> {
    try {
      const url = `${API_CONFIG.BASE_URL}${this.baseEndpoint}`;
      const params = this.buildFilterParams(filters);

      const response = await axios.get<CategoriesResponse>(url, {
        params,
        headers: {
          'Accept': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new ApiError(`Ошибка при получении списка продуктов: ${error.message}`);
      }
      throw new ApiError('Произошла неизвестная ошибка');
    }
  }

  async getCategory(id: string): Promise<Category> {
    return this.getDetail(id);
  }

  async createCategory(category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> {
    return this.create(category);
  }

  async updateCategory(id: string, category: Partial<Category>): Promise<Category> {
    return this.update(id, category);
  }

  async deleteCategory(id: string): Promise<void> {
    return this.delete(id);
  }
}

export const categoriesService = new CategoryService(); 