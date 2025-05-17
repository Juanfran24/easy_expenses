import { create } from "zustand";

// export const useStore = create((set) => ({
//   bears: 0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
//   updateBears: (newBears) => set({ bears: newBears }),
// }));

export interface StoreState {
  //moneda
  currency: string;
  setCurrency: (currency: string) => void;
  //ingresos
  incomeList: string[];
  setIncomeList: (incomeList: string[]) => void;
  //gastos
  expenseList: string[];
  setExpenseList: (expenseList: string[]) => void;
  //categorías
  categoryList: string[];
  setCategoryList: (categoryList: string[]) => void;
}
