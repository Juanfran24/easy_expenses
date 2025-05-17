import { create } from "zustand";
import { getUserCategories } from "../services/categories";
import { Category } from "../models/Category";
import { Transaction } from "../models/Transaction";
import { getUserTransactions } from "../services/transactions";

export interface StoreState {
  currency: string;
  setCurrency: (currency: string) => void;
  transactions: Transaction[];
  setTransactionList: (transactionList: Transaction[]) => void;
  loadTransactions: () => Promise<void>;
  incomeList: string[];
  setIncomeList: (incomeList: string[]) => void;
  expenseList: string[];
  setExpenseList: (expenseList: string[]) => void;  
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  loadCategories: () => Promise<void>;
}

export const useStore = create<StoreState>((set) => ({
  currency: "MXN",
  setCurrency: (currency: string) => set({ currency }),

  incomeList: [],
  setIncomeList: (incomeList: string[]) => set({ incomeList }),

  expenseList: [],
  setExpenseList: (expenseList: string[]) => set({ expenseList }),

  categories: [],
  setCategories: (categories: Category[]) => set({ categories }),

  transactions: [],
  setTransactionList: (transactions: Transaction[]) => set({ transactions: transactions }),

  loadCategories: async () => {
    try {
      const categories = await getUserCategories();
      set({ categories });
    } catch (error) {
      console.error("Error al cargar las categorías:", error);
    }
  },

  loadTransactions: async () => {
    try {
      const transactions = await getUserTransactions();
      set({ transactions: transactions });
    }
    catch (error) {
      console.error("Error al cargar las transacciones:", error);
    }
  }
}));
