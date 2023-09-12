import React from 'react';
import styled from '@emotion/styled';
import { stickyDiv } from '../styles/commonStyles';

const HeaderStyle = styled.header`
  ${stickyDiv}
  border-bottom: 1px solid #ccc;
  text-align: center;
  box-shadow: 0px 1px 1px 0px #ccc;
`;

const Header: React.FC = () => {
  return (
    <HeaderStyle>
      <h1>Contacts</h1>
    </HeaderStyle>
  );
};

export default Header;
