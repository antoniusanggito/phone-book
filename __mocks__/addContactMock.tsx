import React from 'react';
import { useAddContactMutation } from '../generated/graphql';
import { ADD_CONTACT } from '../graphql/addContact';

export const addContactMock = {
  insert_contact: {
    returning: [
      {
        id: 2,
        first_name: 'Dave',
        last_name: 'Doe',
        phones: [
          {
            number: '11111',
            __typename: 'phone',
          },
        ],
        __typename: 'contact',
      },
    ],
    __typename: 'contact_mutation_response',
  },
};

export const MockAddContactComponent: React.FC = () => {
  const [mutate, { data, loading, error }] = useAddContactMutation({
    onError: () => {},
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (data) return <p>Added {data.insert_contact?.returning[0].id}</p>;

  return (
    <div>
      <button
        onClick={() =>
          mutate({
            variables: {
              first_name: 'Dave',
              last_name: 'Doe',
              phones: [{ number: '11111' }],
            },
          })
        }
      >
        Add
      </button>
    </div>
  );
};

export const successAddContactMock = [
  {
    request: {
      query: ADD_CONTACT,
      variables: {
        first_name: 'Dave',
        last_name: 'Doe',
        phones: [{ number: '11111' }],
      },
    },
    result: {
      data: addContactMock,
    },
  },
];

export const errorAddContactMock = [
  {
    request: {
      query: ADD_CONTACT,
      variables: {
        first_name: 'Dave',
        last_name: 'Doe',
        phones: [{ number: '11111' }],
      },
    },
    error: new Error('An error occured'),
  },
];
