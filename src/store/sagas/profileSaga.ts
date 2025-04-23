import { takeLatest, put, delay, select } from 'redux-saga/effects';
import {
  fetchProfileRequest,
  fetchProfileSuccess,
  fetchProfileFailure,
  clearProfile,
} from '../slices/profileSlice';
import { RootState } from '../index';

// Имитация API запроса
function* handleFetchProfile() {
  try {
    // Проверяем наличие токена
    const token: string | null = yield select((state: RootState) => state.auth.token);
    
    if (!token) {
      yield put(clearProfile());
      return;
    }

    // Имитируем задержку запроса
    yield delay(1000);
    
    // Генерируем фейковые данные профиля
    const fakeProfile = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://via.placeholder.com/150',
    };
    
    yield put(fetchProfileSuccess(fakeProfile));
  } catch (error) {
    yield put(fetchProfileFailure(error instanceof Error ? error.message : 'Unknown error'));
  }
}

export function* watchProfile() {
  yield takeLatest(fetchProfileRequest.type, handleFetchProfile);
} 