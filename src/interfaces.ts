export type Transaction = {
  id: number;
  date: Date | null;
  category: Category;
  subCategory: string;
  description: string;
  price: string;
};

export type Category = "Food" | "Transportation" | "Bill" | "";
