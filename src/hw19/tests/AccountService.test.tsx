import React from 'react';
import { render, screen } from '@testing-library/react';
import { AccountService } from '../components/AccountService';
import { User, UserType } from '../models/User';
import { Product, ProductType } from '../models/Product';
import '@testing-library/jest-dom';

describe('AccountService', () => {
  it('правильно рассчитывает скидку для Premium пользователя и Food', () => {
    const user = new User('2', UserType.Premium);
    const product = new Product('102', ProductType.Food);

    render(<AccountService user={user} product={product} />);
    expect(screen.getByText('Общая скидка: 17%')).toBeInTheDocument();
  });

  it('правильно рассчитывает скидку для Standard пользователя и Car', () => {
    const user = new User('1', UserType.Standard);
    const product = new Product('101', ProductType.Car);

    render(<AccountService user={user} product={product} />);
    expect(screen.getByText('Общая скидка: 10%')).toBeInTheDocument();
  });

  it('правильно рассчитывает скидку для Free пользователя', () => {
    const user = new User('4', UserType.Free);
    const product = new Product('104', ProductType.Car);

    render(<AccountService user={user} product={product} />);
    expect(screen.getByText('Общая скидка: 0%')).toBeInTheDocument();
  });
});
