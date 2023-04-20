import { QueryClient, QueryClientProvider } from 'react-query';
import '/styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from 'context/auth';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </QueryClientProvider>
  );
}
