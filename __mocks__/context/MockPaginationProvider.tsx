import React, { createContext, useState } from 'react';
import {
  PaginationContext,
  PaginationProviderProps,
  PaginationType,
} from '../../components/context/paginationContext';

const MockPaginationProvider: React.FC<PaginationProviderProps> = ({
  children,
}) => {
  const [pagination, setPagination] = useState<PaginationType>({
    offset: 0,
    like: '',
  });

  const mockValue = {
    pagination,
    limit: 10,
    page: 1,
    setPagination,
  };

  return (
    <PaginationContext.Provider value={mockValue}>
      {children}
    </PaginationContext.Provider>
  );
};

export default MockPaginationProvider;
