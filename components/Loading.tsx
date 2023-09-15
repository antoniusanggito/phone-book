import styled from '@emotion/styled';
import React from 'react';
import { fullCenter } from '../styles/commonStyles';

type Props = {};

const LoadingWrapper = styled.div`
  ${fullCenter}
  min-height: 80vh;
`;

const Loading: React.FC = (props: Props) => {
  return <LoadingWrapper>Loading Data. . .</LoadingWrapper>;
};

export default Loading;
