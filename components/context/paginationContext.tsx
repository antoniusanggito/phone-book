import React, { createContext, useEffect, useState } from 'react';

export interface PaginationType {
  offset: number;
  like: string;
}

export interface PaginationContextType {
  pagination: PaginationType;
  limit: number;
  page: number;
  setPagination: React.Dispatch<React.SetStateAction<PaginationType>>;
}

export interface PaginationProviderProps {
  children: React.ReactNode;
}

export const PaginationContext = createContext<PaginationContextType | {}>({});

function initState() {
  if (typeof window !== 'undefined') {
    const pagination = localStorage.getItem('PAGE');
    return pagination ? JSON.parse(pagination) : { offset: 0, like: '%%' };
  }
  return {};
}

const PaginationProvider: React.FC<PaginationProviderProps> = ({
  children,
}) => {
  const [pagination, setPagination] = useState<PaginationType>(initState());
  const limit = 10;
  const page = pagination.offset / limit + 1;

  useEffect(() => {
    localStorage.setItem('PAGE', JSON.stringify(pagination));
  }, [pagination]);

  return (
    <PaginationContext.Provider
      value={{ pagination, limit, page, setPagination }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

export default PaginationProvider;
