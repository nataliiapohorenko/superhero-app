import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/axios';
import type { Superhero } from '../types/superhero';

export const useHero = (id: string, enabled: boolean = true) =>
  useQuery<Superhero>({
    queryKey: ['hero', id],
    queryFn: async () => {
      const { data } = await api.get(`/heroes/${id}`);
      return data;
    },
    enabled,
  });
