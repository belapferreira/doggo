import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/services/query-client';
import { Home } from '@/pages/Home';

const HomePage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
};

describe('Home page', () => {
  it('should render without crashing', () => {
    render(<HomePage />);

    const title = screen.getByText('Have fun appreciating beautiful doggos');

    expect(title).toBeInTheDocument();
  });

  it('should render the loading state', () => {
    render(<HomePage />);

    const loadingDoggos = screen.getAllByTestId(/doggo-loading-\d+/);

    expect(loadingDoggos).toHaveLength(8);

    loadingDoggos.forEach((loadingDoggo) => {
      expect(loadingDoggo).toBeInTheDocument();
    });
  });

  it('should be the first page in the pagination in the first render', () => {
    render(<HomePage />);

    const firstPage = screen.getByText('Page 1 of 10');

    const firstPageButton = screen.getByRole('button', {
      name: /first page/i,
    });

    const previousPageButton = screen.getByRole('button', {
      name: /previous page/i,
    });

    expect(firstPage).toBeInTheDocument();
    expect(firstPageButton).toBeDisabled();
    expect(previousPageButton).toBeDisabled();
  });

  it('should be able to navigate to the next and previous page', async () => {
    render(<HomePage />);
    const firstPage = await screen.findByText('Page 1 of 10');

    expect(firstPage).toBeInTheDocument();

    const firstPageButton = screen.getByRole('button', {
      name: /first page/i,
    });

    const nextPageButton = screen.getByRole('button', {
      name: /next page/i,
    });

    const previousPageButton = screen.getByRole('button', {
      name: /previous page/i,
    });

    const lastPageButton = screen.getByRole('button', {
      name: /last page/i,
    });

    userEvent.click(nextPageButton);

    const secondPage = await screen.findByText('Page 2 of 10');
    expect(secondPage).toBeInTheDocument();
    expect(firstPageButton).not.toBeDisabled();
    expect(previousPageButton).not.toBeDisabled();
    expect(nextPageButton).not.toBeDisabled();
    expect(lastPageButton).not.toBeDisabled();

    userEvent.click(previousPageButton);

    const previousPage = await screen.findByText('Page 1 of 10');

    expect(previousPage).toBeInTheDocument();
    expect(firstPageButton).toBeDisabled();
    expect(previousPageButton).toBeDisabled();
    expect(nextPageButton).not.toBeDisabled();
    expect(lastPageButton).not.toBeDisabled();
  });

  it('should be the last page in the pagination when the last page is selected', async () => {
    render(<HomePage />);

    const firstPage = screen.getByText('Page 1 of 10');

    expect(firstPage).toBeInTheDocument();

    const lastPageButton = screen.getByRole('button', {
      name: /last page/i,
    });

    const nextPageButton = screen.getByRole('button', {
      name: /next page/i,
    });

    userEvent.click(lastPageButton);

    const lastPage = await screen.findByText('Page 10 of 10');

    expect(lastPage).toBeInTheDocument();
    expect(lastPageButton).toBeDisabled();
    expect(nextPageButton).toBeDisabled();
  });
});

// import { render, screen } from '@testing-library/react';
// import { describe, it, expect, vi } from 'vitest';
// import { QueryClientProvider } from '@tanstack/react-query';
// import { queryClient } from './services/query-client';
// import App from './App';
// import { Home } from './pages/Home';

// // filepath: src/App.test.tsx

// vi.mock('./pages/Home', () => ({
//   Home: () => <div data-testid="home-component">Home Component</div>,
// }));

// describe('App Component', () => {
//   it('renders without crashing', () => {
//     render(<App />);
//     expect(screen.getByTestId('home-component')).toBeInTheDocument();
//   });

//   it('wraps the Home component with QueryClientProvider', () => {
//     const queryClientProviderSpy = vi.spyOn(QueryClientProvider.prototype, 'render');
//     render(<App />);
//     expect(queryClientProviderSpy).toHaveBeenCalled();
//     queryClientProviderSpy.mockRestore();
//   });

//   it('renders the Home component', () => {
//     render(<App />);
//     expect(screen.getByTestId('home-component')).toBeInTheDocument();
//   });
// });import { render, screen } from '@testing-library/react';
// import { describe, it, vi } from 'vitest';
// import { QueryClientProvider } from '@tanstack/react-query';
// import { queryClient } from './services/query-client';
// import App from './App';

// // filepath: c:\Users\Bela\Development\Projects\doggo\src\App.test.tsx

// // Mock the QueryClientProvider to isolate the test
// vi.mock('@tanstack/react-query', () => ({
//   QueryClientProvider: vi.fn(({ children }) => <div data-testid="query-client-provider">{children}</div>),
// }));

// // Mock the Home component
// vi.mock('./pages/Home', () => ({
//   Home: () => <div data-testid="home-component">Home Component</div>,
// }));

// describe('App Component', () => {
//   it('renders without crashing', () => {
//     render(<App />);
//     expect(screen.getByTestId('query-client-provider')).toBeInTheDocument();
//   });

//   it('renders the Home component inside the QueryClientProvider', () => {
//     render(<App />);
//     expect(screen.getByTestId('home-component')).toBeInTheDocument();
//   });
// });
