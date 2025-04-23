import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  isAdmin: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      localStorage.setItem('token', action.payload);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('token');
    },
    setAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout, setAdmin } = authSlice.actions;

export default authSlice.reducer; 