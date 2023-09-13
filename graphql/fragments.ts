import { gql } from '@apollo/client';

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
