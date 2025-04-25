import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login as loginApi, register as registerApi } from '../api/auth';

export const useAuth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      const response = await loginApi(email, password);
      
      if (response.token) {
        localStorage.setItem('token', response.token);
        navigate('/profile');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error instanceof Error ? error.message : 'Ошибка авторизации');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (email: string, password: string, name: string) => {
    try {
      setError(null);
      setLoading(true);
      const response = await registerApi(email, password);
      
      if (response.token) {
        localStorage.setItem('token', response.token);
        navigate('/profile');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error instanceof Error ? error.message : 'Ошибка регистрации');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return {
    loading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
}; 