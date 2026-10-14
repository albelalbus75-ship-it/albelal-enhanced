import { Ionicons } from "@expo/vector-icons";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  note?: string;
};

export type CartLine = Product & { quantity: number };

export type Customer = {
  id: string;
  name: string;
  detail: string;
};
