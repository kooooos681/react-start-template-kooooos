import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from 'src/api/client';

export type Profile = {
  id: string;
  name: string;
  email: string;
  signUpDate: string;
  commandId?: string;
};

interface ProfileState {
  data: Profile | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk<Profile>(
  'profile/fetchProfile',
  async () => {
    return await apiClient.get<Profile>('/profile');
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки профиля';
      });
  },
});

export const { clearProfile } = profileSlice.actions;

export default profileSlice.reducer; 