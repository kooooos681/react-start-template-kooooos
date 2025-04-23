import { takeLatest, put, call } from 'redux-saga/effects';
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
} from '../slices/productsSlice';
import { productsService } from '../../api/services';
import { ApiError } from '../../api/types';
import type { Product } from '../../store/baseTypes';

function* handleFetchProducts(): Generator<unknown, void, Product[]> {
  try {
    const products = yield call(productsService.getProducts);
    yield put(fetchProductsSuccess(products));
  } catch (error) {
    const apiError = error as ApiError;
    yield put(fetchProductsFailure(apiError.message));
  }
}

export function* watchProducts() {
  yield takeLatest(fetchProductsRequest.type, handleFetchProducts);
} 