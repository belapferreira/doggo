import { cn } from '@/utils/cn';
import { ComponentProps } from 'react';

type DividerProps = ComponentProps<'span'>;

export const Divider = (props: DividerProps) => {
  const { className } = props;

  return (
    <span className={cn('h-full w-px shrink-0 bg-neutral-400', className)} />
  );
};
