import { Middleware, AnyAction } from '@reduxjs/toolkit';
import type { RootState } from '../types';

export const logger: Middleware<{}, RootState> = (store) => (next) => (action: AnyAction) => {
  if (process.env.NODE_ENV === 'development') {
    console.group(action.type);
    console.info('dispatching', action);
    const result = next(action);
    console.log('next state', store.getState());
    console.groupEnd();
    return result;
  }
  return next(action);
}; 