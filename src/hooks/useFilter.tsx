import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from 'nuqs';

export const useFilters = () => {
  const [filters, setFilters] = useQueryStates({
    mimeType: parseAsString,
    hasBreeds: parseAsString,
    page: parseAsInteger.withDefault(1),
    breedIds: parseAsArrayOf(parseAsString),
    categoryIds: parseAsArrayOf(parseAsString),
  });

  const updateFilter = <T extends keyof typeof filters>(
    key: T,
    value: (typeof filters)[T],
  ) => {
    const valueChecked =
      (key === 'hasBreeds' || key === 'mimeType') && value === 'all'
        ? null
        : value;

    const isPageFilter = key === 'page';

    setFilters((prev) => ({
      ...prev,
      [key]: valueChecked,
      page: isPageFilter ? Number(value) : 1,
    }));
  };

  const clearFilters = () => {
    const emptyFilters: {
      [key: string]: null;
    } = {};

    Object.keys(filters).forEach((key) => {
      emptyFilters[key] = null;
    });

    setFilters(emptyFilters);
  };

  return {
    filters,
    setFilters,
    clearFilters,
    updateFilter,
  };
};
