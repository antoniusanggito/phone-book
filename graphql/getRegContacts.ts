import { gql } from '@apollo/client';

export const GET_REG_CONTACTS = gql`
  query GetRegContacts($offset: Int, $limit: Int, $favIds: [Int!]) {
    contact(offset: $offset, limit: $limit, where: { id: { _nin: $favIds } }) {
      id
      first_name
      last_name
      phones {
        number
      }
    }
  }
`;
