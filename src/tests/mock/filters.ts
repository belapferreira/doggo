import { Breed, Category } from '@/types';

export const breeds: Pick<Breed, 'id' | 'name'>[] = [
  { id: 1, name: 'Akita' },
  { id: 2, name: 'German Shepherd' },
  { id: 3, name: 'Labrador Retriever' },
];

export const categories: Category[] = [];
