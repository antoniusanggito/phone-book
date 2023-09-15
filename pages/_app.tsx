import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from '../apollo-client';
import { Global } from '@emotion/react';
import global from '../styles/global';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) {
  const client = createApolloClient();
  return (
    <>
      <Global styles={global} />
      <Toaster position="top-center" />
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
}

export default MyApp;
