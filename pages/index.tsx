import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import { useContactsQuery } from '../generated/graphql';

const Home: NextPage = () => {
  const { data, loading, error } = useContactsQuery();

  return (
    <div>
      <Head>
        <title>Phone Book</title>
        <meta name="description" content="Phone Book SPA" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {loading && <div>Loading...</div>}
        {error && <div>{error.message}</div>}
        {data?.contact.map((contact) => (
          <div key={contact.id}>
            <p>
              {contact.first_name} - {contact.phones[0].number}
            </p>
          </div>
        ))}
      </main>

      <footer>
        <a
          href="https://github.com/antoniusanggito"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with love{' '}
          <span>
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
