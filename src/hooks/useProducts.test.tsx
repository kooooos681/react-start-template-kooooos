import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { useProducts } from './useProducts';
import {
  GET_PRODUCTS_QUERY,
  CREATE_PRODUCT_MUTATION,
  UPDATE_PRODUCT_MUTATION,
  DELETE_PRODUCT_MUTATION,
} from '../api/graphql/products';
import { Product } from '../types/product';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Test Product 1',
    photo: 'https://example.com/photo1.jpg',
    desc: 'Test Description 1',
    price: 1000,
    oldPrice: 1200,
    category: {
      id: '1',
      name: 'Test Category 1',
    },
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    name: 'Test Product 2',
    photo: 'https://example.com/photo2.jpg',
    desc: 'Test Description 2',
    price: 2000,
    category: {
      id: '2',
      name: 'Test Category 2',
    },
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
];

const mockCategories = [
  {
    id: '1',
    name: 'Test Category 1',
  },
  {
    id: '2',
    name: 'Test Category 2',
  },
];

const mocks = [
  {
    request: {
      query: GET_PRODUCTS_QUERY,
      variables: {
        input: {
          pagination: {
            pageSize: 10,
            pageNumber: 1,
          },
        },
      },
    },
    result: {
      data: {
        products: {
          getMany: {
            data: mockProducts,
            pagination: {
              pageSize: 10,
              pageNumber: 1,
              total: 2,
            },
            sorting: {
              type: 'ASC',
              field: 'name',
            },
          },
        },
      },
    },
  },
  {
    request: {
      query: GET_PRODUCTS_QUERY,
      variables: {
        input: {
          pagination: {
            pageSize: 10,
            pageNumber: 2,
          },
        },
      },
    },
    result: {
      data: {
        products: {
          getMany: {
            data: [],
            pagination: {
              pageSize: 10,
              pageNumber: 2,
              total: 2,
            },
            sorting: {
              type: 'ASC',
              field: 'name',
            },
          },
        },
      },
    },
  },
  {
    request: {
      query: CREATE_PRODUCT_MUTATION,
      variables: {
        input: {
          name: 'New Product',
          photo: 'https://example.com/new.jpg',
          desc: 'New Description',
          price: 1500,
          categoryId: '1',
        },
      },
    },
    result: {
      data: {
        createProduct: {
          id: '3',
          name: 'New Product',
          photo: 'https://example.com/new.jpg',
          desc: 'New Description',
          price: 1500,
          category: {
            id: '1',
            name: 'Test Category 1',
          },
          createdAt: '2024-01-02T00:00:00.000Z',
          updatedAt: '2024-01-02T00:00:00.000Z',
        },
      },
    },
  },
];

describe('useProducts', () => {
  it('fetches products successfully', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result } = renderHook(() => useProducts(), { wrapper });

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.products).toEqual([]);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.products).toEqual(mockProducts);
  });

  it('creates product successfully', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result } = renderHook(() => useProducts(), { wrapper });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await act(async () => {
      await result.current.createProduct({
        name: 'New Product',
        photo: 'https://example.com/new.jpg',
        desc: 'New Description',
        price: 1500,
        categoryId: '1',
      });
    });

    expect(result.current.products).toHaveLength(2);
  });

  it('handles error when fetching products', async () => {
    const errorMock = [
      {
        request: {
          query: GET_PRODUCTS_QUERY,
          variables: {
            input: {
              pagination: {
                pageSize: 10,
                pageNumber: 1,
              },
            },
          },
        },
        error: new Error('Failed to fetch products'),
      },
    ];

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={errorMock} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result } = renderHook(() => useProducts(), { wrapper });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Failed to fetch products');
    expect(result.current.products).toEqual([]);
  });

  it('loads more products', async () => {
    const loadMoreMock = [
      {
        request: {
          query: GET_PRODUCTS_QUERY,
          variables: {
            input: {
              pagination: {
                pageSize: 10,
                pageNumber: 1,
              },
            },
          },
        },
        result: {
          data: {
            products: {
              getMany: {
                data: mockProducts,
                pagination: {
                  pageSize: 10,
                  pageNumber: 1,
                  total: 3,
                },
                sorting: {
                  type: 'ASC',
                  field: 'name',
                },
              },
            },
          },
        },
      },
      {
        request: {
          query: GET_PRODUCTS_QUERY,
          variables: {
            input: {
              pagination: {
                pageSize: 10,
                pageNumber: 2,
              },
            },
          },
        },
        result: {
          data: {
            products: {
              getMany: {
                data: [
                  {
                    id: '3',
                    name: 'Test Product 3',
                    photo: 'https://example.com/photo3.jpg',
                    desc: 'Test Description 3',
                    price: 3000,
                    category: {
                      id: '1',
                      name: 'Test Category 1',
                    },
                    createdAt: '2024-01-01T00:00:00.000Z',
                    updatedAt: '2024-01-01T00:00:00.000Z',
                  },
                ],
                pagination: {
                  pageSize: 10,
                  pageNumber: 2,
                  total: 3,
                },
                sorting: {
                  type: 'ASC',
                  field: 'name',
                },
              },
            },
          },
        },
      },
    ];

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={loadMoreMock} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result } = renderHook(() => useProducts(), { wrapper });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.products).toEqual(mockProducts);

    await act(async () => {
      await result.current.loadMore();
    });

    expect(result.current.products).toHaveLength(3);
    expect(result.current.products[2]).toEqual({
      id: '3',
      name: 'Test Product 3',
      photo: 'https://example.com/photo3.jpg',
      desc: 'Test Description 3',
      price: 3000,
      category: {
        id: '1',
        name: 'Test Category 1',
      },
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    });
  });
}); 