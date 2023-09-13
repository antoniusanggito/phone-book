import { gql } from '@apollo/client';
import { CORE_CONTACT_FIELDS } from './fragments';

export const GET_REG_CONTACTS = gql`
  ${CORE_CONTACT_FIELDS}
  query GetRegContacts($offset: Int, $limit: Int, $favIds: [Int!]) {
    contact(offset: $offset, limit: $limit, where: { id: { _nin: $favIds } }) {
      ...CoreContactFields
    }
  }
`;
