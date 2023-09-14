import { useContext } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from '@emotion/styled';
import MainWrapper from '../components/MainWrapper';
import { fullCenter } from '../styles/commonStyles';
import { FavContext, FavContextType } from '../components/context/favContext';
import { css } from '@emotion/react';
import PaginationButton from '../components/PaginationButton';
import {
  useCountRegContactsQuery,
  useGetFavContactsQuery,
} from '../generated/graphql';
import getFavIds from '../utils/getFavIdQuery';
import {
  PaginationContext,
  PaginationContextType,
} from '../components/context/paginationContext';
import AddForm from '../components/AddForm';
import SearchInput from '../components/SearchInput';
import ContactsSection from '../components/ContactCard/ContactsSection';

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
  const { fav } = (useContext(FavContext) as FavContextType) ?? {};
  const { pagination, limit, page, setPagination } =
    (useContext(PaginationContext) as PaginationContextType) ?? {};
  const favIds = getFavIds(fav);

  // graphql queries
  const {
    data: dataFav,
    loading: loadingFav,
    error: errorFav,
    refetch: refetchFav,
  } = useGetFavContactsQuery({ variables: { favIds } });

  const { data: dataCount, error: errorCount } = useCountRegContactsQuery({
    variables: { favIds },
  });

  // regContacts count
  let count = 0;
  if (dataCount) {
    count = dataCount.contact_aggregate.aggregate?.count as number;
  }

  const handlePrev = () => {
    setPagination((prev) => ({
      ...prev,
      offset: prev.offset - limit < 0 ? 0 : prev.offset - limit,
    }));
  };

  const handleNext = () => {
    setPagination((prev) => ({ ...prev, offset: prev.offset + limit }));
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
          {dataFav && (
            <MainWrapper>
              <SearchInput />

              <ContactsSection dataFav={dataFav} />

              {/* Pagination button */}
              <section css={fullCenter}>
                <PaginationButton
                  type="prev"
                  onClick={handlePrev}
                  disabled={page == 1}
                />
                <h4
                  css={css`
                    margin: 0 1rem;
                  `}
                >
                  {page}
                </h4>
                <PaginationButton
                  type="next"
                  onClick={handleNext}
                  disabled={page * limit >= count}
                />
              </section>
              <section>
                <AddForm />
              </section>
            </MainWrapper>
          )}
        </Main>

        <Footer />
      </Container>
    </>
  );
};

export default Home;
