import { API_CONFIG } from '../config';
import { BaseService } from '../base-service';
import { BaseFilters, BaseResponse } from '../types/common';
import axios from 'axios';
import { ApiError } from '../auth';

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  photo?: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFilters extends BaseFilters {
  categoryIds?: string[];
}

export type ProductsResponse = BaseResponse<Product>;

class ProductService extends BaseService<Product> {
  constructor() {
    super(
      API_CONFIG.ENDPOINTS.PRODUCTS.LIST,
      API_CONFIG.ENDPOINTS.PRODUCTS.DETAIL
    );
  }

  async getProducts(filters?: ProductFilters): Promise<ProductsResponse> {
    try {
      const url = `${API_CONFIG.BASE_URL}${this.baseEndpoint}`;
      const params = this.buildFilterParams(filters);

      const response = await axios.get<ProductsResponse>(url, {
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

  async getProduct(id: string): Promise<Product> {
    return this.getDetail(id);
  }

  async createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    return this.create(product);
  }

  async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    return this.update(id, product);
  }

  async deleteProduct(id: string): Promise<void> {
    return this.delete(id);
  }
}

export const productsService = new ProductService(); 