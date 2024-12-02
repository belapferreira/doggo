import { Image } from '@/types';
import { useState } from 'react';
import { DogModal } from './DogModal';

interface DogCardProps {
  data: Image;
}

export const DogCard = ({ data }: DogCardProps) => {
  const [openDetail, setOpenDetail] = useState(false);

  const handleOpenDetail = () => {
    if (!data.breeds.length) {
      return;
    }

    setOpenDetail((prevState) => !prevState);
  };

  return (
    <>
      <button
        onClick={handleOpenDetail}
        disabled={!data.breeds.length}
        className="flex w-full flex-col overflow-hidden rounded border-2 border-neutral-300 bg-neutral-300 transition-colors duration-300 ease-in-out enabled:hover:border-amber-600 disabled:cursor-not-allowed"
      >
        <div className="h-full max-h-48 min-w-[19.4375rem] overflow-hidden">
          <img
            src={data.url}
            alt="Image of a dog"
            className="aspect-[10/8.5] w-full bg-neutral-400/80 object-cover object-center"
          />
        </div>

        <div className="flex w-full flex-col gap-4 p-5">
          <p className="flex items-center gap-1 text-neutral-700">
            <strong>Breed:</strong>

            <span>{data?.breeds[0]?.name || 'Beautiful Doggo'}</span>
          </p>

          <button
            disabled={!data.breeds.length}
            className="mx-auto rounded-full bg-amber-600/70 px-8 py-1 font-semibold text-neutral-100 transition-colors duration-300 ease-in-out enabled:hover:bg-amber-600/80 disabled:bg-amber-600/30"
          >
            More info
          </button>
        </div>
      </button>

      <DogModal open={openDetail} onOpenChange={handleOpenDetail} data={data} />
    </>
  );
};
