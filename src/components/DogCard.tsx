interface DogCard {
  url: string;
  breedName: string;
}

export const DogCard = ({ url, breedName }: DogCard) => {
  return (
    <button className="flex w-full flex-col overflow-hidden rounded border-2 border-neutral-300 bg-neutral-300 transition-colors ease-in-out duration-300 hover:border-amber-600">
      <div className="h-full max-h-48 min-w-[19.4375rem] overflow-hidden">
        <img
          src={url}
          alt="Image of a dog"
          className="aspect-[10/8.5] w-full object-cover object-center"
        />
      </div>

      <div className="flex w-full flex-col gap-4 p-5">
        <p className="flex items-center gap-1">
          <strong className="text-neutral-700">Breed:</strong>

          <span>{breedName || 'Beautiful Doggo'}</span>
        </p>

        <button className="mx-auto rounded-full bg-amber-600/70 px-8 py-1 font-semibold text-neutral-100 transition-colors ease-in-out duration-300 hover:bg-amber-600/80">
          More info
        </button>
      </div>
    </button>
  );
};
