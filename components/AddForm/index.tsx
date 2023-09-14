import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useContext } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import {
  GetRegContactsQuery,
  useAddContactMutation,
} from '../../generated/graphql';
import { GET_REG_CONTACTS } from '../../graphql/getRegContacts';
import { FavContext, FavContextType } from '../context/favContext';
import {
  PaginationContext,
  PaginationContextType,
} from '../context/paginationContext';
import getFavIds from '../../utils/getFavIdQuery';

type FormValues = {
  firstName: string;
  lastName: string;
  phones: {
    number: string;
  }[];
};

const initialFormValues = {
  firstName: '',
  lastName: '',
  phones: [{ number: '' }],
};

const FormWrapper = styled.section`
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const AddForm: React.FC = () => {
  const { fav } = (useContext(FavContext) as FavContextType) ?? {};
  const { pagination, limit } =
    (useContext(PaginationContext) as PaginationContextType) ?? {};
  const favIds = getFavIds(fav);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: initialFormValues });

  const { fields, append, remove } = useFieldArray({
    name: 'phones',
    control,
  });

  const [addContact] = useAddContactMutation({
    update(cache, { data }) {
      console.log(data);
      const existingRegContacts = cache.readQuery<GetRegContactsQuery>({
        query: GET_REG_CONTACTS,
        variables: {
          offset: pagination.offset,
          limit,
          favIds,
          like: pagination.like,
        },
      });
      existingRegContacts &&
        cache.writeQuery({
          query: GET_REG_CONTACTS,
          variables: {
            offset: pagination.offset,
            limit,
            favIds,
            like: pagination.like,
          },
          data: {
            contact: existingRegContacts.contact.concat(
              data?.insert_contact?.returning[0] as any
            ),
            // count + 1?
            contact_aggregate: {
              aggregate: {
                count: existingRegContacts.contact_aggregate.aggregate
                  ?.count as number,
              },
            },
          },
        });
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    addContact({
      variables: {
        first_name: data.firstName,
        last_name: data.lastName,
        phones: data.phones,
      },
    });
  });

  return (
    <FormWrapper>
      <form onSubmit={onSubmit}>
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr 1fr;
          `}
        >
          <input type="text" id="firstName" {...register('firstName')} />
          <input type="text" id="lastName" {...register('lastName')} />
        </div>
        <label>Phone numbers</label>
        <div>
          {fields.map((field, index) => (
            <div key={field.id}>
              <input
                type="text"
                id="phones"
                {...register(`phones.${index}.number` as const)}
              />
              {index > 0 && (
                <button type="button" onClick={() => remove(index)}>
                  Remove phone number
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => append({ number: '' })}>
            Add another phone number
          </button>
        </div>

        <input type="submit" />
      </form>
    </FormWrapper>
  );
};

export default AddForm;
