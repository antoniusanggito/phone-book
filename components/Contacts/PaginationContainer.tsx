import styled from '@emotion/styled';
import React, { useContext } from 'react';
import PaginationButton from './PaginationButton';
import {
  PaginationContext,
  PaginationContextType,
} from '../context/paginationContext';
import { css } from '@emotion/react';
import { GetRegContactsQuery } from '../../generated/graphql';

interface PaginationProps {
  dataReg: GetRegContactsQuery;
}

const PaginationContainer: React.FC<PaginationProps> = ({ dataReg }) => {
  const { limit, page, setPagination } =
    (useContext(PaginationContext) as PaginationContextType) ?? {};

  const handlePrev = () => {
    setPagination((prev) => ({
      ...prev,
      offset: prev.offset - limit < 0 ? 0 : prev.offset - limit,
    }));
  };

  const handleNext = () => {
    setPagination((prev) => ({ ...prev, offset: prev.offset + limit }));
  };

  return (
    <PaginationContainerStyle>
      <PaginationButton type="prev" onClick={handlePrev} disabled={page == 1} />
      <h4
        css={css`
          margin: 0 1rem;
        `}
      >
        {page}
      </h4>
      <PaginationButton
        type="next"
        onClick={handleNext}
        disabled={
          page * limit >= (dataReg.contact_aggregate.aggregate?.count as number)
        }
      />
    </PaginationContainerStyle>
  );
};

const PaginationContainerStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin: 2rem 0;
`;

export default PaginationContainer;
