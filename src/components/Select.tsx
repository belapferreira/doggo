import ReactSelect, {
  components,
  ControlProps,
  OptionProps,
  SingleValueProps,
} from 'react-select';
import ReactSelectAsync from 'react-select/async';
import ReactSelectCreatable from 'react-select/creatable';
import ReactSelectAsyncCreatable from 'react-select/async-creatable';
import { ComponentProps, ElementRef, ReactNode, forwardRef } from 'react';
import { CaretDown, CaretUp, Check } from '@phosphor-icons/react';
import { tv, VariantProps } from 'tailwind-variants';

const controlComponent = tv({
  slots: {
    base: '!min-h-[48px] border border-neutral-300 rounded transition',
    icon: 'flex items-center justify-center text-neutral-500 size-6',
  },

  variants: {
    focused: {
      true: {
        base: 'border-amber-600',
        icon: 'text-amber-600',
      },
    },

    disabled: {
      true: 'opacity-50 cursor-not-allowed',
    },

    hasLeftIcon: {
      true: 'pl-3',
    },

    hasValue: {
      true: {
        icon: 'text-amber-600',
      },
    },

    error: {
      true: {
        base: 'border-red-600',
      },
    },
  },
});

const optionComponent = tv({
  base: '!flex gap-2 justify-between items-center px-4 py-3 text-sm text-neutral-700 hover:bg-neutral-300/40 border-t border-t-neutral-200 first:border-0',

  variants: {
    focused: {
      true: 'bg-neutral-300/40',
    },
  },
});

type SelectElement<T extends boolean = false> = T extends true
  ? ElementRef<typeof ReactSelectAsync>
  : ElementRef<typeof ReactSelect>;

type SelectVariants = VariantProps<typeof controlComponent>;

type SelectBase = {
  multiple?: boolean;
  leftIcon?: ReactNode;
  creatable?: boolean;
} & SelectVariants;

type SelectProps =
  | (SelectBase & ComponentProps<typeof ReactSelect> & { async?: false })
  | (SelectBase & ComponentProps<typeof ReactSelectAsync> & { async: true });

export const Select = forwardRef<SelectElement<boolean>, SelectProps>(
  (props, forwardedRef) => {
    const {
      multiple,
      async = false,
      creatable,
      leftIcon,
      disabled,
      error,
      className,
      ...rest
    } = props;

    const isAsync = !!async;
    const isCreatable = !!creatable;

    const SelectComponent = isAsync ? ReactSelectAsync : ReactSelect;
    const CreatableComponent = isAsync
      ? ReactSelectAsyncCreatable
      : ReactSelectCreatable;

    const Component = isCreatable ? CreatableComponent : SelectComponent;

    const { base, icon } = controlComponent({ error, disabled });

    const Control = ({ children, ...props }: ControlProps) => {
      return (
        <components.Control {...props}>
          {leftIcon && (
            <div
              className={icon({
                focused: props.isFocused,
                hasValue: props.hasValue,
              })}
            >
              {leftIcon}
            </div>
          )}

          {children}
        </components.Control>
      );
    };

    return (
      <Component
        ref={forwardedRef}
        className="border-transparent"
        unstyled
        isMulti={multiple}
        loadingMessage={() => 'Loading...'}
        noOptionsMessage={({ inputValue }) =>
          inputValue?.length ? `No results for "${inputValue}"` : 'No results'
        }
        classNames={{
          control: (state) =>
            base({
              focused: state.isFocused,
              disabled: state.isDisabled,
              hasLeftIcon: !!leftIcon,
              className,
            }),
          valueContainer: () => 'px-3 py-2 gap-1',
          menu: () =>
            'border border-neutral-300 bg-neutral-200 rounded translate-y-2 overflow-hidden',
          noOptionsMessage: () => 'p-3 text-neutral-700 text-sm',
          loadingMessage: () => 'p-3 text-neutral-700 text-sm',
          loadingIndicator: () => 'pr-2',
          multiValue: () =>
            'rounded-full bg-neutral-300 inline-flex items-center gap-2 py-1 pl-3 pr-2',
          multiValueLabel: () =>
            'text-xs text-neutral-700 text-sm font-semibold uppercase tracking-wide',
          multiValueRemove: () =>
            'flex items-center justify-center text-neutral-500 bg-neutral-300 rounded-full hover:bg-neutral-400/50',
          input: () => 'text-neutral-700',
          placeholder: () => 'text-neutral-500',
        }}
        components={{
          Control,
          IndicatorSeparator: null,
          DropdownIndicator: multiple
            ? null
            : (props) => (
                <components.DropdownIndicator
                  className="pr-3 text-neutral-500"
                  {...props}
                >
                  {props?.selectProps?.menuIsOpen ? <CaretUp /> : <CaretDown />}
                </components.DropdownIndicator>
              ),
          SingleValue: ({ children, ...props }: SingleValueProps) => (
            <components.SingleValue {...props}>
              <span className="flex items-center gap-2 text-neutral-700">
                {
                  (
                    props?.data as SingleValueProps['data'] & {
                      icon?: ReactNode;
                    }
                  )?.icon
                }

                {children}
              </span>
            </components.SingleValue>
          ),
          Option: ({ children, ...props }: OptionProps) => (
            <components.Option
              className={optionComponent({ focused: props.isFocused })}
              {...props}
            >
              <span className="flex items-center gap-2 text-neutral-700">
                {
                  (
                    props?.data as OptionProps['data'] & {
                      icon?: ReactNode;
                    }
                  )?.icon
                }

                {children}
              </span>

              {props.isSelected && <Check />}
            </components.Option>
          ),
        }}
        {...rest}
      />
    );
  },
);

Select.displayName = 'Select';
