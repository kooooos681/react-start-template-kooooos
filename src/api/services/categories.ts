import { API_CONFIG } from '../config';
import { BaseService } from '../base-service';
import { BaseFilters, BaseResponse } from '../types/common';

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
    const categories = await this.getList(filters);
    return {
      data: categories,
      pagination: {
        pageSize: filters?.pagination?.pageSize || 10,
        pageNumber: filters?.pagination?.pageNumber || 1,
        total: categories.length,
      },
    };
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