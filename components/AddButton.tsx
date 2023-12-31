import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import Button from './shared/Button';
import { css } from '@emotion/react';

type Props = {
  onClick?: () => void;
};

const AddButton: React.FC<Props> = ({ onClick }) => {
  return (
    <div css={AddButtonWrapper}>
      <Button type="button" info="secondary" w={60} h={60} r={30}>
        <Link href="/form">
          <Image src="/icons/plus.svg" alt="Add Icon" width={24} height={24} />
        </Link>
      </Button>
    </div>
  );
};

const AddButtonWrapper = css`
  position: fixed;
  bottom: 2rem;
  right: 2rem;

  @media screen and (min-width: 768px) {
    bottom: 5rem;
    right: 10rem;
  }
`;

export default AddButton;
