export type AuthResponse = {
  success: boolean;
  message: string;
  userId?: string;
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type LoginResponse = {
  message: string;
  userId: string;
};
export type RegisterResponse = {
  message: string;
  userId: string;
};
export type VerifyResponse = {
  message?:string;
  accessToken: string;
  refreshToken: string;
};

export type User = {
  id: string;
  email: string;
  firstName: string;
  phoneNumber: string;
  accounts: Account[];
  createdAt: string;
  updatedAt: string;
};

export type UserResponse = {
  message?: string;
  user: User;
};

export type Account = {
  id: string;
  userId?: string;
  accountNumber: string;
  balance: number;
  user?: User;
  sentTransaction: Transaction[];
  receivedTransactions: Transaction[];
  createdAt: string;
  updatedAt: string;
};

export type Transaction = {
  id: string;
  sourceAccountId: string;
  destinationAccountId: string;
  amount: number;
  reference?: string;
  status: string;
  date: string;
  sourceAccount: Account;
  destinationAccount: Account;
};
