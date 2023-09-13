import { IFavMap } from '../components/context/favContext';

const getFavIdQuery = (fav: IFavMap) =>
  Object.keys(fav).map((key) => {
    if (fav[parseInt(key)]) {
      return `{id: {_eq: ${parseInt(key)}}}`;
    }
  });

export default getFavIdQuery;
