import React from 'react';
import { User, UserType } from '../models/User';
import { Product, ProductType } from '../models/Product';

interface AccountServiceProps {
  user: User;
  product: Product;
}

const userDiscounts: Record<UserType, number> = {
  [UserType.Standard]: 5,
  [UserType.Premium]: 10,
  [UserType.Gold]: 15,
  [UserType.Free]: 0,
};

const productDiscounts: Record<UserType, Partial<Record<ProductType, number>>> = {
  [UserType.Standard]: { [ProductType.Car]: 5 },
  [UserType.Premium]: { [ProductType.Food]: 7 },
  [UserType.Gold]: { [ProductType.Toy]: 10 },
  [UserType.Free]: {},
};

export const AccountService: React.FC<AccountServiceProps> = ({ user, product }) => {
  const getDiscount = (): number => {
    const userDiscount = userDiscounts[user.type] || 0;
    const productDiscount = productDiscounts[user.type]?.[product.type] || 0;
    return userDiscount + productDiscount;
  };

  return (
    <div>
      <h2>Скидка для {user.type}</h2>
      <p>Товар: {product.type}</p>
      <p>Общая скидка: {getDiscount()}%</p>
    </div>
  );
};
