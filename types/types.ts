interface IContact {
  id: number;
  first_name: string;
  last_name: string;
  phones: IPhone[];
}

interface IPhone {
  number: string;
}

interface IFavContact extends IContact {
  isFav: boolean;
}

export type { IContact, IPhone, IFavContact };
