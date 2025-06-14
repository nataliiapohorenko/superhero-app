import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/axios';
import type { SuperheroBase } from '../types/superhero';

interface HeroesResponse {
  heroes: SuperheroBase[];
  total: number;
}

export const useHeroes = (page: number) =>
  useQuery<HeroesResponse>({
    queryKey: ['heroes', page],
    queryFn: async () => {
      const { data } = await api.get(`/heroes?page=${page}`);
      return data;
    },
  });
