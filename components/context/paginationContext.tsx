import React, { createContext, useEffect, useState } from 'react';

export interface PaginationContextType {
  offset: number;
  limit: number;
  page: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
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
  const [offset, setOffset] = useState<number>(0);
  const limit = 5;
  const page = offset / limit + 1;

  // useEffect(() => {
  //   localStorage.setItem('pagination', JSON.stringify(pagination));
  // }, [pagination]);

  return (
    <PaginationContext.Provider value={{ offset, limit, page, setOffset }}>
      {children}
    </PaginationContext.Provider>
  );
};

export default PaginationProvider;
