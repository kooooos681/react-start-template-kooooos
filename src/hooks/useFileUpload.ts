import { useState } from 'react';
import { uploadService } from '../api/services/upload';

export const useFileUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const uploadFile = async (file: File): Promise<{ url: string }> => {
    try {
      setLoading(true);
      setError(null);
      setProgress(0);

      const result = await uploadService.uploadFileWithProgress(file, (loaded, total) => {
        setProgress(Math.round((loaded / total) * 100));
      });

      return result;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ошибка загрузки файла');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    uploadFile,
    loading,
    error,
    progress,
  };
}; 