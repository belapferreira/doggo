import { Header } from '@/components/Header';
import { DogCard } from '@/components/DogCard';

import { useGetImagesQuery } from '@/api/queries';
import { generateArrayItems } from '@/utils/generateArrayItems';

export const Home = () => {
  const { data: dogImages, isLoading } = useGetImagesQuery(undefined, {
    staleTime: 240000 /* 4 minutes */,
  });

  const items = generateArrayItems(8);

  return (
    <div className="flex min-h-screen w-full flex-col bg-neutral-200">
      <Header />

      <main className="mx-auto flex max-w-[1352px] flex-col gap-12 p-6 pb-10">
        <h1 className="text-2xl font-bold text-neutral-700">
          Have fun appreciating beautyful doggos
        </h1>

        <div className="grid w-full grid-flow-row grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {isLoading ? (
            <>
              {items.map((item) => (
                <div
                  key={`doggo-image-${item}`}
                  className="h-[19.25rem] w-full min-w-[19.4375rem] animate-pulse rounded bg-neutral-300"
                />
              ))}
            </>
          ) : (
            <>
              {dogImages?.map(({ id, url, breeds }) => (
                <DogCard key={id} url={url} breedName={breeds[0]?.name} />
              ))}
            </>
          )}
        </div>
      </main>
    </div>
  );
};
