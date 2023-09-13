import React from 'react';
import { useCountRegContactsQuery } from '../generated/graphql';
import { COUNT_REG_CONTACTS } from '../graphql/countRegContacts';

export const countRegContactsMock = {
  contact_aggregate: {
    aggregate: {
      count: 2,
      __typename: 'contact_aggregate_fields',
    },
    __typename: 'contact_aggregate',
  },
};

export const MockCountRegContactsComponent: React.FC = () => {
  const { data, loading, error } = useCountRegContactsQuery({
    variables: { favIds: [1, 2] },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return <div>{data?.contact_aggregate.aggregate?.count}</div>;
};

export const successCountRegContactsMock = [
  {
    request: {
      query: COUNT_REG_CONTACTS,
      variables: { favIds: [1, 2] },
    },
    result: {
      data: countRegContactsMock,
    },
  },
];

export const errorCountRegContactsMock = [
  {
    request: {
      query: COUNT_REG_CONTACTS,
      variables: { favIds: [1, 2] },
    },
    error: new Error('An error occured'),
  },
];
