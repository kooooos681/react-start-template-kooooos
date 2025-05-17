import { useState, useEffect } from 'react';
import { categoriesService } from '../api/services/categories';
import { Category } from '../api/services/categories';

export interface CreateCategoryInput {
  name: string;
  photo: string;
}

export interface UpdateCategoryInput {
  name?: string;
  photo?: string;
}

export const useCategories = (limit = 20) => {
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [restCategories, setRestCategories] = useState<Category[]>([]);
  const [restLoading, setRestLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [shouldReset, setShouldReset] = useState(false);

  const loadRestCategories = async (currentPage: number, shouldAppend = true) => {
    try {
      setRestLoading(true);
      const response = await categoriesService.getCategories({
        pagination: {
          pageSize: limit,
          pageNumber: currentPage,
        },
      });
      if (!response.data || !Array.isArray(response.data)) {
        console.error('Invalid response format:', response);
        throw new Error('Неверный формат ответа от сервера');
      }
      const categories: Category[] = response.data.map((category) => ({
        id: category.id,
        name: category.name,
        photo: category.photo || '',
        createdAt: new Date(category.createdAt),
        updatedAt: new Date(category.updatedAt),
        commandId: '',
      }));

      if (categories.length < limit) {
        setHasMore(false);
      }

      setRestCategories(prevCategories => 
        shouldAppend ? [...prevCategories, ...categories] : categories
      );
    } catch (error) {
      console.error('Error loading categories:', error);
      setError(error instanceof Error ? error.message : 'Ошибка загрузки категорий');
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
      loadRestCategories(1, false);
      setShouldReset(false);
    } else if (page === 1) {
      loadRestCategories(1, false);
    }
  }, [shouldReset]);

  // Эффект для загрузки следующих страниц
  useEffect(() => {
    if (page > 1) {
      loadRestCategories(page, true);
    }
  }, [page]);

  // Эффект очистки при размонтировании
  useEffect(() => {
    return () => {
      setPage(1);
      setRestCategories([]);
      setHasMore(true);
      setError(null);
      setShouldReset(false);
    };
  }, []);

  const handleCreateCategory = async (input: CreateCategoryInput) => {
    try {
      setError(null);
      await categoriesService.createCategory(input);
      await resetAndLoad();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ошибка создания категории');
      throw error;
    }
  };

  const handleUpdateCategory = async (id: string, input: UpdateCategoryInput) => {
    try {
      setError(null);
      await categoriesService.updateCategory(id, input);
      await resetAndLoad();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ошибка обновления категории');
      throw error;
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      setError(null);
      await categoriesService.deleteCategory(id);
      await resetAndLoad();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ошибка удаления категории');
      throw error;
    }
  };

  return {
    categories: restCategories,
    loading: restLoading,
    error,
    loadMore,
    hasMore,
    createCategory: handleCreateCategory,
    updateCategory: handleUpdateCategory,
    deleteCategory: handleDeleteCategory,
  };
};
