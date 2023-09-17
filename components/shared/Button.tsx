import styled from '@emotion/styled';
import React from 'react';
import { clickable, fullCenter } from '../../styles/commonStyles';

type Props = {
  onClick?: () => void;
  type: 'button' | 'submit' | 'reset' | undefined;
  info: 'primary' | 'secondary' | 'tertiary' | 'background';
  w?: number;
  h?: number;
  r?: number;
  children: React.ReactNode;
};

const Button: React.FC<Props> = ({
  onClick,
  type,
  info,
  children,
  w,
  h,
  r,
}) => {
  return (
    <ButtonStyle type={type} onClick={onClick} info={info} w={w} h={h} r={r}>
      {children}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button<{
  info: string;
  w: number | undefined;
  h: number | undefined;
  r: number | undefined;
}>`
  ${clickable}
  ${fullCenter}
  width: ${({ w }) => (w ? `${w}px` : 'auto')};
  height: ${({ h }) => (h ? `${h}px` : 'auto')};
  background-color: ${({ info }) =>
    info === 'primary'
      ? 'var(--clr-primary)'
      : info === 'secondary'
      ? 'var(--clr-secondary)'
      : info === 'tertiary'
      ? 'var(--clr-tertiary)'
      : 'var(--clr-background)'};
  border-radius: ${({ r }) => (r ? `${r}px` : '0')};
  color: #fff;

  &:hover {
    cursor: pointer;
  }
`;

export default Button;
