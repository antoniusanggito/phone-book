import styled from '@emotion/styled';
import React from 'react';
import { fullCenter } from '../../styles/commonStyles';

type Props = {
  onClick?: () => void;
  type: 'button' | 'submit' | 'reset' | undefined;
  role: 'primary' | 'secondary' | 'tertiary' | 'background';
  w?: number;
  h?: number;
  children: React.ReactNode;
};

const ButtonStyle = styled.button<{
  role: string;
  w: number | undefined;
  h: number | undefined;
}>`
  ${fullCenter}
  width: ${({ w }) => (w ? `${w}px` : 'auto')};
  height: ${({ h }) => (h ? `${h}px` : 'auto')};
  background-color: ${({ role }) =>
    role === 'primary'
      ? 'var(--clr-primary)'
      : role === 'secondary'
      ? 'var(--clr-secondary)'
      : role === 'tertiary'
      ? 'var(--clr-tertiary)'
      : 'var(--clr-background)'};
  /* border-radius: 30px; */
  color: #fff;

  &:hover {
    cursor: pointer;
  }
`;

const Button: React.FC<Props> = ({ onClick, type, role, children, w, h }) => {
  return (
    <ButtonStyle type={type} onClick={onClick} role={role} w={w} h={h}>
      {children}
    </ButtonStyle>
  );
};

export default Button;
