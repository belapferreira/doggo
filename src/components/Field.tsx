import { cn } from '@/utils/cn';
import { ComponentProps } from 'react';

type Props = ComponentProps<'div'> & {
  label?: string;
  errorMessage?: string;
  required?: boolean;
};

export const Field = (props: Props) => {
  const { children, className, label, errorMessage, required, ...rest } = props;

  return (
    <div
      className={cn('flex flex-col gap-1 self-stretch', className)}
      {...rest}
    >
      {label && (
        <label className="text-xs font-semibold text-neutral-700">
          {label}
          {required && <span className="text-red-600">*</span>}
        </label>
      )}

      {children}

      {errorMessage && (
        <span className="text-xs font-semibold text-red-600">
          {errorMessage}
        </span>
      )}
    </div>
  );
};
