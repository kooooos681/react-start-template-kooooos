import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProfile, Profile } from '../store/slices/profileSlice';
import { apiClient } from '../api/client';

export function useProfile() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.profile);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  useEffect(() => {
    if (!data) {
      dispatch(fetchProfile());
    }
  }, [dispatch, data]);

  const updateProfile = async (name: string) => {
    setUpdateLoading(true);
    setUpdateError(null);
    try {
      await apiClient.patch<Profile>('/profile', { name });
      await dispatch(fetchProfile()).unwrap();
      return true;
    } catch (e: any) {
      setUpdateError(e.message || 'Ошибка обновления профиля');
      return false;
    } finally {
      setUpdateLoading(false);
    }
  };

  const changePassword = async (password: string, newPassword: string) => {
    setPasswordLoading(true);
    setPasswordError(null);
    setPasswordSuccess(false);
    try {
      const res = await apiClient.post<{ success: boolean }>('/profile/change-password', { password, newPassword });
      setPasswordSuccess(res.success);
    } catch (e: any) {
      setPasswordError(e.message || 'Ошибка смены пароля');
    } finally {
      setPasswordLoading(false);
    }
  };

  return {
    profile: data,
    loading,
    error,
    reload: () => dispatch(fetchProfile()),
    updateProfile,
    updateLoading,
    updateError,
    changePassword,
    passwordLoading,
    passwordError,
    passwordSuccess,
  };
} 