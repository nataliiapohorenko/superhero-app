import { renderHook, waitFor } from '@testing-library/react';
import { useUpdateHero } from '../useUpdateHero';
import { api } from '../../lib/axios';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { TestQueryProvider } from '../../tests/utils/TestQueryProvider';

vi.mock('../../lib/axios', () => ({
  api: {
    put: vi.fn(),
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('useUpdateHero', () => {
  it('should send PUT request and return updated data', async () => {
    const updatedHero = { id: 'abc', nickname: 'Updated' };
    (api.put as ReturnType<typeof vi.fn>).mockResolvedValue({ data: updatedHero });

    const { result } = renderHook(() => useUpdateHero('abc'), {
      wrapper: TestQueryProvider,
    });

    result.current.mutate({ nickname: 'Updated', real_name: '', origin_description: '', superpowers: [], catch_phrase: '' });

    await waitFor(() => {
      expect(api.put).toHaveBeenCalledWith('/heroes/abc', {
        nickname: 'Updated',
        real_name: '',
        origin_description: '',
        superpowers: [],
        catch_phrase: '',
      });
    });
  });
});
