import React, { useContext } from 'react';
import { IFavContact } from '../../types/types';
import styled from '@emotion/styled';
import Image from 'next/image';
import { css } from '@emotion/react';
import { FavContext, FavContextType } from '../context/favContext';
import { clickable } from '../../styles/commonStyles';
import {
  ContactsQuery,
  useDeleteContactMutation,
} from '../../generated/graphql';
import { GET_CONTACTS } from '../../graphql/clientQueries';

const CardStyle = styled.div`
  display: grid;
  grid-template-columns: 2fr 10fr 2fr;
  border-bottom: 1px solid #ccc;
  padding-bottom: 0.5rem;
  text-align: left;

  &:last-child {
    border-bottom: none;
  }
`;

const Card: React.FC<IFavContact> = ({
  isFav,
  id,
  first_name,
  last_name,
  phones,
}) => {
  const { fav, setFav } = (useContext(FavContext) as FavContextType) ?? {};
  const [deleteContact] = useDeleteContactMutation({
    variables: { id: id },
    update(cache, { data }) {
      const existingContacts = cache.readQuery<ContactsQuery>({
        query: GET_CONTACTS,
      });
      if (existingContacts) {
        const newContacts = existingContacts.contact.filter(
          (contact) => contact.id !== id
        );
        cache.writeQuery<ContactsQuery>({
          query: GET_CONTACTS,
          data: { contact: newContacts },
        });
      }
    },
  });

  const toggleFav = () => {
    setFav((prev) => ({ ...prev, [id]: !fav[id] }));
  };

  const handleDelete = async () => {
    console.log('deleting');
    await deleteContact();
  };

  return (
    <CardStyle key={id}>
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
      <div>
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
