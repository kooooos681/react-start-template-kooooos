import { useMutation, useQuery } from '@apollo/client';
import { GET_PROFILE_QUERY, UPDATE_PROFILE_MUTATION, UPLOAD_AVATAR_MUTATION } from '../api/graphql/profile';
import { uploadService } from '../api/services/upload';

export interface Profile {
  id: string;
  email: string;
  name: string;
  avatar: string;
}

export interface UpdateProfileInput {
  name?: string;
  email?: string;
}

export const useProfile = () => {
  const { data, loading: profileLoading, error: profileError } = useQuery(GET_PROFILE_QUERY);
  const [updateProfile, { loading: updateLoading }] = useMutation(UPDATE_PROFILE_MUTATION);
  const [uploadAvatar, { loading: uploadLoading }] = useMutation(UPLOAD_AVATAR_MUTATION);

  const handleUpdateProfile = async (input: UpdateProfileInput) => {
    try {
      const { data } = await updateProfile({
        variables: { input },
        refetchQueries: [{ query: GET_PROFILE_QUERY }],
      });
      return data.updateProfile;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const handleUploadAvatar = async (file: File) => {
    try {
      // Сначала загружаем файл на сервер
      const { url } = await uploadService.uploadFile(file);
      
      // Затем обновляем профиль с новым URL аватара
      const { data } = await uploadAvatar({
        variables: { file },
        refetchQueries: [{ query: GET_PROFILE_QUERY }],
      });
      
      return data.uploadAvatar;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      throw error;
    }
  };

  return {
    profile: data?.me,
    loading: profileLoading || updateLoading || uploadLoading,
    error: profileError,
    updateProfile: handleUpdateProfile,
    uploadAvatar: handleUploadAvatar,
  };
}; 