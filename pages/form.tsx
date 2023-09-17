import { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import AddForm from '../components/AddForm';

const Form: NextPage = () => {
  return (
    <>
      <Head>
        <title>Add Contact Form</title>
      </Head>
      <Layout title="Add Contact" back={true}>
        <AddForm />
      </Layout>
    </>
  );
};

export default Form;
