import { css } from '@emotion/react';
import { Dialog } from '@headlessui/react';
import React, { useEffect, useRef } from 'react';
import { IContact } from '../../../types/types';
import { useEditContactMutation } from '../../../generated/graphql';
import { useForm } from 'react-hook-form';
import Button from '../../shared/Button';
import styled from '@emotion/styled';
import { FormValues } from '../../AddForm';
import toast from 'react-hot-toast';
import { exclSpChar } from '../../../utils/filterKeyInput';

interface EditModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  contact: IContact;
}

const modalStyle = css`
  position: fixed;
  inset: 0;
  z-index: 30;
  overflow-y: hidden;
  background-color: rgba(0, 0, 0, 0.4);
`;

const modalContentStyle = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 90%;
  max-width: 500px;
  padding: 2rem;
  border-radius: 10px;
  z-index: 50;

  @media screen and (min-width: 768px) {
    padding: 3rem 5rem;
  }
`;

const FormStyle = styled.form`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  input[type='text'] {
    width: 95%;
    height: 2.5rem;
    padding: 0 10px;
  }

  label {
    font-size: 0.75rem;
    font-weight: bold;
  }
`;

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  setIsOpen,
  contact,
}) => {
  const { id, first_name, last_name, phones } = contact;
  const ref = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    ref.current?.focus();
    // if (document.activeElement) {
    //   const ref = document.activeElement as HTMLInputElement;
    //   ref.blur();
    // }
  }, [ref]);

  const [editContact, { data, loading, error }] = useEditContactMutation({
    onCompleted: (data) => {
      toast.success(
        `Updated contact ${data.update_contact_by_pk?.first_name} ${data.update_contact_by_pk?.last_name}`
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
    update(cache) {
      cache.evict({ fieldName: 'contact' });
      cache.gc();
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      firstName: first_name,
      lastName: last_name,
      phones,
    },
  });

  const onSubmit = handleSubmit((data) => {
    editContact({
      variables: {
        id,
        _set: {
          first_name: data.firstName,
          last_name: data.lastName,
        },
      },
    });
    setIsOpen(false);
  });

  const handleCancel = () => {
    reset();
    setIsOpen(false);
  };

  return (
    <Dialog
      css={modalStyle}
      initialFocus={undefined}
      open={isOpen}
      onClose={handleCancel}
    >
      <Dialog.Panel css={modalContentStyle}>
        <Dialog.Title>
          {first_name} {last_name}
        </Dialog.Title>
        <Dialog.Description>
          You may edit contact details here
        </Dialog.Description>

        <FormStyle onSubmit={onSubmit}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              maxLength={20}
              onKeyDown={exclSpChar}
              {...register('firstName', {
                required: '*First Name is required',
              })}
              tabIndex={-1}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              maxLength={20}
              onKeyDown={exclSpChar}
              {...register('lastName', {
                required: '*Last Name is required',
              })}
              tabIndex={-1}
            />
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
            <div
              css={css`
                display: flex;
                gap: 0.5rem;
              `}
            >
              <Button
                type="button"
                role="tertiary"
                onClick={handleCancel}
                w={80}
                h={40}
              >
                Cancel
              </Button>
              <Button type="submit" role="secondary" w={80} h={40}>
                Submit
              </Button>
            </div>
          </div>
        </FormStyle>
      </Dialog.Panel>
    </Dialog>
  );
};

export default EditModal;
