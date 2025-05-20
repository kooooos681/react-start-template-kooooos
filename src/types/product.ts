export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  photo?: string;
  desc: string;
  price: number;
  oldPrice?: number;
  category: Category;
  createdAt: string;
  updatedAt: string;
}

export interface ProductInput {
  name: string;
  photo?: string;
  desc: string;
  price: number;
  oldPrice?: number;
  categoryId: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
}

export interface CreateProductInput {
  name: string;
  desc?: string;
  photo?: string;
  price: number;
  oldPrice?: number;
  categoryId: string;
}

export interface UpdateProductInput extends Partial<CreateProductInput> {} 