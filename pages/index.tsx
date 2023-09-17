import type { NextPage } from 'next';
import SearchInput from '../components/Contacts/SearchInput';
import ContactList from '../components/Contacts';
import FavProvider from '../components/context/favContext';
import PaginationProvider from '../components/context/paginationContext';
import AddButton from '../components/AddButton';
import Layout from '../components/Layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <FavProvider>
        <PaginationProvider>
          <SearchInput />
          <ContactList />
          <AddButton />
        </PaginationProvider>
      </FavProvider>
    </Layout>
  );
};

export default Home;
