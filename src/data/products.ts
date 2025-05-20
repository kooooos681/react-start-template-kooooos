import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Product 1',
    desc: 'Description for product 1',
    price: 1000,
    oldPrice: 1200,
    photo: 'https://via.placeholder.com/150',
    category: {
      id: '1',
      name: 'Category 1',
      photo: 'https://via.placeholder.com/150'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Product 2',
    desc: 'Description for product 2',
    price: 2000,
    photo: 'https://via.placeholder.com/150',
    category: {
      id: '1',
      name: 'Category 1',
      photo: 'https://via.placeholder.com/150'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Product 3',
    desc: 'Description for product 3',
    price: 3000,
    oldPrice: 3500,
    photo: 'https://via.placeholder.com/150',
    category: {
      id: '2',
      name: 'Category 2',
      photo: 'https://via.placeholder.com/150'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]; 