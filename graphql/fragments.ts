import { gql } from '@apollo/client';

// unused, causes error in testing
export const CORE_CONTACT_FIELDS = gql`
  fragment CoreContactFields on contact {
    id
    first_name
    last_name
    phones {
      number
    }
  }
`;
