import React from 'react';
import { useDeleteContactMutation } from '../generated/graphql';
import { DELETE_CONTACT } from '../graphql/deleteContact';

export const deleteContactMock = {
  delete_contact_by_pk: {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    __typename: 'contact',
  },
};

export const MockDeleteContactComponent: React.FC = () => {
  const [mutate, { data, loading, error }] = useDeleteContactMutation({
    onError: () => {},
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (data) return <p>Deleted {data.delete_contact_by_pk?.id}</p>;

  return (
    <div>
      <button onClick={() => mutate({ variables: { id: 1 } })}>Delete</button>
    </div>
  );
};

export const successDeleteContactMock = [
  {
    request: {
      query: DELETE_CONTACT,
      variables: { id: 1 },
    },
    result: {
      data: deleteContactMock,
    },
  },
];

export const errorDeleteContactMock = [
  {
    request: {
      query: DELETE_CONTACT,
      variables: { id: 1 },
    },
    error: new Error('An error occured'),
  },
];
