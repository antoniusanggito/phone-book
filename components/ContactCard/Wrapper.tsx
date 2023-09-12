import React from 'react';
import styled from '@emotion/styled';

interface WrapperProps {
  children: React.ReactNode;
}

const WrapperStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 700px;
  padding: 1rem;
  gap: 0.5rem;
`;

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <WrapperStyle>{children}</WrapperStyle>;
};

export default Wrapper;
