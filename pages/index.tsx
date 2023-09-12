import React, { useContext } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { useContactsQuery } from '../generated/graphql';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from '@emotion/styled';
import Card from '../components/ContactCard';
import Wrapper from '../components/ContactCard/Wrapper';
import { flexCenter } from '../styles/commonStyles';
import { FavContext, FavContextType } from '../components/context/favContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  height: 100dvh;
`;

const Main = styled.main`
  height: 100%;
  display: flex;
  justify-content: center;
`;

const Home: NextPage = () => {
  const { data, loading, error } = useContactsQuery();
  const { fav } = (useContext(FavContext) as FavContextType) ?? {};

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
          <Wrapper>
            {loading && <div css={flexCenter}>Loading...</div>}
            {error && <div css={flexCenter}>{error.message}</div>}
            {data?.contact.map((contact) => (
              <Card
                key={contact.id}
                isFav={fav[contact.id]}
                id={contact.id}
                first_name={contact.first_name}
                last_name={contact.last_name}
                phones={contact.phones}
              />
            ))}
          </Wrapper>
        </Main>

        <Footer />
      </Container>
    </>
  );
};

export default Home;
