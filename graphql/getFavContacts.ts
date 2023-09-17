import { gql } from '@apollo/client';

export const GET_FAV_CONTACTS = gql`
  query GetFavContacts($favIds: [Int!], $like: String) {
    contact(
      order_by: [{ first_name: asc }, { last_name: asc }]
      where: {
        _and: [
          { id: { _in: $favIds } }
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
