import { useState, useEffect } from 'react';
import { productsService } from '../api/services/products';
import { Item } from "src/pages/ProductsPage";

export interface CreateProductInput {
  name: string;
  desc: string;
  price: number;
  photo: string;
  categoryId: string;
}

export interface UpdateProductInput {
  name?: string;
  desc?: string;
  price?: number;
  photo?: string;
  categoryId?: string;
}

export const useProducts = (limit = 20) => {
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [restProducts, setRestProducts] = useState<Item[]>([]);
  const [restLoading, setRestLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [shouldReset, setShouldReset] = useState(false);

  const loadRestProducts = async (currentPage: number, shouldAppend = true) => {
    try {
      setRestLoading(true);
      const response = await productsService.getProducts({
        pagination: {
          pageSize: limit,
          pageNumber: currentPage,
        },
      });
      if (!response.data || !Array.isArray(response.data)) {
        console.error('Invalid response format:', response);
        throw new Error('Неверный формат ответа от сервера');
      }
      const items: Item[] = response.data.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        desc: product.desc || '',
        photo: product.photo || '',
        categoryId: product.categoryId || product.category?.id || '',
        category: {
          id: product.category?.id || '',
          name: product.category?.name || '',
          photo: product.category?.photo || '',
          createdAt: product.category?.createdAt ? new Date(product.category.createdAt).toISOString() : '',
          updatedAt: product.category?.updatedAt ? new Date(product.category.updatedAt).toISOString() : ''
        }
      }));

      if (items.length < limit) {
        setHasMore(false);
      }

      setRestProducts(prevProducts => 
        shouldAppend ? [...prevProducts, ...items] : items
      );
    } catch (error) {
      console.error('Error loading products:', error);
      setError(error instanceof Error ? error.message : 'Ошибка загрузки товаров');
    } finally {
      setRestLoading(false);
    }
  };

  const loadMore = async () => {
    if (!hasMore || restLoading) return;
    setPage((prev) => prev + 1);
  };

  const resetAndLoad = async () => {
    setPage(1);
    setHasMore(true);
    setShouldReset(true);
  };

  // Эффект для начальной загрузки и сброса
  useEffect(() => {
    if (shouldReset) {
      loadRestProducts(1, false);
      setShouldReset(false);
    } else if (page === 1) {
      loadRestProducts(1, false);
    }
  }, [shouldReset]);

  // Эффект для загрузки следующих страниц
  useEffect(() => {
    if (page > 1) {
      loadRestProducts(page, true);
    }
  }, [page]);

  // Эффект очистки при размонтировании
  useEffect(() => {
    return () => {
      setPage(1);
      setRestProducts([]);
      setHasMore(true);
      setError(null);
      setShouldReset(false);
    };
  }, []);

  const handleCreateProduct = async (input: CreateProductInput) => {
    try {
      setError(null);
      await productsService.createProduct(input);
      await resetAndLoad();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ошибка создания товара');
      throw error;
    }
  };

  const handleUpdateProduct = async (id: string, input: UpdateProductInput) => {
    try {
      setError(null);
      await productsService.updateProduct(id, input);
      await resetAndLoad();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ошибка обновления товара');
      throw error;
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      setError(null);
      await productsService.deleteProduct(id);
      await resetAndLoad();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ошибка удаления товара');
      throw error;
    }
  };

  return {
    products: restProducts,
    loading: restLoading,
    error,
    loadMore,
    hasMore,
    createProduct: handleCreateProduct,
    updateProduct: handleUpdateProduct,
    deleteProduct: handleDeleteProduct,
  };
};
