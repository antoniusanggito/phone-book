import { gql } from '@apollo/client';

export const GET_FAV_CONTACTS = gql`
  query GetFavContacts($favIds: [Int!]) {
    contact(where: { id: { _in: $favIds } }) {
      id
      first_name
      last_name
      phones {
        number
      }
    }
  }
`;
