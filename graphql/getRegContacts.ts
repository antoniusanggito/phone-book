import { gql } from '@apollo/client';

export const GET_REG_CONTACTS = gql`
  query GetRegContacts(
    $offset: Int
    $limit: Int
    $favIds: [Int!]
    $like: String
  ) {
    contact(
      offset: $offset
      limit: $limit
      where: {
        _and: [
          { id: { _nin: $favIds } }
          {
            _or: [
              { first_name: { _ilike: $like } }
              { last_name: { _ilike: $like } }
            ]
          }
        ]
      }
    ) {
      id
      first_name
      last_name
      phones {
        number
      }
    }
  }
`;
