import { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';

const Offline: NextPage = () => {
  return (
    <>
      <Head>
        <title>Offline Page</title>
      </Head>
      <Layout title="">
        <h1>Your device is offline</h1>
      </Layout>
    </>
  );
};

export default Offline;
