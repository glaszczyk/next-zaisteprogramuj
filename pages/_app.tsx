import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';

import { Layout } from '@/components/Layout';
import { CartStateContextProvider } from '@/components/Cart/CartContext';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartStateContextProvider>
      <Layout>
        <DefaultSeo {...SEO} />
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </Layout>
    </CartStateContextProvider>
  );
}
