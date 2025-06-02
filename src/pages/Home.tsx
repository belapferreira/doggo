import { Header } from '@/components/Header';
import { DogCard } from '@/components/DogCard';

import { useGetImagesQuery } from '@/api/queries';
import { generateArrayItems } from '@/utils/generate-array-items';
import { Pagination } from '@/components/Pagination';
import { useCallback } from 'react';
import { Filter } from '@/components/Filter';
import { useFilters } from '@/hooks/useFilter';

export const Home = () => {
  const { filters, updateFilter } = useFilters();

  const { page, mimeType, breedIds, categoryIds, hasBreeds } = filters || {};

  const currentPage = page - 1;

  const { data: dogImages, isLoading } = useGetImagesQuery(
    {
      mimeType,
      hasBreeds,
      page: currentPage,
      breedIds: breedIds?.length ? breedIds.join(',') : undefined,
      categoryIds: categoryIds?.length ? categoryIds.join(',') : null,
    },
    {
      staleTime: 1000 * 60 * 60, // 1 hour
    },
  );

  const items = generateArrayItems(8);

  const handlePageChange = useCallback(
    (page: number) => {
      updateFilter('page', page + 1);
    },
    [updateFilter],
  );

  return (
    <div className="flex min-h-screen w-full flex-col bg-neutral-200">
      <Header />

      <main className="mx-auto flex w-full max-w-[1352px] flex-col gap-8 p-6 pb-10">
        <h1 className="text-2xl font-bold text-neutral-700">
          Have fun appreciating beautiful doggos
        </h1>

        <Filter />

        <div className="relative grid min-h-80 w-full grid-flow-row grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {isLoading ? (
            <>
              {items.map((item) => (
                <div
                  key={`doggo-image-${item}`}
                  data-testid={`doggo-loading-${item}`}
                  className="h-[19.25rem] w-full animate-pulse rounded bg-neutral-300"
                />
              ))}
            </>
          ) : (
            <>
              {dogImages?.length ? (
                <>
                  {dogImages?.map((dogImage) => (
                    <DogCard key={dogImage.id} data={dogImage} />
                  ))}
                </>
              ) : (
                <p className="absolute left-1/2 top-1/2 my-auto -translate-x-1/2 -translate-y-1/2 text-lg font-medium text-neutral-500">
                  No doggos found
                </p>
              )}
            </>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={9}
          handlePageChange={handlePageChange}
        />
      </main>
    </div>
  );
};
