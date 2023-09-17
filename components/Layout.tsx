import styled from '@emotion/styled';
import Head from 'next/head';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useRouter } from 'next/router';

interface LayoutProps {
  title?: string;
  back?: boolean;
  onBack?: () => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  title = 'Contacts',
  back = false,
  onBack,
  children,
}) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Phone Book</title>
        <meta name="description" content="Phone Book SPA" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Header title={title} back={back} onBack={() => router.back()} />
        <Main>
          <ContentWrapperStyle>{children}</ContentWrapperStyle>
        </Main>
        <Footer />
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
`;

const Main = styled.main`
  /* min-height: 80vh; */
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;

const ContentWrapperStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  max-width: 700px;
  padding: 1rem;
  gap: 0.5rem;
`;

export default Layout;
