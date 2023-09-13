import { gql } from '@apollo/client';
import { IFavMap } from '../components/context/favContext';
import getFavIdQuery from '../utils/getFavIdQuery';

export const GET_CONTACTS = (fav: IFavMap) => {
  const query = `
    query GetContacts($offset: Int, $limit: Int) {
      contact(offset: $offset, limit: $limit, where: { _not: { _or: [${getFavIdQuery(
        fav
      )}] } }) {
        id
        first_name
        last_name
        phones {
          number
        }
      }
      contact_aggregate {
        aggregate {
          count
        }
      }
    }
  `;

  return gql`
    ${query}
  `;
};
