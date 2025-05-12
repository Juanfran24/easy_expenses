export interface Transaction {
  id?: string;
  name: string;
  amount: number;
  description?: string;
  date: Date;
  category: string;
  type: "ingreso" | "gasto";
  paymentMethod: "cash" | "electronic";
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  endDate?: Date | null;
  localTypeTransaction?: "fijo" | "variable";
  dayOfMonth?: number | null;
}
