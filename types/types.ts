interface IContact {
  id: number;
  first_name: string;
  last_name: string;
  phones: IPhone[];
}

interface IPhone {
  id: number;
  contact_id: number;
  number: string;
}

export type { IContact, IPhone };
