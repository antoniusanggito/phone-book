import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from '../apollo-client';
import { Global } from '@emotion/react';
import global from '../styles/global';
import FavProvider from '../components/context/favContext';

function MyApp({ Component, pageProps }: AppProps) {
  const client = createApolloClient();
  return (
    <>
      <Global styles={global} />
      <ApolloProvider client={client}>
        <FavProvider>
          <Component {...pageProps} />
        </FavProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
