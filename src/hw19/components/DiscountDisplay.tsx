import React from 'react';
import { User, UserType } from '../models/User';
import { Product, ProductType } from '../models/Product';
import { AccountService } from './AccountService';

export const DiscountDisplay: React.FC = () => {
  const user = new User('1', UserType.Premium);
  const product = new Product('101', ProductType.Food);

  return (
    <div>
      <h1>Расчет скидки</h1>
      <AccountService user={user} product={product} />
    </div>
  );
};
