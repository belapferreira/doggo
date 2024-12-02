import { Image } from '@/types';
import { cn } from '@/utils/cn';
import * as Dialog from '@radix-ui/react-dialog';
import { ComponentProps } from 'react';
import { Divider } from './Divider';

type DogModalProps = ComponentProps<typeof Dialog.Root> & {
  data: Image;
};

type BreedTagProps = {
  title: string;
  description?: string;
};

export const DogModal = ({ open, onOpenChange, data }: DogModalProps) => {
  const breed = data?.breeds[0];

  const isVertical = data?.height > data?.width;

  console.log(`isVertical ${breed?.name}`, isVertical);

  const name = breed?.name || 'Beautiful Doggo';

  const heightSplitted = breed?.height?.metric.split(' - ');
  const weightSplitted = breed?.weight?.metric.split(' - ');

  const heightFormatted = () => {
    if (!heightSplitted) {
      return undefined;
    }

    if (heightSplitted.length === 1) {
      return `${heightSplitted[0]}cm`;
    }

    return `${heightSplitted[0]}cm - ${heightSplitted[1]}cm`;
  };

  const weightFormatted = () => {
    if (!weightSplitted) {
      return undefined;
    }

    if (weightSplitted.length === 1) {
      return `${weightSplitted[0]}kg`;
    }

    return `${weightSplitted[0]}kg - ${weightSplitted[1]}kg`;
  };

  const Tag = ({ title, description }: BreedTagProps) => {
    return (
      <p
        title={description}
        className="text-xs font-medium text-neutral-700 md:text-sm"
      >
        {title}:{' '}
        <span className="font-normal">{description || 'unavailable'}</span>
      </p>
    );
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-neutral-900/90" />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-neutral-300',
            'flex h-fit max-h-[95vh] min-h-0 w-[700px] max-w-[90vw] flex-col overflow-hidden',
            'data-[state=open]:animate-contentShow focus:outline-none',
            isVertical && 'md:flex-row',
          )}
        >
          <img
            src={data.url}
            alt={name}
            className={cn(
              'aspect-[19/20] w-full rounded-t-md bg-neutral-400/80 object-cover object-center md:aspect-[10/8]',
              isVertical &&
                'md:aspect-auto md:w-[55%] md:rounded-l-md md:rounded-t-none',
            )}
          />

          <div className="flex h-fit min-h-0 flex-col gap-3 overflow-y-auto rounded p-4 max-md:max-h-64 md:p-5">
            <Dialog.Title className="text-lg font-bold text-neutral-700 md:text-xl">
              {name}
            </Dialog.Title>

            <Dialog.Description className="flex flex-col gap-5">
              <div className="space-y-1">
                <strong className="font-semibold text-neutral-700 md:text-lg">
                  Breed
                </strong>

                <div className="flex flex-col gap-2">
                  <div
                    className={cn(
                      'flex flex-wrap items-center gap-2',
                      isVertical && 'flex-col items-start',
                    )}
                  >
                    {!!breed?.breedGroup && (
                      <Tag title="Group" description={breed?.breedGroup} />
                    )}

                    <Divider className={cn('h-3', isVertical && 'hidden')} />

                    {!!breed?.bredFor && (
                      <Tag title="For" description={breed?.bredFor} />
                    )}

                    <Divider className={cn('h-3', isVertical && 'hidden')} />

                    {!!breed?.lifeSpan && (
                      <Tag title="Life span" description={breed?.lifeSpan} />
                    )}
                  </div>

                  {!!breed?.temperament && (
                    <Tag title="Temperament" description={breed?.temperament} />
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <strong className="font-semibold text-neutral-700 md:text-lg">
                  Metrics
                </strong>

                <div className="flex flex-wrap items-center gap-2">
                  {!!breed?.height?.metric && (
                    <Tag title="Height" description={heightFormatted()} />
                  )}

                  <Divider className="h-3" />

                  {!!breed?.weight?.metric && (
                    <Tag title="Height" description={weightFormatted()} />
                  )}
                </div>
              </div>
            </Dialog.Description>
          </div>
          {/* <Dialog.Close /> */}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
