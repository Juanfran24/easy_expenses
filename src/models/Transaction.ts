export interface Transaction {
  id?: string;
  name: string;
  amount: number;
  description?: string;
  date: string;
  category: string;
  type: "ingreso" | "gasto";
  paymentMethod: "cash" | "electronic";
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
