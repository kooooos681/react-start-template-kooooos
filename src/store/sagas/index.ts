import { all } from 'redux-saga/effects';
import { watchAuth } from './authSaga';
import { watchProfile } from './profileSaga';
import { watchProducts } from './productsSaga';
import { watchCart } from './cartSaga';
import { watchApp } from './appSaga';

export function* rootSaga() {
  yield all([
    watchAuth(),
    watchProfile(),
    watchProducts(),
    watchCart(),
    watchApp(),
  ]);
} 