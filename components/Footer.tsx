import React from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';

const FooterStyle = styled.footer`
  padding: 2rem 0;
  background-color: var(--clr-background);
  box-shadow: 3px 3px 3px 3px var(--clr-background);
  font-weight: lighter;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }

  a > h4 {
    font-weight: lighter;
    margin-right: 0.5rem;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterStyle>
      <a
        href="https://github.com/antoniusanggito"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h4>Made with love </h4>
        <Image
          src="/github-mark.svg"
          alt="Github Logo"
          width={20}
          height={20}
        />
      </a>
    </FooterStyle>
  );
};

export default Footer;
