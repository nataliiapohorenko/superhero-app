import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useCreateHero } from '../../hooks/useCreateHero';
import { api } from '../../lib/axios';
import { TestQueryProvider } from '../../tests/utils/TestQueryProvider';

vi.mock('../../lib/axios', () => ({
  api: {
    post: vi.fn(),
  },
}));

describe('useCreateHero', () => {
  it('should post hero data and return response', async () => {
    const mockHero = {
      nickname: 'UnitTest Hero',
      real_name: 'Unit Man',
      origin_description: 'Born from code',
      superpowers: ['debugging'],
      catch_phrase: 'Let me test that!',
    };

    const mockResponse = {
      ...mockHero,
      id: 'hero-123',
      images: [],
    };

    (api.post as ReturnType<typeof vi.fn>).mockResolvedValue({ data: mockResponse });

    const { result } = renderHook(() => useCreateHero(), {
      wrapper: TestQueryProvider,
    });

    result.current.mutate(mockHero);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(api.post).toHaveBeenCalledWith('/heroes', mockHero);
    expect(result.current.data).toEqual(mockResponse);
  });
});
