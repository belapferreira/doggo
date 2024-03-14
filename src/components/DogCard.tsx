interface DogCard {
  url: string;
  breedName: string;
}

export const DogCard = ({ url, breedName }: DogCard) => {
  return (
    <div className="flex flex-col overflow-hidden rounded bg-neutral-300">
      <div className="max-h-48 max-w-[19.4375rem] overflow-hidden">
        <img
          src={url}
          alt="Image of a dog"
          className="aspect-[10/8.5] w-full object-cover object-center"
        />
      </div>

      <p className="flex items-center gap-1 p-5">
        <strong className="text-neutral-700">Breed:</strong>

        <span>{breedName || 'Beautiful Doggo'}</span>
      </p>
    </div>
  );
};
