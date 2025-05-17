import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginRequest, loginSuccess, loginFailure } from '../store/slices/authSlice';
import { login } from '../api/auth';
import '../styles/LoginPage.css';

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const from = location.state?.from?.pathname || '/';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginRequest());
    
    try {
      const response = await login(formData.email, formData.password);
      dispatch(loginSuccess(response.token));
      navigate(from, { replace: true });
    } catch (err) {
      dispatch(loginFailure(err instanceof Error ? err.message : 'Ошибка авторизации'));
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1 className="profile-title">Вход в систему</h1>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              className="input"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={loading} className="button button-primary">
            {loading ? 'Загрузка...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage; 