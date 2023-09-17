import React from 'react';
import styled from '@emotion/styled';
import { clickable, stickyDiv } from '../styles/commonStyles';
import Image from 'next/image';

interface Header {
  title: string;
  back: boolean;
  onBack: () => void;
}

const Header: React.FC<Header> = ({ title, back, onBack }) => {
  return (
    <HeaderStyle>
      <div css={clickable}>
        {back && (
          <Image
            src="/icons/arrow-left-primary.svg"
            alt="Back Icon"
            width={20}
            height={30}
            onClick={onBack}
          />
        )}
      </div>
      <h1>{title}</h1>
    </HeaderStyle>
  );
};

const HeaderStyle = styled.header`
  ${stickyDiv}
  display: grid;
  grid-template-columns: 50px auto 50px;

  border-bottom: 1px solid #ccc;
  text-align: center;
  box-shadow: 0px 1px 1px 0px #ccc;
`;

export default Header;
