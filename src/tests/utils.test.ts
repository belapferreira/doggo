import { generateArrayItems } from '@/utils/generateArrayItems';

test('generateArrayItems', () => {
  expect(generateArrayItems(8)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
});
