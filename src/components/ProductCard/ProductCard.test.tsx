import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';
import { Product } from '../../types/product';

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  photo: 'https://example.com/photo.jpg',
  desc: 'Test Description',
  price: 1000,
  oldPrice: 1200,
  category: {
    id: '1',
    name: 'Test Category',
  },
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};

describe('ProductCard', () => {
  const mockOnAddToCart = jest.fn();
  const mockOnProductClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders product information correctly', () => {
    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={mockOnAddToCart}
        onProductClick={mockOnProductClick}
      />
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('1000 ₽')).toBeInTheDocument();
    expect(screen.getByText('1200 ₽')).toBeInTheDocument();
    expect(screen.getByText('Категория: Test Category')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://example.com/photo.jpg'
    );
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Test Product');
  });

  it('renders product without old price', () => {
    const productWithoutOldPrice: Product = {
      ...mockProduct,
      oldPrice: undefined,
    };

    render(
      <ProductCard
        product={productWithoutOldPrice}
        onAddToCart={mockOnAddToCart}
        onProductClick={mockOnProductClick}
      />
    );

    expect(screen.getByText('1000 ₽')).toBeInTheDocument();
    expect(screen.queryByText('1200 ₽')).not.toBeInTheDocument();
  });

  it('renders product with placeholder image when photo is not provided', () => {
    const productWithoutPhoto: Product = {
      ...mockProduct,
      photo: undefined,
    };

    render(
      <ProductCard
        product={productWithoutPhoto}
        onAddToCart={mockOnAddToCart}
        onProductClick={mockOnProductClick}
      />
    );

    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://via.placeholder.com/150'
    );
  });

  it('calls onAddToCart when add to cart button is clicked', () => {
    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={mockOnAddToCart}
        onProductClick={mockOnProductClick}
      />
    );

    const addToCartButton = screen.getByText('В корзину');
    fireEvent.click(addToCartButton);

    expect(mockOnAddToCart).toHaveBeenCalledWith('1');
    expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
  });

  it('calls onProductClick when product card is clicked', () => {
    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={mockOnAddToCart}
        onProductClick={mockOnProductClick}
      />
    );

    const productCard = screen.getByRole('article');
    fireEvent.click(productCard);

    expect(mockOnProductClick).toHaveBeenCalledWith(mockProduct);
    expect(mockOnProductClick).toHaveBeenCalledTimes(1);
  });

  it('stops event propagation when clicking add to cart button', () => {
    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={mockOnAddToCart}
        onProductClick={mockOnProductClick}
      />
    );

    const addToCartButton = screen.getByText('В корзину');
    fireEvent.click(addToCartButton);

    expect(mockOnAddToCart).toHaveBeenCalledWith('1');
    expect(mockOnProductClick).not.toHaveBeenCalled();
  });
}); 