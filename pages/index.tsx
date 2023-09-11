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
          href="https://github.com/antoniusanggito"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with love{' '}
          <span className={styles.logo}>
            <Image
              src="/github-mark.svg"
              alt="Github Logo"
              width={20}
              height={20}
            />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
