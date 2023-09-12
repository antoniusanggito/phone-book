import type { NextPage } from 'next';
import Head from 'next/head';

import { useContactsQuery } from '../generated/graphql';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from '@emotion/styled';
import Card from '../components/ContactCard';
import Wrapper from '../components/ContactCard/Wrapper';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
`;

const Home: NextPage = () => {
  const { data, loading, error } = useContactsQuery();

  return (
    <Container>
      <Head>
        <title>Phone Book</title>
        <meta name="description" content="Phone Book SPA" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Main>
        {loading && <div>Loading...</div>}
        {error && <div>{error.message}</div>}
        {data && (
          <Wrapper>
            {data.contact.map((contact) => (
              <Card
                isFav={false}
                id={contact.id}
                first_name={contact.first_name}
                last_name={contact.last_name}
                phones={contact.phones}
              />
            ))}
          </Wrapper>
        )}
      </Main>

      <Footer />
    </Container>
  );
};

export default Home;
