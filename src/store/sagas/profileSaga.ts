import { takeLatest, put, call, select } from 'redux-saga/effects';
import {
  fetchProfileRequest,
  fetchProfileSuccess,
  fetchProfileFailure,
  clearProfile,
} from '../slices/profileSlice';
import { RootState } from '../types';
import { ApiError } from '../../api/types';
import type { User } from '../../store/baseTypes';

function* handleFetchProfile() {
  try {
    const token: string | null = yield select((state: RootState) => state.auth.token);
    
    if (!token) {
      yield put(clearProfile());
      return;
    }

    const response: Response = yield call(fetch, `${process.env.REACT_APP_API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    const profile: User = yield call([response, 'json']);
    yield put(fetchProfileSuccess(profile));
  } catch (error) {
    const apiError = error as ApiError;
    yield put(fetchProfileFailure(apiError.message));
  }
}

export function* watchProfile() {
  yield takeLatest(fetchProfileRequest.type, handleFetchProfile);
} 