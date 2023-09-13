import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useAddContactMutation } from '../../generated/graphql';

interface AddFormProps {}

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

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const AddForm: React.FC = () => {
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

  const [addContact] = useAddContactMutation();

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
    <FormStyle onSubmit={onSubmit}>
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
    </FormStyle>
  );
};

export default AddForm;
