import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from './services/query-client';

import { Home } from './pages/Home';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}

export default App;
