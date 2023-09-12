import React, { createContext, useEffect, useState } from 'react';

export interface IFavContacts {
  [key: number]: boolean;
}

export interface FavContextType {
  fav: IFavContacts;
  setFav: React.Dispatch<React.SetStateAction<IFavContacts>>;
}

interface FavProviderProps {
  children: React.ReactNode;
}

export const FavContext = createContext<FavContextType | {}>({});

function initState() {
  if (typeof window !== 'undefined') {
    const fav = localStorage.getItem('FAV');
    return fav ? JSON.parse(fav) : {};
  }
  return {};
}

const FavProvider: React.FC<FavProviderProps> = ({ children }) => {
  const [fav, setFav] = useState<IFavContacts>(initState);

  useEffect(() => {
    localStorage.setItem('FAV', JSON.stringify(fav));
  }, [fav]);

  return (
    <FavContext.Provider value={{ fav, setFav }}>
      {children}
    </FavContext.Provider>
  );
};

export default FavProvider;
