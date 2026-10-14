import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartLine, Customer, Product } from '../constants/types';
import { customers } from '../constants/mockData';

interface CartContextType {
  cart: CartLine[];
  customer: Customer;
  payment: string;
  notice: string;
  addToCart: (product: Product) => void;
  updateQuantity: (id: string, delta: number) => void;
  setCustomer: (customer: Customer) => void;
  setPayment: (payment: string) => void;
  finishSale: () => void;
  setNotice: (message: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [customer, setCustomer] = useState<Customer>(customers[0]);
  const [payment, setPayment] = useState("نقدًا");
  const [notice, setNotice] = useState("");

  const showNotice = (message: string) => {
    setNotice(message);
    setTimeout(() => setNotice(""), 2400);
  };

  const addToCart = (product: Product) => {
    setCart((current) => {
      const existing = current.find((line) => line.id === product.id);
      return existing
        ? current.map((line) => line.id === product.id ? { ...line, quantity: line.quantity + 1 } : line)
        : [...current, { ...product, quantity: 1 }];
    });
    showNotice(`تمت إضافة ${product.name} للسلة`);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((current) => current.flatMap((line) => {
      if (line.id !== id) return [line];
      const quantity = line.quantity + delta;
      return quantity > 0 ? [{ ...line, quantity }] : [];
    }));
  };

  const finishSale = () => {
    if (!cart.length) return showNotice("أضف صنفًا واحدًا على الأقل قبل إتمام البيع");
    setCart([]);
    showNotice("تم تسجيل البيع بنجاح");
  };

  return (
    <CartContext.Provider value={{ cart, customer, payment, notice, addToCart, updateQuantity, setCustomer, setPayment, finishSale, setNotice: showNotice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
