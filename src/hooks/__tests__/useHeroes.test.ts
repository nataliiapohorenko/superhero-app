import { renderHook, waitFor } from '@testing-library/react';
import { useHeroes } from '../useHeroes';
import { api } from '../../lib/axios';
import { describe, expect, it, vi } from 'vitest';
import { TestQueryProvider } from '../../tests/utils/TestQueryProvider';

vi.mock('../../lib/axios', () => ({
  api: {
    get: vi.fn(),
  },
}));

describe('useHeroes', () => {
  it('should fetch heroes for a given page', async () => {
    const mockHeroes = {
      heroes: [{ id: '1', nickname: 'Hero One' }],
      total: 1,
    };

    (api.get as ReturnType<typeof vi.fn>).mockResolvedValue({ data: mockHeroes });

    const { result } = renderHook(() => useHeroes(1), {
      wrapper: TestQueryProvider,
    });

    await waitFor(() => expect(result.current.data).toEqual(mockHeroes));
    expect(api.get).toHaveBeenCalledWith('/heroes?page=1');
  });
});
