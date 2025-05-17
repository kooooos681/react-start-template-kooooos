import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface RegisterState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  commandId: string;
}

const initialState: RegisterState = {
  loading: false,
  error: null,
  success: false,
};

const registerSagaSlice = createSlice({
  name: 'registerSaga',
  initialState,
  reducers: {
    registerRequest: (state, action: PayloadAction<RegisterCredentials>) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    registerSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
});

export const { registerRequest, registerSuccess, registerFailure, clearError, clearSuccess } = registerSagaSlice.actions;

export default registerSagaSlice.reducer; 