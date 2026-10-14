import { Ionicons } from "@expo/vector-icons";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number; // سعر التجزئة (نستخدمه كسعر أساسي للتوافق مع السلة)
  stock: number;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  note?: string;
  // 👇 الحقول الجديدة (جميعها اختيارية لتجنب كسر البيانات القديمة)
  code?: string;           // رقم الصنف
  model?: string;          // موديل الصنف
  unit?: string;           // الوحدة
  barcode?: string;        // الباركود
  costPrice?: number;      // سعر التكلفة
  wholesalePrice?: number; // سعر الجملة
};

export type CartLine = Product & { quantity: number };

export type Customer = {
  id: string;
  name: string;
  detail: string;
};
