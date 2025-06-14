import { useMutation } from '@tanstack/react-query';
import { api } from '../lib/axios';

export const useDeleteImage = () => {
  return useMutation({
    mutationFn: async ({ heroId, imageName }: { heroId: string; imageName: string }) => {
      await api.delete(`/heroes/${heroId}/images/${imageName}`);
    },
  });
};
