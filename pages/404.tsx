import { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';

const FourOFour: NextPage = () => {
  return (
    <>
      <Head>
        <title>404 Page</title>
      </Head>
      <Layout title="">
        <h1>Page could not be found</h1>
      </Layout>
    </>
  );
};

export default FourOFour;
