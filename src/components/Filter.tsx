import { BOOLEAN_OPTIONS, TYPES_OPTIONS } from '@/constants';
import { Select } from './Select';
import { Field } from './Field';
import { useGetBreedsQuery, useGetCategoriesQuery } from '@/api/queries';
import { useFilters } from '@/hooks/useFilter';
import { SelectOption } from '@/types';

export const Filter = () => {
  const { updateFilter, filters } = useFilters();

  const { hasBreeds } = filters || {};

  const { data: breeds } = useGetBreedsQuery(
    {
      limit: 2000,
    },
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 day
    },
  );

  const { data: categories } = useGetCategoriesQuery(
    {
      limit: 100,
    },
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 day
    },
  );

  const breedOptions =
    breeds?.map((breed) => ({
      value: breed.id,
      label: breed.name,
    })) ?? [];

  const categoryOptions =
    categories?.map((category) => ({
      value: category.id,
      label: category.name,
    })) ?? [];

  return (
    <div className="flex w-full flex-wrap justify-end gap-3">
      <Field label="Type" className="w-32">
        <Select
          options={TYPES_OPTIONS}
          defaultValue={TYPES_OPTIONS[0]}
          onChange={(newValue) => {
            const newValueTyped = newValue as SelectOption;

            updateFilter('mimeType', newValueTyped.value);
          }}
        />
      </Field>

      <Field label="Has Breed" className="w-32">
        <Select
          options={BOOLEAN_OPTIONS}
          defaultValue={BOOLEAN_OPTIONS[2]}
          onChange={(newValue) => {
            const newValueTyped = newValue as SelectOption;

            updateFilter('hasBreeds', newValueTyped.value);
          }}
        />
      </Field>

      <Field label="Categories" className="w-60">
        <Select
          multiple
          isSearchable
          options={categoryOptions}
          placeholder="Select a category"
          onChange={(newValue) => {
            const newValueTyped = newValue as SelectOption[];

            const categoryIds = newValueTyped.map((item) => item.value);

            updateFilter('categoryIds', categoryIds);
          }}
          disabled={!categoryOptions?.length}
        />
      </Field>

      <Field label="Breeds" className="min-w-96">
        <Select
          multiple
          isSearchable
          options={breedOptions}
          placeholder="Select a breed"
          onChange={(newValue) => {
            const newValueTyped = newValue as SelectOption[];

            const breedIds = newValueTyped.map((item) => item.value);

            updateFilter('breedIds', breedIds);
          }}
          disabled={!breedOptions?.length || hasBreeds === 'false'}
        />
      </Field>
    </div>
  );
};
