import { takeLatest, put, call, select } from 'redux-saga/effects';
import { addToCart, removeFromCart, updateQuantity } from '../slices/cartSlice';
import { ordersService } from '../../api/services';
import { RootState } from '../types';
import { ApiError, CartItem } from '../../api/types';

// Сохранение корзины в localStorage
function* handleCartChange(): Generator<any, void, any> {
  try {
    const cart: RootState['cart'] = yield select((state: RootState) => state.cart);
    const productIds = cart.items.map((item: CartItem) => item.id);
    
    if (productIds.length > 0) {
      yield call(ordersService.createOrder, productIds);
    }
  } catch (error) {
    const apiError = error as ApiError;
    console.error('Failed to sync cart with server:', apiError.message);
  }
}

export function* watchCart() {
  yield takeLatest(
    [addToCart.type, removeFromCart.type, updateQuantity.type],
    handleCartChange
  );
} 