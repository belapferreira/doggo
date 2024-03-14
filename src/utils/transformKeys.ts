import camelcaseKeys, { Options } from 'camelcase-keys';

export function transformKeysToCamelCase<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Record<string, unknown> | readonly any[],
  OptionsType extends Options = Options,
>(input: T, options?: OptionsType) {
  return camelcaseKeys(input, {
    deep: true,
    ...options,
  });
}
