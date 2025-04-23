import { takeLatest, put, delay } from 'redux-saga/effects';
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  Product,
} from '../slices/productsSlice';

// Фейковые данные продуктов
const fakeProducts: Product[] = [
  {
    id: '1',
    name: 'Laptop',
    price: 999.99,
    description: 'Powerful laptop for work and gaming',
    image: 'https://via.placeholder.com/200',
  },
  {
    id: '2',
    name: 'Smartphone',
    price: 599.99,
    description: 'Latest smartphone with great camera',
    image: 'https://via.placeholder.com/200',
  },
  {
    id: '3',
    name: 'Headphones',
    price: 99.99,
    description: 'Wireless headphones with noise cancellation',
    image: 'https://via.placeholder.com/200',
  },
];

// Имитация API запроса
function* handleFetchProducts() {
  try {
    // Имитируем задержку запроса
    yield delay(1000);
    
    yield put(fetchProductsSuccess(fakeProducts));
  } catch (error) {
    yield put(fetchProductsFailure(error instanceof Error ? error.message : 'Unknown error'));
  }
}

export function* watchProducts() {
  yield takeLatest(fetchProductsRequest.type, handleFetchProducts);
} 