import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BasketRow from './BasketRow';

describe('BasketRow', () => {
  const mockProps = {
    id: '1',
    title: 'Test Product',
    price: 100,
    count: 2,
    onRemove: jest.fn(),
    onIncrement: jest.fn(),
    onDecrement: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders product information correctly', () => {
    render(<BasketRow {...mockProps} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('100 ₽')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('calls onRemove when remove button is clicked', () => {
    render(<BasketRow {...mockProps} />);
    
    fireEvent.click(screen.getByText('Удалить'));
    expect(mockProps.onRemove).toHaveBeenCalledWith('1');
  });

  it('calls onIncrement when increment button is clicked', () => {
    render(<BasketRow {...mockProps} />);
    
    fireEvent.click(screen.getByText('+'));
    expect(mockProps.onIncrement).toHaveBeenCalledWith('1');
  });

  it('calls onDecrement when decrement button is clicked', () => {
    render(<BasketRow {...mockProps} />);
    
    fireEvent.click(screen.getByText('-'));
    expect(mockProps.onDecrement).toHaveBeenCalledWith('1');
  });
}); 