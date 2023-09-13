import { gql } from '@apollo/client';

export const DELETE_CONTACT = gql`
  mutation DeleteContact($id: Int!) {
    delete_contact_by_pk(id: $id) {
      id
    }
  }
`;
