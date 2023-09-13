import { gql } from '@apollo/client';
import { CORE_CONTACT_FIELDS } from './fragments';

export const GET_FAV_CONTACTS = gql`
  ${CORE_CONTACT_FIELDS}
  query GetFavContacts($favIds: [Int!]) {
    contact(where: { id: { _in: $favIds } }) {
      ...CoreContactFields
    }
  }
`;
