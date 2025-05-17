import { takeLatest, put, call } from 'redux-saga/effects';
import { registerRequest, registerSuccess, registerFailure } from '../slices/registerSagaSlice';
import { register, RegisterResponse, ApiError } from '../../api/auth';

function* handleRegister(action: ReturnType<typeof registerRequest>): Generator<unknown, void, RegisterResponse> {
  try {
    console.log('Starting registration with:', action.payload);
    const { email, password, commandId } = action.payload;
    const response = yield call(register, email, password, commandId);
    console.log('Registration response:', response);
    
    // Сохраняем токен в localStorage
    if (response.token) {
      localStorage.setItem('token', response.token);
    }
    
    yield put(registerSuccess());
  } catch (error) {
    console.error('Registration error:', error);
    if (error instanceof ApiError) {
      yield put(registerFailure(error.message));
    } else if (error instanceof Error) {
      yield put(registerFailure(error.message));
    } else {
      yield put(registerFailure('Произошла неизвестная ошибка'));
    }
  }
}

export function* watchRegister(): Generator<unknown, void, unknown> {
  yield takeLatest(registerRequest.type, handleRegister);
} 