import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useCart } from './useCart';
import cartReducer from '../store/slices/cartSlice';
import { Product } from '../types/product';

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

const createMockStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: {
      cart: {
        items: [],
        loading: false,
        error: null,
        ...preloadedState,
      },
    },
  });
};

describe('useCart', () => {
  it('adds item to cart', () => {
    const store = createMockStore();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toEqual({
      id: mockProduct.id,
      name: mockProduct.name,
      price: mockProduct.price,
      quantity: 1,
    });
    expect(result.current.total).toBe(mockProduct.price);
  });

  it('increments item quantity when adding existing item', () => {
    const store = createMockStore({
      items: [
        {
          id: mockProduct.id,
          name: mockProduct.name,
          price: mockProduct.price,
          quantity: 1,
        },
      ],
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.total).toBe(mockProduct.price * 2);
  });

  it('removes item from cart', () => {
    const store = createMockStore({
      items: [
        {
          id: mockProduct.id,
          name: mockProduct.name,
          price: mockProduct.price,
          quantity: 1,
        },
      ],
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.removeFromCart(mockProduct.id);
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.total).toBe(0);
  });

  it('updates item quantity', () => {
    const store = createMockStore({
      items: [
        {
          id: mockProduct.id,
          name: mockProduct.name,
          price: mockProduct.price,
          quantity: 1,
        },
      ],
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.updateQuantity(mockProduct.id, 3);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(3);
    expect(result.current.total).toBe(mockProduct.price * 3);
  });

  it('clears cart', () => {
    const store = createMockStore({
      items: [
        {
          id: mockProduct.id,
          name: mockProduct.name,
          price: mockProduct.price,
          quantity: 1,
        },
      ],
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.total).toBe(0);
  });

  it('calculates total correctly with multiple items', () => {
    const store = createMockStore({
      items: [
        {
          id: '1',
          name: 'Product 1',
          price: 1000,
          quantity: 2,
        },
        {
          id: '2',
          name: 'Product 2',
          price: 2000,
          quantity: 1,
        },
      ],
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

 