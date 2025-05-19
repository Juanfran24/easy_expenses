import { create } from "zustand";
import { getUserCategories } from "../services/categories";
import { Category } from "../models/Category";
import { Transaction } from "../models/Transaction";
import { getUserTransactions } from "../services/transactions";
import { Payment } from "../models/Payment";
import { getUserPayments } from "../services/payments";

const DEFAULT_CATEGORIES: Category[] = [
  {
    id: "default-Ingreso-Salario",
    name: "Salario",
    type: "Ingreso",
    icon: "work",
    color: "#37CAA0",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "default-Ingreso-Inversiones",
    name: "Inversiones",
    type: "Ingreso",
    icon: "trending-up",
    color: "#7667F9",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "default-Ingreso-Regalo",
    name: "Regalo",
    type: "Ingreso",
    icon: "card-giftcard",
    color: "#FD5EED",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "default-Ingreso-Otros",
    name: "Otros",
    type: "Ingreso",
    icon: "attach-money",
    color: "#FDA23B",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "default-Gasto-Alimentación",
    name: "Alimentación",
    type: "Gasto",
    icon: "restaurant",
    color: "#FD523B",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "default-Gasto-Transporte",
    name: "Transporte",
    type: "Gasto",
    icon: "directions-car",
    color: "#3BC3FD",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "default-Gasto-Servicios",
    name: "Servicios",
    type: "Gasto",
    icon: "electric-bolt",
    color: "#FD5EED",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "default-Gasto-Entretenimiento",
    name: "Entretenimiento",
    type: "Gasto",
    icon: "movie",
    color: "#7667F9",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "default-Gasto-Salud",
    name: "Salud",
    type: "Gasto",
    icon: "medical-services",
    color: "#FDA23B",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "default-Gasto-Educación",
    name: "Educación",
    type: "Gasto",
    icon: "school",
    color: "#37CAA0",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "default-Gasto-Otros",
    name: "Otros",
    type: "Gasto",
    icon: "category",
    color: "#3BC3FD",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export interface StoreState {
  currency: string;
  setCurrency: (currency: string) => void;
  transactions: Transaction[];
  setTransactionList: (transactionList: Transaction[]) => void;
  loadTransactions: () => Promise<void>;
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  loadCategories: () => Promise<void>;
  payments: Payment[];
  setPayments: (pyments: Payment[]) => void;
  loadPayments: () => Promise<void>;
  reset: () => void;
}

const initialState: StoreState = {
  currency: "COP",
  setCurrency: () => {},

  transactions: [],
  setTransactionList: () => {},
  loadTransactions: async () => {},

  categories: [],
  setCategories: () => {},
  loadCategories: async () => {},

  payments: [],
  setPayments: () => {},
  loadPayments: async () => {},
  reset: () => {},
};

export const useStore = create<StoreState>((set) => ({
  currency: "COP",
  setCurrency: (currency: string) => set({ currency }),

  categories: [],
  setCategories: (categories: Category[]) => set({ categories }),

  transactions: [],
  setTransactionList: (transactions: Transaction[]) =>
    set({ transactions: transactions }),

  loadCategories: async () => {
    try {
      const userCategories = await getUserCategories();
      const defaultCategories = DEFAULT_CATEGORIES.map((cat, index) => ({
        ...cat,
        createdAt: cat.createdAt,
        updatedAt: cat.updatedAt,
      })) as Category[];

      const filteredUserCategories = userCategories.filter(
        (userCat) =>
          !defaultCategories.some(
            (defCat) =>
              defCat.name === userCat.name && defCat.type === userCat.type
          )
      );

      const allCategories = [...defaultCategories, ...filteredUserCategories];
      set({ categories: allCategories });
    } catch (error) {
      console.error("Error al cargar las categorías:", error);
    }
  },

  loadTransactions: async () => {
    try {
      const transactions = await getUserTransactions();
      set({ transactions: transactions });
    } catch (error) {
      console.error("Error al cargar las transacciones:", error);
    }
  },

  payments: [],
  setPayments: (payments: Payment[]) => set({ payments }),
  loadPayments: async () => {
    try {
      const pyments = await getUserPayments();
      set({ payments: pyments });
    } catch (error) {
      console.error("Error al cargar los pagos:", error);
    }
  },

  reset: () => set(initialState),
}));
