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
  contact_aggregate: {
    aggregate: {
      count: 2,
      __typename: 'contact_aggregate_fields',
    },
    __typename: 'contact_aggregate',
  },
};

export const MockRegContactsComponent: React.FC = () => {
  const { data, loading, error } = useGetRegContactsQuery({
    variables: { offset: 0, limit: 5, favIds: [4], like: '%%' },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div>
      {data?.contact.map((contact) => (
        <p key={contact.id}>{contact.first_name}</p>
      ))}
      <p>{data?.contact_aggregate.aggregate?.count}</p>
    </div>
  );
};

export const successRegContactsMock = [
  {
    request: {
      query: GET_REG_CONTACTS,
      variables: { offset: 0, limit: 5, favIds: [4], like: '%%' },
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
      variables: { offset: 0, limit: 5, favIds: [4], like: '%%' },
    },
    error: new Error('An error occured'),
  },
];
