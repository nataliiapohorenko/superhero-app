import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/axios';
import type { Superhero } from '../types/superhero';

export const useUpdateHero = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (heroData: Omit<Superhero, 'id' | 'images'>) => {
      const res = await api.put(`/heroes/${id}`, heroData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hero', id] });
    },
  });
};