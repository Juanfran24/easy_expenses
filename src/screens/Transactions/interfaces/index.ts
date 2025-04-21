export interface TransactionType {
  id: string;
  name: string;
  amount: number;
  description?: string;
  date: string;
  category: string;
  type: "income" | "expense";
}
