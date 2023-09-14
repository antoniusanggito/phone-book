import React from 'react';
import styled from '@emotion/styled';

interface WrapperProps {
  children: React.ReactNode;
}

const MainWrapperStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  max-width: 700px;
  padding: 1rem;
  gap: 0.5rem;
`;

const MainWrapper: React.FC<WrapperProps> = ({ children }) => {
  return <MainWrapperStyle>{children}</MainWrapperStyle>;
};

export default MainWrapper;
