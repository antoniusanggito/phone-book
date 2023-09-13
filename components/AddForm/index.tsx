import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

interface AddFormProps {}

type FormValues = {
  first_name: string;
  last_name: string;
  phones: {
    number: string;
  }[];
};

const initialFormValues = {
  first_name: '',
  last_name: '',
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

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <FormStyle onSubmit={onSubmit}>
      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr 1fr;
        `}
      >
        <input type="text" id="first_name" {...register('first_name')} />
        <input type="text" id="last_name" {...register('last_name')} />
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
