import { render, screen } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/services/query-client';
import { useGetImagesQuery } from '@/api/queries';
import { Home } from '@/pages/Home';
import { mockDataWithBreeds } from './mock/dog-card';

vi.mock('@/api/queries', () => ({
  useGetImagesQuery: vi.fn(),
}));

const HomePage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
};

describe('Home page', () => {
  it('should open modal with doggo data', async () => {
    const mockGetImages = vi.mocked(useGetImagesQuery);

    // @ts-expect-error mocking TanStack return type
    mockGetImages.mockReturnValueOnce({ data: undefined, isLoading: true });

    render(<HomePage />);

    const loadingDoggos = screen.getAllByTestId(/doggo-loading-\d+/);

    expect(loadingDoggos).toHaveLength(8);

    loadingDoggos.forEach((loadingDoggo) => {
      expect(loadingDoggo).toBeInTheDocument();
    });

    // @ts-expect-error mocking TanStack return type
    mockGetImages.mockReturnValueOnce({
      data: [mockDataWithBreeds],
      isLoading: false,
    });

    render(<HomePage />);

    const doggoName = screen.getByTestId('doggo-breed-name-1');

    expect(doggoName).toBeInTheDocument();
  });
});
