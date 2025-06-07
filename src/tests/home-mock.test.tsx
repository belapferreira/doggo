import { render, screen } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/services/query-client';
import {
  useGetBreedsQuery,
  useGetCategoriesQuery,
  useGetImagesQuery,
} from '@/api/queries';
import { Home } from '@/pages/Home';
import { mockDataWithBreeds } from './mock/dog-card';
import userEvent from '@testing-library/user-event';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { breeds, categories } from './mock/filters';

vi.mock('@/api/queries', () => ({
  useGetImagesQuery: vi.fn(),
  useGetBreedsQuery: vi.fn(),
  useGetCategoriesQuery: vi.fn(),
}));

const HomePage = () => {
  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </NuqsAdapter>
  );
};

describe('Home page', () => {
  it('should open modal with doggo data', async () => {
    const mockGetImages = vi.mocked(useGetImagesQuery);
    const mockGetBreeds = vi.mocked(useGetBreedsQuery);
    const mockGetCategories = vi.mocked(useGetCategoriesQuery);

    // @ts-expect-error mocking TanStack return type
    mockGetImages.mockReturnValueOnce({ data: undefined, isLoading: true });

    // @ts-expect-error mocking TanStack return type
    mockGetBreeds.mockReturnValue({
      data: breeds,
      isLoading: false,
    });

    // @ts-expect-error mocking TanStack return type
    mockGetCategories.mockReturnValue({
      data: categories,
      isLoading: false,
    });

    /*     await act(async () => {
      render(<HomePage />);
    }); */

    const { rerender } = render(<HomePage />);

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

    /*     await act(async () => {
      render(<HomePage />);
    });
 */

    rerender(<HomePage />);

    const doggoName = screen.getByTestId('doggo-breed-name-1');
    expect(doggoName).toBeInTheDocument();

    const doggoCard = screen.getByTestId('doggo-card-1');
    expect(doggoCard).toBeInTheDocument();

    await userEvent.click(doggoCard);

    const doggoModalContent = await screen.findByTestId('doggo-details-1');

    expect(doggoModalContent).toBeInTheDocument();

    const doggoTemperamentLabel = await screen.findByText(/Temperament/i);

    const doggoTemperamentText =
      await screen.findByText(/Gentle, Intelligent/i);

    expect(doggoTemperamentLabel).toBeInTheDocument();
    expect(doggoTemperamentText).toBeInTheDocument();
  });
});
