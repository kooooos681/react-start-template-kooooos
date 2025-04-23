import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface RegisterState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

interface RegisterCredentials {
  email: string;
  password: string;
}

const initialState: RegisterState = {
  loading: false,
  error: null,
  success: false,
};

export const registerUser = createAsyncThunk(
  'register/registerUser',
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      const response = await fetch('https://api.example.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Ошибка при регистрации');
      }

      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Произошла ошибка');
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearSuccess } = registerSlice.actions;
export default registerSlice.reducer; 