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

interface FormValues {
  firstName: string;
  lastName: string;
  phones: {
    number: string;
  }[];
}

export type { IContact, IPhone, IFavContact, FormValues };
