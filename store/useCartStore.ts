import { create } from "zustand";
import { CartLine, Customer, Product } from "../constants/types";
import { customers } from "../constants/mockData";

interface CartState {
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

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  customer: customers[0],
  payment: "نقدًا",
  notice: "",

  addToCart: (product) => {
    set((state) => {
      const existing = state.cart.find((line) => line.id === product.id);
      const newCart = existing
        ? state.cart.map((line) =>
            line.id === product.id ? { ...line, quantity: line.quantity + 1 } : line
          )
        : [...state.cart, { ...product, quantity: 1 }];
      return { cart: newCart };
    });
    get().setNotice(`تمت إضافة ${product.name} للسلة`);
  },

  updateQuantity: (id, delta) => {
    set((state) => ({
      cart: state.cart.flatMap((line) => {
        if (line.id !== id) return [line];
        const quantity = line.quantity + delta;
        return quantity > 0 ? [{ ...line, quantity }] : [];
      }),
    }));
  },

  setCustomer: (customer) => set({ customer }),
  setPayment: (payment) => set({ payment }),

  finishSale: () => {
    if (!get().cart.length) {
      get().setNotice("أضف صنفًا واحدًا على الأقل قبل إتمام البيع");
      return;
    }
    set({ cart: [], notice: "تم تسجيل البيع بنجاح" });
    setTimeout(() => set({ notice: "" }), 2400);
  },

  setNotice: (message) => {
    set({ notice: message });
    if (message && message !== "تم تسجيل البيع بنجاح") {
        setTimeout(() => set({ notice: "" }), 2400);
    }
  },
}));
