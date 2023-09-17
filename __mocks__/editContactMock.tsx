import React from 'react';
import { useEditContactMutation } from '../generated/graphql';
import { EDIT_CONTACT } from '../graphql/editContact';

export const editContactMock = {
  update_contact_by_pk: {
    id: 1,
    first_name: 'Johnny',
    last_name: 'Doe',
    phones: [
      {
        number: '123',
        __typename: 'phone',
      },
    ],
    __typename: 'contact',
  },
};

export const MockEditContactComponent: React.FC = () => {
  const [mutate, { data, loading, error }] = useEditContactMutation({
    onError: () => {},
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (data)
    return (
      <p>
        Edited to {data.update_contact_by_pk?.first_name}{' '}
        {data.update_contact_by_pk?.last_name}
      </p>
    );

  return (
    <div>
      <button
        onClick={() =>
          mutate({
            variables: {
              id: 1,
              _set: {
                first_name: 'Johnny',
                last_name: 'Doe',
              },
            },
          })
        }
      >
        Edit
      </button>
    </div>
  );
};

export const successEditContactMock = [
  {
    request: {
      query: EDIT_CONTACT,
      variables: {
        id: 1,
        _set: {
          first_name: 'Johnny',
          last_name: 'Doe',
        },
      },
    },
    result: {
      data: editContactMock,
    },
  },
];

export const errorEditContactMock = [
  {
    request: {
      query: EDIT_CONTACT,
      variables: {
        id: 1,
        _set: {
          first_name: 'Johnny',
          last_name: 'Doe',
        },
      },
    },
    error: new Error('An error occured'),
  },
];
