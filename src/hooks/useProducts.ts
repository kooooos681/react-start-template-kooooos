import { useMutation, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import {
  GET_PRODUCTS_QUERY,
  GET_PRODUCT_QUERY,
  CREATE_PRODUCT_MUTATION,
  UPDATE_PRODUCT_MUTATION,
  DELETE_PRODUCT_MUTATION,
} from '../api/graphql/products';
import { Item } from '../components/ItemList/ItemList';
import { productsService } from '../api/services/products';

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
}

export interface UpdateProductInput {
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  categoryId?: string;
}

export const useProducts = (limit = 10, useGraphQL = true) => {
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [restProducts, setRestProducts] = useState<Item[]>([]);
  const [restLoading, setRestLoading] = useState(false);

  const {
    data: productsData,
    loading: productsLoading,
    fetchMore,
  } = useQuery(GET_PRODUCTS_QUERY, {
    skip: !useGraphQL,
  });

  const [createProduct] = useMutation(CREATE_PRODUCT_MUTATION);
  const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION);
  const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION);

  const loadRestProducts = async () => {
    if (useGraphQL) return;
    
    try {
      setRestLoading(true);
      const response = await productsService.getProducts({
        pagination: {
          pageSize: limit,
          pageNumber: Math.floor(offset / limit) + 1,
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
        description: product.description || '',
        image: product.photo || '',
        category: product.categoryId,
      }));
      
      setRestProducts(items);
    } catch (error) {
      console.error('Error loading products:', error);
      setError(error instanceof Error ? error.message : 'Ошибка загрузки товаров');
    } finally {
      setRestLoading(false);
    }
  };

  const loadMore = async () => {
    if (useGraphQL) {
      try {
        const newOffset = offset + limit;
        await fetchMore({
          variables: { offset: newOffset, limit },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            return {
              products: [...prev.products, ...fetchMoreResult.products],
            };
          },
        });
        setOffset(newOffset);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Ошибка загрузки товаров');
      }
    } else {
      setOffset((prev) => prev + limit);
      await loadRestProducts();
    }
  };

  const handleCreateProduct = async (input: CreateProductInput) => {
    try {
      setError(null);
      if (useGraphQL) {
        const { data } = await createProduct({
          variables: { input },
          refetchQueries: [{ query: GET_PRODUCTS_QUERY, variables: { offset: 0, limit } }],
        });
        return data.createProduct;
      } else {
        const product = await productsService.createProduct(input);
        await loadRestProducts();
        return product;
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ошибка создания товара');
      throw error;
    }
  };

  const handleUpdateProduct = async (id: string, input: UpdateProductInput) => {
    try {
      setError(null);
      if (useGraphQL) {
        const { data } = await updateProduct({
          variables: { id, input },
          refetchQueries: [{ query: GET_PRODUCTS_QUERY, variables: { offset: 0, limit } }],
        });
        return data.updateProduct;
      } else {
        const product = await productsService.updateProduct(id, input);
        await loadRestProducts();
        return product;
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ошибка обновления товара');
      throw error;
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      setError(null);
      if (useGraphQL) {
        await deleteProduct({
          variables: { id },
          refetchQueries: [{ query: GET_PRODUCTS_QUERY, variables: { offset: 0, limit } }],
        });
      } else {
        await productsService.deleteProduct(id);
        await loadRestProducts();
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ошибка удаления товара');
      throw error;
    }
  };

  useEffect(() => {
    if (!useGraphQL) {
      loadRestProducts();
    }
  }, [useGraphQL]);

  return {
    products: useGraphQL ? productsData?.products || [] : restProducts,
    loading: useGraphQL ? productsLoading : restLoading,
    error,
    loadMore,
    createProduct: handleCreateProduct,
    updateProduct: handleUpdateProduct,
    deleteProduct: handleDeleteProduct,
  };
}; 