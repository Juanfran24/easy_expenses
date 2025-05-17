export interface Payment {
  id?: string;
  name: string;
  amount: number;
  expirationDate: Date;
  paymentSources: string[];
  categories: string[];
  alertDaysBefore: number | null;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isPaid?: boolean;
  paidDate?: Date | null;
}
