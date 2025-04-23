export const AUTH_ACTIONS = {
  LOGIN_REQUEST: 'auth/loginRequest',
  LOGIN_SUCCESS: 'auth/loginSuccess',
  LOGIN_FAILURE: 'auth/loginFailure',
  LOGOUT: 'auth/logout',
  SET_ADMIN: 'auth/setAdmin',
} as const;

export const PROFILE_ACTIONS = {
  FETCH_REQUEST: 'profile/fetchRequest',
  FETCH_SUCCESS: 'profile/fetchSuccess',
  FETCH_FAILURE: 'profile/fetchFailure',
  CLEAR: 'profile/clear',
} as const;

export const PRODUCTS_ACTIONS = {
  FETCH_REQUEST: 'products/fetchRequest',
  FETCH_SUCCESS: 'products/fetchSuccess',
  FETCH_FAILURE: 'products/fetchFailure',
} as const;

export const CART_ACTIONS = {
  ADD_ITEM: 'cart/addItem',
  REMOVE_ITEM: 'cart/removeItem',
  UPDATE_QUANTITY: 'cart/updateQuantity',
  CLEAR: 'cart/clear',
} as const;

export const APP_ACTIONS = {
  INITIALIZE: 'app/initialize',
} as const; 