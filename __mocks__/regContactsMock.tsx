import React from 'react';
import { useGetRegContactsQuery } from '../generated/graphql';
import { GET_REG_CONTACTS } from '../graphql/getRegContacts';

export const regContactsMock = {
  contact: [
    {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      phones: [
        {
          number: '+621',
          __typename: 'phone',
        },
      ],
      __typename: 'contact',
    },
    {
      id: 2,
      first_name: 'Dave',
      last_name: 'Doe',
      phones: [
        {
          number: '+6212',
          __typename: 'phone',
        },
      ],
      __typename: 'contact',
    },
  ],
};

export const MockRegContactsComponent: React.FC = () => {
  const { data, loading, error } = useGetRegContactsQuery({
    variables: { offset: 0, limit: 5, favIds: [4] },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div>
      {data?.contact.map((contact) => (
        <p key={contact.id}>{contact.first_name}</p>
      ))}
    </div>
  );
};

export const successRegContactsMock = [
  {
    request: {
      query: GET_REG_CONTACTS,
      variables: { offset: 0, limit: 5, favIds: [4] },
    },
    result: {
      data: regContactsMock,
    },
  },
];

export const errorRegContactsMock = [
  {
    request: {
      query: GET_REG_CONTACTS,
      variables: { offset: 0, limit: 5, favIds: [4] },
    },
    error: new Error('An error occured'),
  },
];
