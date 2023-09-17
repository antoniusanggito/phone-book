import { gql } from '@apollo/client';

export const CHECK_CONTACT = gql`
  query checkContact($first_name: String!, $last_name: String!) {
    contact(
      limit: 1
      where: {
        _and: [
          { first_name: { _eq: $first_name } }
          { last_name: { _eq: $last_name } }
        ]
      }
    ) {
      id
    }
  }
`;
