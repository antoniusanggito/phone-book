import styled from '@emotion/styled';
import Image from 'next/image';
import React from 'react';
import { fullCenter } from '../../styles/commonStyles';

type Props = {
  type: 'prev' | 'next';
  onClick: () => void;
  disabled: boolean;
};

const ButtonStyle = styled.button`
  ${fullCenter}
  width: auto;
  height: 30px;
  background-color: var(--clr-secondary);
  color: #fff;

  &:disabled {
    background-color: #ccc;
  }

  &:hover {
    cursor: pointer;
  }
`;

const PaginationButton: React.FC<Props> = ({ type, onClick, disabled }) => {
  return (
    <>
      {type === 'prev' && (
        <ButtonStyle
          data-testid="prevBtn"
          onClick={onClick}
          disabled={disabled}
        >
          <Image
            src="/icons/arrow-left.svg"
            alt="Previous Page Icon"
            width={16}
            height={16}
          />
        </ButtonStyle>
      )}
      {type === 'next' && (
        <ButtonStyle
          data-testid="nextBtn"
          onClick={onClick}
          disabled={disabled}
        >
          <Image
            src="/icons/arrow-right.svg"
            alt="Next Page Icon"
            width={16}
            height={16}
          />
        </ButtonStyle>
      )}
    </>
  );
};

export default PaginationButton;
