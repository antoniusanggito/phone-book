import { gql } from '@apollo/client';
import { IFavMap } from '../components/context/favContext';
import getFavIdQuery from '../utils/getFavIdQuery';

export const GET_FAV_CONTACTS = (fav: IFavMap) => {
  const query = `
    query GetFavContact {
      contact(where: { _or: [${getFavIdQuery(fav)}] }) {
        id
        first_name
        last_name
        phones {
          number
        }
      }
    }
  `;

  return gql`
    ${query}
  `;
};
