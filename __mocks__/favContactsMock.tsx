import React from 'react';
import { useGetFavContactsQuery } from '../generated/graphql';
import { GET_FAV_CONTACTS } from '../graphql/getFavContacts';

export const favContactsMock = {
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

export const MockFavContactsComponent: React.FC = () => {
  const { data, loading, error } = useGetFavContactsQuery({
    variables: { favIds: [1, 2] },
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

export const successFavContactsMock = [
  {
    request: {
      query: GET_FAV_CONTACTS,
      variables: { favIds: [1, 2] },
    },
    result: {
      data: favContactsMock,
    },
  },
];

export const errorFavContactsMock = [
  {
    request: {
      query: GET_FAV_CONTACTS,
      variables: { favIds: [1, 2] },
    },
    error: new Error('An error occured'),
  },
];
