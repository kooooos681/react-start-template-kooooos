import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas';
import authReducer from './slices/authSlice';
import appReducer from './slices/appSlice';
import profileReducer from './slices/profileSlice';
import cartReducer from './slices/cartSlice';
import productsReducer from './slices/productsSlice';
import { logger } from './middleware/logger';
import type { RootState } from './types';
import { authApi } from './api/authApi';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
    profile: profileReducer,
    cart: cartReducer,
    products: productsReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware, logger, authApi.middleware),
});

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch;
export { type RootState }; 