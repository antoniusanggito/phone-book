import { gql } from '@apollo/client';

// unused, combined in getRegContacts
export const COUNT_REG_CONTACTS = gql`
  query CountRegContacts($favIds: [Int!]) {
    contact_aggregate(where: { id: { _nin: $favIds } }) {
      aggregate {
        count
      }
    }
  }
`;
