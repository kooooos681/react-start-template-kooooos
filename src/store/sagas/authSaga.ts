import { takeLatest, put, call } from 'redux-saga/effects';
import { loginRequest, loginSuccess, loginFailure, setAdmin } from '../slices/authSlice';
import { authService } from '../../api/services';
import { ApiError, LoginCredentials } from '../../api/types';

function* handleLogin(action: ReturnType<typeof loginRequest>): Generator<any, void, any> {
  try {
    const { email, password } = action.payload as LoginCredentials;
    const response = yield call(authService.login, { email, password });
    
    localStorage.setItem('token', response.token);
    yield put(loginSuccess(response.token));
    yield put(setAdmin(response.user.role === 'ADMIN'));
  } catch (error) {
    const apiError = error as ApiError;
    yield put(loginFailure(apiError.message));
  }
}

export function* watchAuth() {
  yield takeLatest(loginRequest.type, handleLogin);
} 