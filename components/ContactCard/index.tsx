import React from 'react';
import { IContact } from '../../types/types';
import styled from '@emotion/styled';
import Image from 'next/image';
import { css } from '@emotion/react';

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
          />
        ) : (
          <Image
            src="/icons/star-empty.svg"
            alt="Not Favorite Icon"
            width={20}
            height={20}
          />
        )}
      </div>
      <div>
        <h4>
          {first_name} {last_name}
        </h4>
        <p>{phones?.map((phone) => phone.number)}</p>
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
