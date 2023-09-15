import React, { createContext, useState } from 'react';

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

interface PaginationProviderProps {
  children: React.ReactNode;
}

export const PaginationContext = createContext<PaginationContextType | {}>({});

function initState() {
  if (typeof window !== 'undefined') {
    const pagination = localStorage.getItem('PAGE');
    return pagination ? JSON.parse(pagination) : {};
  }
  return {};
}

const PaginationProvider: React.FC<PaginationProviderProps> = ({
  children,
}) => {
  const [pagination, setPagination] = useState<PaginationType>({
    offset: 0,
    like: '%%',
  });
  const limit = 10;
  const page = pagination.offset / limit + 1;

  // useEffect(() => {
  //   localStorage.setItem('pagination', JSON.stringify(pagination));
  // }, [pagination]);

  return (
    <PaginationContext.Provider
      value={{ pagination, limit, page, setPagination }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

export default PaginationProvider;
