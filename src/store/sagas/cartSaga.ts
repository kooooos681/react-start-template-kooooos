import { takeLatest, put, select } from 'redux-saga/effects';
import { addToCart, removeFromCart, updateQuantity } from '../slices/cartSlice';
import { RootState } from '../index';

// Сохранение корзины в localStorage
function* handleCartChange() {
  const cart: RootState['cart'] = yield select((state: RootState) => state.cart);
  localStorage.setItem('cart', JSON.stringify(cart.items));
}

export function* watchCart() {
  yield takeLatest(
    [addToCart.type, removeFromCart.type, updateQuantity.type],
    handleCartChange
  );
} 