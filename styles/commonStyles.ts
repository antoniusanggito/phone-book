import { css } from '@emotion/react';

const fullCenter = css`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const clickable = css`
  cursor: pointer;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  transition: 0.15s;

  &:hover {
    filter: brightness(0.9);
  }
`;

const stickyDiv = css`
  position: sticky;
  top: 0;
  padding: 1rem 0;
  background-color: #fff;
`;

export { fullCenter, clickable, stickyDiv };
