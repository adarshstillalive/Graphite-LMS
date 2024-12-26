export interface ITransaction {
  type: string;
  amount: number;
  date: Date;
}

export interface IWallet {
  userId: string;
  balance: number;
  transaction: ITransaction[];
  createdAt: Date;
  updatedAt: Date;
}
