import { renderHook, waitFor } from '@testing-library/react';
import { useDeleteHero } from '../useDeleteHero';
import { api } from '../../lib/axios';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { TestQueryProvider } from '../../tests/utils/TestQueryProvider';

vi.mock('../../lib/axios', () => ({
  api: {
    delete: vi.fn(),
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('useDeleteHero', () => {
  it('should send DELETE request', async () => {
    (api.delete as ReturnType<typeof vi.fn>).mockResolvedValue({});

    const { result } = renderHook(() => useDeleteHero(), {
      wrapper: TestQueryProvider,
    });

    result.current.mutate('hero-id');

    await waitFor(() => {
      expect(api.delete).toHaveBeenCalledWith('/heroes/hero-id');
    });
  });
});
