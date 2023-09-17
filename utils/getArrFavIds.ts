import { IFavMap } from '../components/context/favContext';

const getArrFavIds = (fav: IFavMap) => {
  const arr: number[] = [];
  Object.keys(fav).forEach((key) => {
    const id = parseInt(key);
    if (fav[id]) arr.push(id);
  });
  return arr;
};

export default getArrFavIds;
