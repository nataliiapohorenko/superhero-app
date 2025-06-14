import { renderHook, waitFor } from '@testing-library/react';
import { useHero } from '../useHero';
import { api } from '../../lib/axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TestQueryProvider } from '../../tests/utils/TestQueryProvider';

vi.mock('../../lib/axios', () => ({
  api: {
    get: vi.fn(),
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('useHero', () => {
  it('should fetch hero data by id', async () => {
    const mockHero = { id: '123', nickname: 'Test Hero' };
    (api.get as ReturnType<typeof vi.fn>).mockResolvedValue({ data: mockHero });

    const { result } = renderHook(() => useHero('123'), {
      wrapper: TestQueryProvider,
    });

    await waitFor(() => expect(result.current.data).toEqual(mockHero));
    expect(api.get).toHaveBeenCalledWith('/heroes/123');
  });

  it('should not run if enabled is false', async () => {
    renderHook(() => useHero('123', false), {
      wrapper: TestQueryProvider,
    });

    expect(api.get).not.toHaveBeenCalled();
  });
});
