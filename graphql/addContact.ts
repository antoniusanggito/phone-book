import { gql } from '@apollo/client';

export const ADD_CONTACT = gql`
  mutation AddContact(
    $first_name: String!
    $last_name: String!
    $phones: [phone_insert_input!]!
  ) {
    insert_contact(
      objects: {
        first_name: $first_name
        last_name: $last_name
        phones: { data: $phones }
      }
    ) {
      returning {
        id
        first_name
        last_name
        phones {
          number
        }
      }
    }
  }
`;
