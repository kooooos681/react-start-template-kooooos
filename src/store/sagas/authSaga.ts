import { takeLatest, put, delay } from 'redux-saga/effects';
import { loginRequest, loginSuccess, loginFailure, setAdmin } from '../slices/authSlice';

// Имитация API запроса
function* handleLogin() {
  try {
    // Имитируем задержку запроса
    yield delay(1000);
    
    // Генерируем фейковый токен
    const token = `fake-token-${Date.now()}`;
    
    // Имитируем успешный вход
    yield put(loginSuccess(token));
    
    // Случайным образом определяем, является ли пользователь админом
    yield put(setAdmin(Math.random() > 0.5));
    
  } catch (error) {
    yield put(loginFailure(error instanceof Error ? error.message : 'Unknown error'));
  }
}

export function* watchAuth() {
  yield takeLatest(loginRequest.type, handleLogin);
} 