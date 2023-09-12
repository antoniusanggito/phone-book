import { gql } from '@apollo/client';

export const GET_CONTACTS = gql`
  query Contacts {
    contact {
      id
      first_name
      last_name
      phones {
        id
        contact_id
        number
      }
    }
  }
`;
