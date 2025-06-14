import { useMutation } from '@tanstack/react-query';
import { api } from '../lib/axios';
import type { Superhero } from '../types/superhero';

export const useCreateHero = () => {
  return useMutation({
    mutationFn: async (heroData: Omit<Superhero, 'id' | 'images'>) => {
      const res = await api.post('/heroes', heroData);
      return res.data;
    },
  });
};