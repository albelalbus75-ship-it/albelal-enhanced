import { Customer, Product } from "./types";

export const categories = ["الكل", "أدوات منزلية", "إلكترونيات", "مفروشات", "هدايا"];

export const products: Product[] = [
  { id: "p1", name: "طقم قدور جرانيت تركي 9 قطع", category: "أدوات منزلية", price: 260, stock: 15, icon: "restaurant-outline", color: "#E7F5F2", note: "غير لاصق • جودة تركية" },
  { id: "p2", name: "قلاية هوائية فيليبس رقمية 4.1 لتر", category: "أدوات منزلية", price: 320, stock: 10, icon: "flame-outline", color: "#FFF0E5", note: "ضمان سنة" },
  { id: "p3", name: "حافظات طعام زجاجية محكمة 5 قطع", category: "أدوات منزلية", price: 58, stock: 30, icon: "cube-outline", color: "#EAF0FF", note: "كرتون 6 أطقم: 310 ريال" },
  { id: "p4", name: "سماعة رأس بلوتوث عازلة للضوضاء P9", category: "إلكترونيات", price: 85, stock: 25, icon: "headset-outline", color: "#F1EAFE", note: "درزن: 900 ريال" },
  { id: "p5", name: "شاحن أنكر سريع 65W بثلاثة منافذ", category: "إلكترونيات", price: 120, stock: 18, icon: "flash-outline", color: "#E7F5F2", note: "تقنية GaN" },
  { id: "p6", name: "بنك طاقة محمول 20,000 مللي أمبير", category: "إلكترونيات", price: 99, stock: 18, icon: "battery-charging-outline", color: "#FFF4D7", note: "يدعم الشحن اللاسلكي" },
  { id: "p7", name: "طقم شرشف سرير قطن مصري نفرين", category: "مفروشات", price: 130, stock: 14, icon: "bed-outline", color: "#EAF0FF", note: "4 قطع • قطن فاخر" },
  { id: "p8", name: "وسادة نوم طبية ميموري فوم", category: "مفروشات", price: 68, stock: 22, icon: "moon-outline", color: "#F1EAFE", note: "باكت مزدوج: 120 ريال" },
  { id: "p9", name: "بوكس هدية ملكي فاخر", category: "هدايا", price: 165, stock: 12, icon: "gift-outline", color: "#FFF0E5", note: "ساعة + عطر + محفظة + قلم" },
  { id: "p10", name: "مج حراري ذكي بشاشة رقمية 500 مل", category: "هدايا", price: 38, stock: 35, icon: "cafe-outline", color: "#E7F5F2", note: "كرتون 12 مج: 380 ريال" },
];

export const customers: Customer[] = [
  { id: "cash", name: "زبون نقدي عام", detail: "بدون حساب" },
  { id: "fashion", name: "معرض الأناقة للديكور", detail: "دين: 2,450 ريال" },
  { id: "khaled", name: "خالد بن عبد العزيز", detail: "حساب شخصي • دين: 420 ريال" },
  { id: "ibdaa", name: "مؤسسة إبداع للتجهيزات", detail: "دين: 5,800 ريال" },
];

export const money = (value: number) => `${value.toFixed(2)} ريال`;
