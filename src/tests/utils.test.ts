import { cn } from '@/utils/cn';
import { generateArrayItems } from '@/utils/generateArrayItems';
import { transformKeysToCamelCase } from '@/utils/transformKeys';

describe('Utils testing', () => {
  it('should generate an array of length 8', () => {
    expect(generateArrayItems(8)).toHaveLength(8);
  });

  it('should transform keys to camelCase', () => {
    const object = {
      user_name: 'Jane Doe',
      age: 28,
    };

    expect(transformKeysToCamelCase(object)).toEqual({
      userName: 'Jane Doe',
      age: 28,
    });
  });

  it('should merge classnames', () => {
    expect(cn('bg-white', 'text-black')).toBe('bg-white text-black');
  });
});
