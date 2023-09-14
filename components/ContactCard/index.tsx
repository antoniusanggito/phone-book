import React, { useContext } from 'react';
import { IFavContact } from '../../types/types';
import styled from '@emotion/styled';
import Image from 'next/image';
import { css } from '@emotion/react';
import { FavContext, FavContextType } from '../context/favContext';
import { clickable } from '../../styles/commonStyles';
import {
  GetFavContactsQuery,
  GetRegContactsQuery,
  useDeleteContactMutation,
} from '../../generated/graphql';
import { GET_REG_CONTACTS } from '../../graphql/getRegContacts';
import { GET_FAV_CONTACTS } from '../../graphql/getFavContacts';
import getFavIds from '../../utils/getFavIdQuery';
import {
  PaginationContext,
  PaginationContextType,
} from '../context/paginationContext';

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
  const { pagination, limit } =
    (useContext(PaginationContext) as PaginationContextType) ?? {};
  const favIds = getFavIds(fav);

  const [deleteContact] = useDeleteContactMutation({
    variables: { id },
    update(cache, { data }) {
      // update cache favContacts & regContacts
      if (isFav) {
        const existingFavContacts = cache.readQuery<GetFavContactsQuery>({
          query: GET_FAV_CONTACTS,
          variables: { favIds },
        });
        existingFavContacts &&
          cache.writeQuery({
            query: GET_FAV_CONTACTS,
            variables: { favIds },
            data: {
              contact: existingFavContacts.contact.filter(
                (contact) => contact.id !== id
              ),
            },
          });
      } else {
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
              contact: existingRegContacts.contact.filter(
                (contact) => contact.id !== id
              ),
              // count - 1?
              contact_aggregate: {
                aggregate: {
                  count: existingRegContacts.contact_aggregate.aggregate
                    ?.count as number,
                },
              },
            },
          });
      }
    },
  });

  const toggleFav = () => {
    setFav((prev) => ({ ...prev, [id]: !fav[id] }));
  };

  const handleDelete = async () => {
    await deleteContact();
    delete fav[id];
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
