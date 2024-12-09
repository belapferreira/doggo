import { Header } from '@/components/Header';
import { DogCard } from '@/components/DogCard';

import { useGetImagesQuery } from '@/api/queries';
import { generateArrayItems } from '@/utils/generateArrayItems';
import { Pagination } from '@/components/Pagination';
import { useCallback, useState } from 'react';

export const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const { data: dogImages, isLoading } = useGetImagesQuery(
    {
      page: currentPage,
    },
    {
      staleTime: 1000 * 60 * 60, // 1 hour
    },
  );

  const items = generateArrayItems(8);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-neutral-200">
      <Header />

      <main className="mx-auto flex w-full max-w-[1352px] flex-col gap-8 p-6 pb-10">
        <h1 className="text-2xl font-bold text-neutral-700">
          Have fun appreciating beautiful doggos
        </h1>

        <div className="grid w-full grid-flow-row grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {isLoading ? (
            <>
              {items.map((item) => (
                <div
                  key={`doggo-image-${item}`}
                  className="h-[19.25rem] w-full animate-pulse rounded bg-neutral-300"
                />
              ))}
            </>
          ) : (
            <>
              {dogImages?.map((dogImage) => (
                <DogCard key={dogImage.id} data={dogImage} />
              ))}
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
