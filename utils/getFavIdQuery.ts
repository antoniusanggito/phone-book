import { IFavMap } from '../components/context/favContext';

const getFavIds = (fav: IFavMap) => {
  const res: number[] = [];
  Object.keys(fav).forEach((key) => {
    if (fav[parseInt(key)]) res.push(parseInt(key));
  });
  return res;
};

export default getFavIds;
