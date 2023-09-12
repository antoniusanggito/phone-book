import React, { useContext } from 'react';
import { IContact } from '../../types/types';
import styled from '@emotion/styled';
import Image from 'next/image';
import { css } from '@emotion/react';
import { FavContext, FavContextType } from '../context/favContext';

interface CardProps extends IContact {
  isFav: boolean;
}

const CardStyle = styled.div`
  display: grid;
  grid-template-columns: 2fr 10fr 2fr;
  border-bottom: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
  overflow: hidden;

  &:last-child {
    border-bottom: none;
  }
`;

const Card: React.FC<CardProps> = ({
  isFav,
  id,
  first_name,
  last_name,
  phones,
}) => {
  const { fav, setFav } = (useContext(FavContext) as FavContextType) ?? {};

  const toggleFav = () => {
    setFav((prev) => ({ ...prev, [id]: !fav[id] }));
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
            src="/icons/star-fill.svg"
            alt="Favorite Icon"
            width={20}
            height={20}
            onClick={toggleFav}
          />
        ) : (
          <Image
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
          {phones?.map((phone) => (
            <>
              <span
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
            </>
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
          src="/icons/delete.svg"
          alt="Delete Icon"
          width={20}
          height={20}
        />
      </div>
    </CardStyle>
  );
};

export default Card;
