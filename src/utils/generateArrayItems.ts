export const generateArrayItems = (length: number) => {
  const array = Array.from({ length }, (_, index) => index + 1);

  return array;
};
