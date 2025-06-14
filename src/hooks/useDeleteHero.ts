import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/axios';

export const useDeleteHero = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => await api.delete(`/heroes/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['heroes'] });
    },
  });
};
