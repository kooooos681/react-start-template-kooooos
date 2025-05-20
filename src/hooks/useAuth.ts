import { useState, useEffect, useCallback } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { LOGIN_MUTATION, REGISTER_MUTATION, GET_CURRENT_USER_QUERY } from '../api/graphql/auth';

interface Profile {
  id: string;
  email: string;
  name: string | null;
  signUpDate: string;
  commandId: string;
}

interface AuthState {
  user: Profile | null;
  loading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const [registerMutation] = useMutation(REGISTER_MUTATION);
  const { refetch: fetchCurrentUser } = useQuery(GET_CURRENT_USER_QUERY, {
    skip: true, // Skip initial query, we'll call it manually
  });

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const { data } = await loginMutation({
          variables: { email, password },
        });
        const { token, profile } = data.profile.signin;
        localStorage.setItem('token', token);
        setState({ user: profile, loading: false, error: null });
        alert('Вы успешно авторизованы!');
      } catch (error) {
        setState({
          user: null,
          loading: false,
          error: error instanceof Error ? error.message : 'An error occurred',
        });
      }
    },
    [loginMutation]
  );

  const register = useCallback(
    async (email: string, password: string, name: string) => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const { data } = await registerMutation({
          variables: { email, password, commandId: 'hw-29' },
        });
        const { token, profile } = data.profile.signup;
        localStorage.setItem('token', token);
        setState({ user: profile, loading: false, error: null });
        alert('Вы успешно зарегистрированы!');
      } catch (error) {
        setState({
          user: null,
          loading: false,
          error: error instanceof Error ? error.message : 'An error occurred',
        });
      }
    },
    [registerMutation]
  );

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setState({ user: null, loading: false, error: null });
  }, []);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setState((prev) => ({ ...prev, loading: false }));
        return;
      }

      try {
        const { data, error } = await fetchCurrentUser();
        if (error) {
          throw error;
        }
        if (data?.profile) {
          setState({ user: data.profile, loading: false, error: null });
        } else {
          throw new Error('Invalid token');
        }
      } catch (error) {
        localStorage.removeItem('token');
        setState({
          user: null,
          loading: false,
          error: error instanceof Error ? error.message : 'Invalid token',
        });
      }
    };

    validateToken();
  }, [fetchCurrentUser]);

  return {
    ...state,
    login,
    register,
    logout,
  };
}; 