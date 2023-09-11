import { gql } from '@apollo/client';

export const GET_CONTACTS = gql`
  query Contacts {
    contact {
      created_at
      updated_at
      first_name
      id
      last_name
      phones {
        contact_id
        created_ad
        id
        number
      }
    }
  }
`;
