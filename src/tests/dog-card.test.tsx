import { DogCard } from '@/components/DogCard';
import { render, screen } from '@testing-library/react';
import { mockDataWithBreeds, mockDataWithoutBreeds } from './mock/dog-card';

describe('DogCard Component', () => {
  it('should render the dog image and breed information when breeds are present', () => {
    render(<DogCard data={mockDataWithBreeds} />);

    const breedText = screen.getByText('Caramel');
    const image = screen.getByAltText('Image of a dog');

    expect(breedText).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/dog.jpg');
  });

  it('should render the default text when no breeds are present', () => {
    render(<DogCard data={mockDataWithoutBreeds} />);

    const defaultText = screen.getByText('Beautiful Doggo');

    expect(defaultText).toBeInTheDocument();
  });

  it('should be disabled when no breeds are present', () => {
    render(<DogCard data={mockDataWithoutBreeds} />);

    const card = screen.getByTestId('doggo-card-2');

    expect(card).toHaveAttribute('data-disabled', 'true');

    const button = screen.getByText(/more info/i);

    expect(button).toBeDisabled();
  });
});
