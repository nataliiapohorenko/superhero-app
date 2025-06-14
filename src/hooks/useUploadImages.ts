import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/axios';

export const useUploadImages = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: FormData }) => {
      const res = await api.post(`/heroes/${id}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['hero', variables.id] });
    },
  });
};
