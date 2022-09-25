import create from "zustand";
import { devtools, persist } from "zustand/middleware";

import sampleData from "../data/sampleData.json";
import { Transaction } from "../interfaces";

interface TransactionState {
  transactions: Transaction[];
  add: (transaction: Transaction) => void;
  remove: (index: number) => void;
  removeAll: () => void;
  importSample: () => void;
}

export const useTransactionStore = create<TransactionState>()(
  devtools(
    persist(
      (set) => ({
        transactions: [],
        add: (transaction: Transaction) => {
          set((state) => ({
            transactions: [transaction, ...state.transactions],
          }));
        },
        remove: (index: number) => {
          set((state) => ({
            transactions: [
              ...state.transactions.slice(0, index),
              ...state.transactions.slice(index + 1),
            ],
          }));
        },
        removeAll: () => {
          set(() => ({ transactions: [] }));
        },
        importSample: () => {
          // @ts-ignore
          set(() => ({ transactions: sampleData }));
        },
      }),
      {
        name: "transaction-storage",
      }
    )
  )
);
