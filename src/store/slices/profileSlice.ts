import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  data: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  data: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    fetchProfileRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProfileSuccess: (state, action: PayloadAction<ProfileState['data']>) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchProfileFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearProfile: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  fetchProfileRequest,
  fetchProfileSuccess,
  fetchProfileFailure,
  clearProfile,
} = profileSlice.actions;

export default profileSlice.reducer; 