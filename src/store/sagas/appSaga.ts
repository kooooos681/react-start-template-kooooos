import { takeLatest, put, call } from 'redux-saga/effects';
import { initializeApp } from '../slices/appSlice';
import { fetchProfileRequest } from '../slices/profileSlice';
import { fetchProductsRequest } from '../slices/productsSlice';

// Функция для синхронизации токена между вкладками
function setupTokenSync() {
  window.addEventListener('storage', (event) => {
    if (event.key === 'token') {
      // Перезагружаем страницу для обновления состояния
      window.location.reload();
    }
  });
}

function* handleInitializeApp() {
  // Устанавливаем слушатель для синхронизации токена
  yield call(setupTokenSync);
  
  // Загружаем профиль, если есть токен
  yield put(fetchProfileRequest());
  
  // Загружаем список продуктов
  yield put(fetchProductsRequest());
}

export function* watchApp() {
  yield takeLatest(initializeApp.type, handleInitializeApp);
} 