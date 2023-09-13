import { useContext, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from '@emotion/styled';
import Card from '../components/ContactCard';
import Wrapper from '../components/ContactCard/Wrapper';
import { fullCenter } from '../styles/commonStyles';
import { FavContext, FavContextType } from '../components/context/favContext';
import AddButton from '../components/AddButton';
import { css } from '@emotion/react';
import { useQuery } from '@apollo/client';
import { GET_FAV_CONTACTS } from '../graphql/getFavContacts';
import { GET_CONTACTS } from '../graphql/getContacts';
import PaginationButton from '../components/PaginationButton';

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
  const limit = 5;
  const [offset, setOffset] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { fav } = (useContext(FavContext) as FavContextType) ?? {};

  // graphql query
  const {
    data: dataFav,
    loading: loadingFav,
    error: errorFav,
  } = useQuery(GET_FAV_CONTACTS(fav));

  const { data, loading, error, fetchMore } = useQuery(GET_CONTACTS(fav), {
    variables: { offset, limit },
  });

  const toggleModal = () => {
    setOpenModal((prev) => !prev);
  };

  const handlePrev = () => {
    setOffset((prev) => (prev - limit < 0 ? 0 : prev - limit));
  };

  const handleNext = () => {
    setOffset((prev) => prev + limit);
  };

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
          <div
            css={css`
              position: fixed;
              bottom: 30px;
              right: 20px;

              @media screen and (min-width: 768px) {
                bottom: 5vw;
                right: 7vw;
              }

              @media screen and (min-width: 1024px) {
                bottom: 8vw;
                right: 15vw;
              }
            `}
          >
            <AddButton onClick={toggleModal} />
          </div>
          <Wrapper>
            {(loading || loadingFav) && <div css={fullCenter}>Loading...</div>}
            {(error || errorFav) && (
              <div css={fullCenter}>
                {error?.message} {errorFav?.message}
              </div>
            )}
            <div>
              <h3>Favorites ({dataFav?.contact.length})</h3>
            </div>
            {data &&
              dataFav?.contact.map((contact: any) => (
                <Card
                  key={contact.id}
                  isFav={fav[contact.id]}
                  id={contact.id}
                  first_name={contact.first_name}
                  last_name={contact.last_name}
                  phones={contact.phones}
                />
              ))}
            <h3>Others</h3>
            {data &&
              data.contact.map((contact: any) => (
                <Card
                  key={contact.id}
                  isFav={fav[contact.id]}
                  id={contact.id}
                  first_name={contact.first_name}
                  last_name={contact.last_name}
                  phones={contact.phones}
                />
              ))}

            {/* Pagination button */}
            {offset !== 0 && <PaginationButton onClick={handlePrev} />}
            <PaginationButton onClick={handleNext} />
          </Wrapper>
        </Main>

        <Footer />
      </Container>
    </>
  );
};

export default Home;
