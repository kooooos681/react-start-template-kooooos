import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductList from './ProductList';
import { Product } from '../../types/product';

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

describe('ProductList', () => {
  const mockOnAddToCart = jest.fn();
  const mockOnProductClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders products correctly', () => {
    render(
      <ProductList
        products={mockProducts}
        onAddToCart={mockOnAddToCart}
        onProductClick={mockOnProductClick}
      />
    );

    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    expect(screen.getByText('Test Description 1')).toBeInTheDocument();
    expect(screen.getByText('Test Description 2')).toBeInTheDocument();
    expect(screen.getByText('1000 ₽')).toBeInTheDocument();
    expect(screen.getByText('2000 ₽')).toBeInTheDocument();
    expect(screen.getByText('1200 ₽')).toBeInTheDocument();
    expect(screen.getByText('Категория: Test Category 1')).toBeInTheDocument();
    expect(screen.getByText('Категория: Test Category 2')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(
      <ProductList
        products={[]}
        onAddToCart={mockOnAddToCart}
        onProductClick={mockOnProductClick}
        loading={true}
      />
    );

    expect(screen.getByText('Загрузка...')).toBeInTheDocument();
  });

  it('shows error state', () => {
    const errorMessage = 'Failed to load products';
    render(
      <ProductList
        products={[]}
        onAddToCart={mockOnAddToCart}
        onProductClick={mockOnProductClick}
        error={errorMessage}
      />
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('shows empty state', () => {
    render(
      <ProductList
        products={[]}
        onAddToCart={mockOnAddToCart}
        onProductClick={mockOnProductClick}
      />
    );

    expect(screen.getByText('Товары не найдены')).toBeInTheDocument();
  });
}); 