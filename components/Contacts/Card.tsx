import React, { useContext, useState } from 'react';
import { IContact } from '../../types/types';
import styled from '@emotion/styled';
import Image from 'next/image';
import { css } from '@emotion/react';
import { FavContext, FavContextType } from '../context/favContext';
import { clickable } from '../../styles/commonStyles';
import { useDeleteContactMutation } from '../../generated/graphql';
import toast from 'react-hot-toast';
import EditModal from './EditModal';

interface CardProps {
  isFav: boolean;
  contact: IContact;
}

const CardStyle = styled.div`
  display: grid;
  grid-template-columns: 2fr 10fr 2fr;
  min-height: 60px;
  border-bottom: 1px solid #ccc;
  align-content: center;
  padding: 8px 0;
  text-align: left;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: var(--clr-background);
  }
`;

const Card: React.FC<CardProps> = ({ isFav, contact }) => {
  const { id, first_name, last_name, phones } = contact;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { fav, setFav } = (useContext(FavContext) as FavContextType) ?? {};

  const [deleteContact] = useDeleteContactMutation({
    variables: { id },
    onCompleted: (data) => {
      toast.success(
        `Deleted contact ${data.delete_contact_by_pk?.first_name} ${data.delete_contact_by_pk?.last_name}`
      );
    },
    // delete contact cache to re-request updated pagination
    update(cache) {
      cache.evict({ fieldName: 'contact' });
      cache.gc();
    },
    // // not needed to refetch after deleting cache
    // refetchQueries: [
    //   {
    //     query: GET_REG_CONTACTS,
    //     variables: {
    //       offset: pagination.offset,
    //       limit,
    //       favIds: getFavIds(fav),
    //       like: pagination.like,
    //     },
    //   },
    // ],
  });

  const toggleFav = () => {
    setFav((prev) => {
      const prevFav = fav[id];
      if (prevFav) {
        toast.success(`Removed ${first_name} ${last_name} from favorite`);
      } else {
        toast.success(`Added ${first_name} ${last_name} to favorite`);
      }
      return { ...prev, [id]: !prevFav };
    });
  };

  const handleDelete = async () => {
    await deleteContact();
    delete fav[id];
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  return (
    <CardStyle key={id}>
      <EditModal isOpen={isOpen} setIsOpen={setIsOpen} contact={contact} />
      <div
        css={css`
          justify-self: center;
          align-self: center;
          margin-right: 1rem;
        `}
      >
        {isFav ? (
          <Image
            css={clickable}
            src="/icons/star-fill.svg"
            alt="Favorite Icon"
            width={20}
            height={20}
            onClick={toggleFav}
          />
        ) : (
          <Image
            css={clickable}
            src="/icons/star-empty.svg"
            alt="Not Favorite Icon"
            width={20}
            height={20}
            onClick={toggleFav}
          />
        )}
      </div>
      <div
        css={css`
          cursor: pointer;
        `}
        onClick={handleOpenModal}
      >
        <h4>
          {first_name} {last_name}
        </h4>
        <div>
          {phones?.map((phone, i) => (
            <span
              key={i}
              css={css`
                margin-right: 1rem;
              `}
            >
              <Image
                css={css`
                  margin-right: 0.25rem;
                `}
                src="/icons/phone.svg"
                alt="Not Favorite Icon"
                width={10}
                height={10}
              />
              {phone.number}
            </span>
          ))}
        </div>
      </div>
      <div
        css={css`
          justify-self: center;
          align-self: center;
        `}
      >
        <Image
          css={clickable}
          src="/icons/delete.svg"
          alt="Delete Icon"
          width={20}
          height={20}
          onClick={handleDelete}
        />
      </div>
    </CardStyle>
  );
};

export default Card;
