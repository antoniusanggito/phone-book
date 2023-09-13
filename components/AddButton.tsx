import styled from '@emotion/styled';
import Image from 'next/image';
import React, { useState } from 'react';
import { fullCenter } from '../styles/commonStyles';

type Props = {
  onClick: () => void;
};

const ButtonStyle = styled.button`
  ${fullCenter}
  width: 60px;
  height: 60px;
  background-color: var(--clr-secondary);
  border-radius: 30px;
  color: #fff;

  &:hover {
    cursor: pointer;
  }
`;

const AddButton: React.FC<Props> = ({ onClick }) => {
  return (
    <ButtonStyle onClick={onClick}>
      <Image src="/icons/plus.svg" alt="Add Icon" width={24} height={24} />
    </ButtonStyle>
  );
};

export default AddButton;
