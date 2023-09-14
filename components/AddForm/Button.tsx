import styled from '@emotion/styled';
import React from 'react';

type Props = {
  onClick: () => void;
  role: 'primary' | 'secondary' | 'tertiary' | 'background';
  children: React.ReactNode;
};

const ButtonStyle = styled.button<{ role: string }>`
  width: 30px;
  height: 30px;
  background-color: ${({ role }) =>
    role === 'primary'
      ? 'var(--clr-primary)'
      : role === 'secondary'
      ? 'var(--clr-secondary)'
      : role === 'tertiary'
      ? 'var(--clr-tertiary)'
      : 'var(--clr-background)'};
  border-radius: 30px;
  color: #fff;

  &:hover {
    cursor: pointer;
  }
`;

const Button: React.FC<Props> = ({ onClick, role, children }) => {
  return (
    <ButtonStyle type="button" onClick={onClick} role={role}>
      {children}
    </ButtonStyle>
  );
};

export default Button;
