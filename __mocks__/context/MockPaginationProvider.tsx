import React, { useState } from 'react';
import {
  PaginationContext,
  PaginationProviderProps,
  PaginationType,
} from '../../components/context/paginationContext';

interface MockPaginationProviderProps {
  children: React.ReactNode;
  offset?: number;
  like?: string;
  limit?: number;
  page?: number;
}

const MockPaginationProvider: React.FC<MockPaginationProviderProps> = ({
  children,
  offset = 0,
  like = '%%',
  limit = 10,
  page = 1,
}) => {
  const [pagination, setPagination] = useState<PaginationType>({
    offset,
    like,
  });

  const mockValue = {
    pagination,
    limit,
    page,
    setPagination,
  };

  return (
    <PaginationContext.Provider value={mockValue}>
      {children}
    </PaginationContext.Provider>
  );
};

export default MockPaginationProvider;
