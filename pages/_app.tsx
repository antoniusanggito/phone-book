import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from '../apollo-client';
import { Global } from '@emotion/react';
import global from '../styles/global';
import FavProvider from '../components/context/favContext';
import PaginationProvider from '../components/context/paginationContext';

function MyApp({ Component, pageProps }: AppProps) {
  const client = createApolloClient();
  return (
    <>
      <Global styles={global} />
      <ApolloProvider client={client}>
        <FavProvider>
          <PaginationProvider>
            <Component {...pageProps} />
          </PaginationProvider>
        </FavProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
