import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginRequest } from '../store/slices/authSlice';
import '../styles/LoginPage.css';

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error } = useAppSelector((state) => state.auth);

  const from = location.state?.from?.pathname || '/';

  const handleLogin = () => {
    dispatch(loginRequest());
    navigate(from, { replace: true });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Вход в систему</h1>
        {error && <div className="error">{error}</div>}
        <button onClick={handleLogin} disabled={loading}>
          {loading ? 'Загрузка...' : 'Войти'}
        </button>
      </div>
    </div>
  );
};

export default LoginPage; 