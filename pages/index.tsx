import { useContext } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from '@emotion/styled';
import MainWrapper from '../components/MainWrapper';
import { FavContext, FavContextType } from '../components/context/favContext';
import { useGetFavContactsQuery } from '../generated/graphql';
import getFavIds from '../utils/getFavIdQuery';
import AddForm from '../components/AddForm';
import SearchInput from '../components/Contacts/SearchInput';
import ContactsSection from '../components/Contacts';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
`;

const Main = styled.main`
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;

const Home: NextPage = () => {
  const { fav } = (useContext(FavContext) as FavContextType) ?? {};
  const favIds = getFavIds(fav);

  // graphql queries
  const {
    data: dataFav,
    loading: loadingFav,
    error: errorFav,
    refetch: refetchFav,
  } = useGetFavContactsQuery({ variables: { favIds } });

  return (
    <>
      <Head>
        <title>Phone Book</title>
        <meta name="description" content="Phone Book SPA" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Header />
        <Main>
          {dataFav && (
            <MainWrapper>
              <SearchInput />
              <ContactsSection dataFav={dataFav} />
              <AddForm />
            </MainWrapper>
          )}
        </Main>
        <Footer />
      </Container>
    </>
  );
};

export default Home;
