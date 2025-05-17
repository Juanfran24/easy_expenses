import { create } from "zustand";
import { getUserCategories } from "../services/categories";
import { Category } from "../models/Category";

export interface StoreState {
  currency: string;
  setCurrency: (currency: string) => void;
  incomeList: string[];
  setIncomeList: (incomeList: string[]) => void;
  expenseList: string[];
  setExpenseList: (expenseList: string[]) => void;
  categoryList: string[];
  setCategoryList: (categoryList: string[]) => void;
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

  categoryList: [],
  setCategoryList: (categoryList: string[]) => set({ categoryList }),

  categories: [],
  setCategories: (categories: Category[]) => set({ categories }),

  loadCategories: async () => {
    try {
      const categories = await getUserCategories();
      set({ categories });
    } catch (error) {
      console.error("Error al cargar las categorías:", error);
    }
  },
}));
