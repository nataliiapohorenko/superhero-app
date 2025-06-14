import { renderHook, waitFor } from '@testing-library/react';
import { useDeleteImage } from '../useDeleteImage';
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

describe('useDeleteImage', () => {
  it('should send DELETE request with correct heroId and imageName', async () => {
    (api.delete as ReturnType<typeof vi.fn>).mockResolvedValue({});

    const { result } = renderHook(() => useDeleteImage(), {
      wrapper: TestQueryProvider,
    });

    result.current.mutate({ heroId: 'abc', imageName: 'image.jpg' });

    await waitFor(() => {
      expect(api.delete).toHaveBeenCalledWith('/heroes/abc/images/image.jpg');
    });
  });
});
