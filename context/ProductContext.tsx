import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../constants/types';
import { products as initialProducts, categories as initialCategories } from '../constants/mockData';

interface ProductContextType {
  products: Product[];
  categories: string[];
  addProduct: (product: Product) => void;
  addCategory: (category: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<string[]>(initialCategories);

  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
  };

  const addCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories((prev) => [...prev, category]);
    }
  };

  return (
    <ProductContext.Provider value={{ products, categories, addProduct, addCategory }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within ProductProvider");
  return context;
}
