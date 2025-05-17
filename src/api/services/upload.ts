import axios from 'axios';
import { API_CONFIG } from '../config';
import { ApiError } from '../auth';

export const uploadService = {
  async uploadFile(file: File): Promise<{ url: string }> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post<{ url: string }>(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.UPLOAD}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
          },
          withCredentials: false,
        }
      );

      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new ApiError(`Ошибка при загрузке файла: ${error.message}`);
      }
      throw new ApiError('Произошла неизвестная ошибка');
    }
  },
}; 