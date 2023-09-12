import React from 'react';
import styled from '@emotion/styled';

const HeaderStyle = styled.header`
  text-align: center;
  padding: 1rem 0;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  position: sticky;
  top: 0;
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
