import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import {
  GET_PRODUCTS_QUERY,
  GET_PRODUCT_QUERY,
  CREATE_PRODUCT_MUTATION,
  UPDATE_PRODUCT_MUTATION,
  DELETE_PRODUCT_MUTATION,
  GET_CATEGORIES_QUERY,
} from '../api/graphql/products';
import { Product, Category, CreateProductInput, UpdateProductInput } from '../types/product';

interface ProductsData {
  products: {
    getMany: {
      data: Array<{
        id: string;
        name: string;
        photo: string;
        desc: string;
        price: number;
        category: {
          id: string;
          name: string;
        };
      }>;
      pagination: {
        pageSize: number;
        pageNumber: number;
        total: number;
      };
      sorting: {
        type: string;
        field: string;
      };
    };
  };
}

interface ProductData {
  product: Product;
}

interface CategoriesData {
  categories: Category[];
}

export const useProducts = () => {
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem('token');
  console.log('GRAPHQL TOKEN', token);
  const variables = {
    input: {
      pagination: {
        pageSize: 10,
        pageNumber: 1,
      },
      sorting: {
        type: 'ASC',
        field: 'createdAt',
      },
    },
  };

  console.log('PRODUCTS QUERY VARIABLES', JSON.stringify(variables, null, 2));
  const handleError = (error: any) => {
    console.error('GraphQL error:', error);
    if (error?.networkError?.result) {
      console.error('GraphQL network error result:', JSON.stringify(error.networkError.result, null, 2));
    }
    const msg = error.message || '';
    setError('Ошибка загрузки товаров: ' + msg);
  };

  const { data, loading, fetchMore } = useQuery<ProductsData>(GET_PRODUCTS_QUERY, {
    variables,
    onError: handleError,
    fetchPolicy: 'network-only',
  });

  if (Array.isArray(data?.products?.getMany?.data)) {
    console.log('PRODUCTS DATA LENGTH:', data.products.getMany.data.length);
    if (data.products.getMany.data.length > 0) {
      console.log('PRODUCTS DATA EXAMPLE:', data.products.getMany.data[0]);
    }
  } else {
    console.log('PRODUCTS DATA is undefined or not an array:', data?.products?.getMany?.data);
  }

  const { data: categoriesData, loading: categoriesLoading } = useQuery<CategoriesData>(GET_CATEGORIES_QUERY, {
    onError: handleError,
  });

  const [createProduct] = useMutation<{ createProduct: Product }, { input: CreateProductInput }>(
    CREATE_PRODUCT_MUTATION,
    {
      onError: handleError,
    }
  );

  const [updateProduct] = useMutation<{ updateProduct: Product }, { id: string; input: UpdateProductInput }>(
    UPDATE_PRODUCT_MUTATION,
    {
      onError: handleError,
    }
  );

  const [deleteProduct] = useMutation<{ deleteProduct: boolean }, { id: string }>(DELETE_PRODUCT_MUTATION, {
    onError: handleError,
  });

  const loadMore = () => {
    if (!data?.products.getMany.pagination) return;

    const { pageSize, pageNumber, total } = data.products.getMany.pagination;
    const hasMore = pageSize * pageNumber < total;

    if (hasMore) {
      fetchMore({
        variables: {
          input: {
            pagination: {
              pageSize,
              pageNumber: pageNumber + 1,
            },
            sorting: {
              type: 'ASC',
              field: 'createdAt',
            },
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            products: {
              getMany: {
                ...fetchMoreResult.products.getMany,
                data: [
                  ...prev.products.getMany.data,
                  ...fetchMoreResult.products.getMany.data,
                ],
              },
            },
          };
        },
      });
    }
  };

  const handleCreateProduct = async (input: CreateProductInput) => {
    try {
      const { data } = await createProduct({ variables: { input } });
      return data?.createProduct;
    } catch (error) {
      throw error;
    }
  };

  const handleUpdateProduct = async (id: string, input: UpdateProductInput) => {
    try {
      const { data } = await updateProduct({ variables: { id, input } });
      return data?.updateProduct;
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const { data } = await deleteProduct({ variables: { id } });
      return data?.deleteProduct;
    } catch (error) {
      throw error;
    }
  };

  return {
    products: Array.isArray(data?.products?.getMany?.data) ? data.products.getMany.data : [],
    categories: categoriesData?.categories || [],
    loading: loading || categoriesLoading,
    error,
    loadMore,
    hasMore: data?.products?.getMany?.pagination
      ? data.products.getMany.pagination.pageSize * data.products.getMany.pagination.pageNumber <
        data.products.getMany.pagination.total
      : false,
    createProduct: handleCreateProduct,
    updateProduct: handleUpdateProduct,
    deleteProduct: handleDeleteProduct,
  };
}; 