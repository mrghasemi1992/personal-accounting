export type NewTransaction = {
  amount: string;
  category: Category;
  description: string;
  id: number;
  date: Date | null;
};

export type Transaction = {
  amount: string;
  category: Category;
  description: string;
  id: number;
  date: string;
};

export type Category = "Food" | "Transportation" | "Bill" | "";
