import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from '../apollo-client';
import { Global } from '@emotion/react';
import global from '../styles/global';

function MyApp({ Component, pageProps }: AppProps) {
  const client = createApolloClient();
  return (
    <>
      <Global styles={global} />
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
}

export default MyApp;
