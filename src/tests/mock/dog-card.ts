import { Image } from '@/types';

export const mockDataWithBreeds: Image = {
  id: '1',
  url: 'https://example.com/dog.jpg',
  breeds: [
    {
      id: 1,
      name: 'Caramel',
      temperament: 'Gentle, Intelligent',
      origin: 'Brazil',
      lifeSpan: '10-12 years',
      referenceImageId: 'abc123',
      weight: { imperial: '55 - 80', metric: '25 - 36' },
      height: { imperial: '21.5 - 24.5', metric: '55 - 62' },
    },
  ],
  width: 0,
  height: 0,
};

export const mockDataWithoutBreeds: Image = {
  id: '2',
  url: 'https://example.com/dog.jpg',
  breeds: [],
  width: 0,
  height: 0,
};
