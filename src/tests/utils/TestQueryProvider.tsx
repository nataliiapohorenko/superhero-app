import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const testQueryClient = new QueryClient();

export const TestQueryProvider = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={testQueryClient}>
    {children}
  </QueryClientProvider>
);
