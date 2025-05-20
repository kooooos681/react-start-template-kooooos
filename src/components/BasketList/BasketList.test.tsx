import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import BasketList from './BasketList';
import cartReducer from '../../store/slices/cartSlice';
import { BasketRowProps } from '../BasketRow/BasketRow';

const mockBasketItems: BasketRowProps[] = [
  {
    id: '1',
    title: 'Test Product 1',
    price: 100,
    count: 2,
    onRemove: jest.fn(),
    onIncrement: jest.fn(),
    onDecrement: jest.fn(),
  },
  {
    id: '2',
    title: 'Test Product 2',
    price: 200,
    count: 1,
    onRemove: jest.fn(),
    onIncrement: jest.fn(),
    onDecrement: jest.fn(),
  },
];

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: {
      cart: {
        items: mockBasketItems.map(item => ({ id: item.id, quantity: item.count })),
        loading: false,
        error: null,
        ...initialState,
      },
    },
  });
};

describe('BasketList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders cart items correctly', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <BasketList products={mockBasketItems} />
      </Provider>
    );

    // Check if all products are rendered
    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();

    // Check quantities
    expect(screen.getByText('2')).toBeInTheDocument(); // Quantity for Product 1
    expect(screen.getByText('1')).toBeInTheDocument(); // Quantity for Product 2

    // Check prices
    expect(screen.getByText('100 ₽')).toBeInTheDocument();
    expect(screen.getByText('200 ₽')).toBeInTheDocument();
  });

  it('handles empty cart', () => {
    const store = createMockStore({ items: [] });
    render(
      <Provider store={store}>
        <BasketList products={[]} />
      </Provider>
    );

    expect(screen.getByText('Корзина пуста')).toBeInTheDocument();
  });

  it('handles quantity changes', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <BasketList products={mockBasketItems} />
      </Provider>
    );

    // Find quantity controls for first product
    const decreaseButton = screen.getAllByText('-')[0];
    const increaseButton = screen.getAllByText('+')[0];

    // Decrease quantity
    fireEvent.click(decreaseButton);
    expect(mockBasketItems[0].onDecrement).toHaveBeenCalledWith('1');

    // Increase quantity
    fireEvent.click(increaseButton);
    expect(mockBasketItems[0].onIncrement).toHaveBeenCalledWith('1');
  });

  it('handles item removal', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <BasketList products={mockBasketItems} />
      </Provider>
    );

    // Find remove button for first product
    const removeButton = screen.getAllByText('Удалить')[0];

    // Remove item
    fireEvent.click(removeButton);
    expect(mockBasketItems[0].onRemove).toHaveBeenCalledWith('1');
  });

  it('calculates total correctly', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <BasketList products={mockBasketItems} />
      </Provider>
    );

    // Calculate expected total
    const total = mockBasketItems.reduce((sum, item) => sum + item.price * item.count, 0);

    expect(screen.getByText(`${total} ₽`)).toBeInTheDocument();
  });
}); 