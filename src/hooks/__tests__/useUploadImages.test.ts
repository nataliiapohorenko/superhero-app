import { renderHook, waitFor } from '@testing-library/react';
import { useUploadImages } from '../useUploadImages';
import { api } from '../../lib/axios';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { TestQueryProvider } from '../../tests/utils/TestQueryProvider';

vi.mock('../../lib/axios', () => ({
  api: {
    post: vi.fn(),
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('useUploadImages', () => {
  it('should post form data to correct endpoint with headers', async () => {
    const formData = new FormData();
    formData.append('images', new Blob(['imgdata'], { type: 'image/jpeg' }), 'test.jpg');

    (api.post as ReturnType<typeof vi.fn>).mockResolvedValue({ data: { success: true } });

    const { result } = renderHook(() => useUploadImages(), {
      wrapper: TestQueryProvider,
    });

    result.current.mutate({ id: 'abc', formData });

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/heroes/abc/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    });
  });
});
