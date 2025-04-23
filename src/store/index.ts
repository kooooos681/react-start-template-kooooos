import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas';
import authReducer from './slices/authSlice';
import appReducer from './slices/appSlice';
import profileReducer from './slices/profileSlice';
import cartReducer from './slices/cartSlice';
import productsReducer from './slices/productsSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
    profile: profileReducer,
    cart: cartReducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 