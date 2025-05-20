import axios from 'axios';

const API_URL = 'http://cea3c11a3f62.vps.myjino.ru/api';

class UploadService {
  private getAuthHeader() {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async uploadFile(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          ...this.getAuthHeader(),
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.errors) {
          const serverError = error.response.data.errors[0];
          throw new Error(serverError.message);
        }
        throw new Error(error.message);
      }
      throw error;
    }
  }

  async uploadFileWithProgress(
    file: File,
    onProgress: (loaded: number, total: number) => void
  ): Promise<{ url: string }> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      formData.append('file', file);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          onProgress(event.loaded, event.total);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch (error) {
            reject(new Error('Ошибка при разборе ответа сервера'));
          }
        } else {
          try {
            const error = JSON.parse(xhr.responseText);
            reject(new Error(error.errors?.[0]?.message || 'Ошибка загрузки файла'));
          } catch {
            reject(new Error('Ошибка загрузки файла'));
          }
        }
      };

      xhr.onerror = () => {
        reject(new Error('Ошибка сети'));
      };

      xhr.open('POST', `${API_URL}/upload`);
      xhr.setRequestHeader('Authorization', this.getAuthHeader().Authorization || '');
      xhr.send(formData);
    });
  }
}

export const uploadService = new UploadService(); 