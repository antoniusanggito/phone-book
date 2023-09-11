import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import { useContactsQuery } from '../generated/graphql';

const Home: NextPage = () => {
  const { data, loading, error } = useContactsQuery();

  return (
    <div className={styles.container}>
      <Head>
        <title>Phone Book</title>
        <meta name="description" content="Phone Book SPA" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {loading && <div>Loading...</div>}
        {error && <div>{error.message}</div>}
        {data?.contact.map((contact) => (
          <div key={contact.id} className={styles.card}>
            <p>
              {contact.first_name} - {contact.phones[0].number}
            </p>
          </div>
        ))}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
