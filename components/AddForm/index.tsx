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
import Button from '../shared/Button';
import toast from 'react-hot-toast';

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
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  /* border: 1px solid #bbb; */
  padding: 0.5rem;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
  }

  input[type='text'],
  input[type='tel'] {
    width: 100%;
    height: 2.5rem;
    padding: 0 10px;
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
    reset,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: initialFormValues });

  const { fields, append, remove } = useFieldArray({
    name: 'phones',
    control,
  });

  const [addContact] = useAddContactMutation({
    onCompleted: (data) => {
      toast.success(
        `Contact ${data.insert_contact?.returning[0].first_name} ${data.insert_contact?.returning[0].last_name} has been added`
      );
    },
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
    reset();
  });

  return (
    <FormWrapper>
      <h3
        css={css`
          margin-bottom: 0.5rem;
        `}
      >
        Add Contact
      </h3>
      <form onSubmit={onSubmit}>
        <div
          css={css`
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: 0.25rem;
          `}
        >
          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            maxLength={20}
            {...register('firstName', {
              required: '*First Name is required',
            })}
          />
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            maxLength={20}
            {...register('lastName', {
              required: '*Last Name is required',
            })}
          />
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          `}
        >
          {fields.map((field, index) => (
            <div
              css={css`
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                gap: 0.25rem;
              `}
              key={field.id}
            >
              {index > 0 && (
                <Button
                  type="button"
                  role="tertiary"
                  onClick={() => remove(index)}
                >
                  -
                </Button>
              )}
              <input
                type="tel"
                id="phones"
                maxLength={20}
                placeholder={
                  index > 0 ? `Phone Number ${index + 1}` : 'Phone Number'
                }
                {...register(`phones.${index}.number` as const, {
                  required: 'Input Phone Number',
                  pattern: {
                    value: /^[0-9\b+\-.]+$/,
                    message: 'Input a valid phone number',
                  },
                  minLength: {
                    value: 3,
                    message: 'Input a valid phone number',
                  },
                })}
              />
              {index == 0 && (
                <Button
                  type="button"
                  role="secondary"
                  onClick={() => append({ number: '' })}
                >
                  +
                </Button>
              )}
            </div>
          ))}
        </div>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 0.5rem;
          `}
        >
          <div>
            {errors.firstName && <p>{`${errors.firstName.message}`}</p>}
            {errors.lastName && <p>{`${errors.lastName.message}`}</p>}
          </div>
          <input
            css={css`
              width: fit-content;
              padding: 4px 6px;
              background-color: var(--clr-secondary);
              color: #fff;
            `}
            type="submit"
          />
        </div>
      </form>
    </FormWrapper>
  );
};

export default AddForm;
