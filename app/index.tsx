import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  note?: string;
};

type CartLine = Product & { quantity: number };
type Tab = "home" | "sales" | "cart" | "reports" | "accounts";

const categories = ["الكل", "أدوات منزلية", "إلكترونيات", "مفروشات", "هدايا"];

const products: Product[] = [
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

const customers = [
  { id: "cash", name: "زبون نقدي عام", detail: "بدون حساب" },
  { id: "fashion", name: "معرض الأناقة للديكور", detail: "دين: 2,450 ريال" },
  { id: "khaled", name: "خالد بن عبد العزيز", detail: "حساب شخصي • دين: 420 ريال" },
  { id: "ibdaa", name: "مؤسسة إبداع للتجهيزات", detail: "دين: 5,800 ريال" },
];

const money = (value: number) => `${value.toFixed(2)} ريال`;

function BrandMark() {
  return (
    <View style={styles.brandMark}>
      <Ionicons name="receipt-outline" size={21} color="#FFFFFF" />
    </View>
  );
}

function SectionTitle({ title, action, onPress }: { title: string; action?: string; onPress?: () => void }) {
  return (
    <View style={styles.sectionTitleRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action && <Pressable onPress={onPress} hitSlop={8}><Text style={styles.textAction}>{action}</Text></Pressable>}
    </View>
  );
}

function ProductCard({ product, onAdd, onOpen }: { product: Product; onAdd: () => void; onOpen: () => void }) {
  return (
    <Pressable style={styles.productCard} onPress={onOpen}>
      <View style={[styles.productIcon, { backgroundColor: product.color }]}><Ionicons name={product.icon} size={27} color="#132238" /></View>
      <View style={styles.productInfo}>
        <Text style={styles.productCategory}>{product.category}</Text>
        <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.productNote} numberOfLines={1}>{product.note}</Text>
        <View style={styles.productBottom}>
          <Text style={styles.productPrice}>{money(product.price)}</Text>
          <Text style={styles.stockText}>{product.stock} متوفر</Text>
        </View>
      </View>
      <Pressable accessibilityLabel={`إضافة ${product.name} إلى السلة`} style={styles.addButton} onPress={onAdd} hitSlop={6}>
        <Ionicons name="add" size={22} color="#FFFFFF" />
      </Pressable>
    </Pressable>
  );
}

export default function HomeScreen() {
  const [tab, setTab] = useState<Tab>("home");
  const [category, setCategory] = useState("الكل");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [customer, setCustomer] = useState(customers[0]);
  const [payment, setPayment] = useState("نقدًا");
  const [notice, setNotice] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = category === "الكل" || product.category === category;
    const matchesQuery = product.name.includes(query.trim()) || product.category.includes(query.trim());
    return matchesCategory && matchesQuery;
  }), [category, query]);

  const itemCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = cart.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const vat = subtotal * 0.15;
  const total = subtotal + vat;

  const showNotice = (message: string) => {
    setNotice(message);
    setTimeout(() => setNotice(""), 2400);
  };

  const addToCart = (product: Product) => {
    setCart((current) => {
      const existing = current.find((line) => line.id === product.id);
      return existing ? current.map((line) => line.id === product.id ? { ...line, quantity: line.quantity + 1 } : line) : [...current, { ...product, quantity: 1 }];
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
    setTab("home");
    showNotice("تم تسجيل البيع بنجاح");
  };

  const openCatalog = () => { setTab("sales"); setSelectedProduct(null); };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <View style={styles.app}>
        <View style={styles.header}>
          <View style={styles.headerIdentity}><BrandMark /><View><Text style={styles.brandName}>مركز البلال</Text><Text style={styles.brandSub}>كاشير المبيعات</Text></View></View>
          <Pressable style={styles.cartHeaderButton} onPress={() => setTab("cart")} accessibilityLabel="فتح سلة البيع">
            <Ionicons name="cart-outline" size={23} color="#132238" />
            {itemCount > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{itemCount}</Text></View>}
          </Pressable>
        </View>

        {notice ? <View style={styles.notice}><Ionicons name="checkmark-circle" size={19} color="#0D806F" /><Text style={styles.noticeText}>{notice}</Text></View> : null}

        {tab === "home" && <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.hero}><View style={styles.heroCopy}><Text style={styles.eyebrow}>وردية اليوم • الأربعاء 14 أكتوبر</Text><Text style={styles.heroTitle}>خلّ البيع أسرع،{"\n"}<Text style={styles.heroAccent}>والحساب أوضح.</Text></Text><Text style={styles.heroBody}>كل ما تحتاجه لإتمام عملية بيع مرتبة من شاشة واحدة.</Text><Pressable style={styles.primaryButton} onPress={openCatalog}><Text style={styles.primaryButtonText}>ابدأ بيعًا جديدًا</Text><Ionicons name="arrow-back" size={18} color="#FFFFFF" /></Pressable></View><View style={styles.heroOrb}><Ionicons name="receipt" size={48} color="#FFFFFF" /></View></View>
          <SectionTitle title="اختصارات التشغيل" />
          <View style={styles.quickGrid}><QuickAction icon="pricetags-outline" label="المنتجات" detail={`${products.length} أصناف`} onPress={openCatalog} /><QuickAction icon="cart-outline" label="سلة البيع" detail={itemCount ? `${itemCount} عناصر` : "فارغة الآن"} onPress={() => setTab("cart")} /><QuickAction icon="bar-chart-outline" label="التقارير" detail="ملخص اليوم" onPress={() => setTab("reports")} /><QuickAction icon="people-outline" label="الحسابات" detail="4 عملاء" onPress={() => setTab("accounts")} /></View>
          <SectionTitle title="الأكثر مبيعًا" action="عرض الكل" onPress={openCatalog} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featuredRow}>{products.slice(0, 4).map((product) => <Pressable key={product.id} style={styles.featuredCard} onPress={() => { setSelectedProduct(product); setTab("sales"); }}><View style={[styles.featuredIcon, { backgroundColor: product.color }]}><Ionicons name={product.icon} size={28} color="#132238" /></View><Text style={styles.featuredName} numberOfLines={2}>{product.name}</Text><Text style={styles.featuredPrice}>{money(product.price)}</Text></Pressable>)}</ScrollView>
          <View style={styles.tipCard}><View style={styles.tipIcon}><Ionicons name="bulb-outline" size={21} color="#C47718" /></View><View style={{ flex: 1 }}><Text style={styles.tipTitle}>نصيحة اليوم</Text><Text style={styles.tipBody}>راجع ملخص السلة قبل اختيار طريقة الدفع لتقليل أخطاء الفواتير.</Text></View></View>
        </ScrollView>}

        {tab === "sales" && <View style={styles.flex}><View style={styles.screenHeading}><View><Text style={styles.screenTitle}>المنتجات</Text><Text style={styles.screenSubtitle}>{filteredProducts.length} صنف متاح للبيع</Text></View><Pressable style={styles.iconButton} onPress={() => { setQuery(""); setCategory("الكل"); }}><Ionicons name="refresh-outline" size={21} color="#132238" /></Pressable></View><View style={styles.searchBox}><Ionicons name="search-outline" size={20} color="#7B8799" /><TextInput value={query} onChangeText={setQuery} placeholder="ابحث باسم المنتج أو القسم" placeholderTextColor="#98A2B2" style={styles.searchInput} textAlign="right" /><Pressable onPress={() => setQuery("")}><Ionicons name="close-circle" size={18} color={query ? "#7B8799" : "transparent"} /></Pressable></View><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>{categories.map((item) => <Pressable key={item} onPress={() => setCategory(item)} style={[styles.chip, category === item && styles.chipActive]}><Text style={[styles.chipText, category === item && styles.chipTextActive]}>{item}</Text></Pressable>)}</ScrollView>{selectedProduct ? <ProductDetail product={selectedProduct} onAdd={() => { addToCart(selectedProduct); setSelectedProduct(null); }} onClose={() => setSelectedProduct(null)} /> : <FlatList data={filteredProducts} keyExtractor={(item) => item.id} contentContainerStyle={styles.productList} renderItem={({ item }) => <ProductCard product={item} onAdd={() => addToCart(item)} onOpen={() => setSelectedProduct(item)} />} ListEmptyComponent={<EmptyState icon="search-outline" title="لم نعثر على منتجات" body="جرّب كلمة بحث مختلفة أو امسح التصفية." action="مسح البحث" onPress={() => { setQuery(""); setCategory("الكل"); }} />} showsVerticalScrollIndicator={false} />}</View>}

        {tab === "cart" && <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}><View style={styles.screenHeading}><View><Text style={styles.screenTitle}>سلة البيع</Text><Text style={styles.screenSubtitle}>{itemCount} عناصر في الفاتورة الحالية</Text></View><View style={styles.cartTotalPill}><Text style={styles.cartTotalValue}>{money(total)}</Text></View></View>{cart.length === 0 ? <EmptyState icon="cart-outline" title="السلة فارغة" body="تصفح المنتجات وأضف الأصناف التي تريد بيعها." action="تصفح المنتجات" onPress={openCatalog} /> : <><View style={styles.linesCard}>{cart.map((line) => <View key={line.id} style={styles.cartLine}><View style={[styles.lineIcon, { backgroundColor: line.color }]}><Ionicons name={line.icon} size={20} color="#132238" /></View><View style={styles.lineInfo}><Text style={styles.lineName} numberOfLines={2}>{line.name}</Text><Text style={styles.linePrice}>{money(line.price)} للوحدة</Text></View><View style={styles.stepper}><Pressable onPress={() => updateQuantity(line.id, 1)} style={styles.stepButton}><Ionicons name="add" size={17} color="#132238" /></Pressable><Text style={styles.quantity}>{line.quantity}</Text><Pressable onPress={() => updateQuantity(line.id, -1)} style={styles.stepButton}><Ionicons name="remove" size={17} color="#132238" /></Pressable></View></View>)}</View><Text style={styles.formLabel}>العميل</Text><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.customerRow}>{customers.map((item) => <Pressable key={item.id} onPress={() => setCustomer(item)} style={[styles.customerChip, customer.id === item.id && styles.customerChipActive]}><Text style={[styles.customerName, customer.id === item.id && styles.customerTextActive]}>{item.name}</Text><Text style={[styles.customerDetail, customer.id === item.id && styles.customerTextActive]}>{item.detail}</Text></Pressable>)}</ScrollView><Text style={styles.formLabel}>طريقة الدفع</Text><View style={styles.paymentRow}>{["نقدًا", "شبكة", "آجل"].map((item) => <Pressable key={item} onPress={() => setPayment(item)} style={[styles.paymentOption, payment === item && styles.paymentActive]}><Ionicons name={item === "نقدًا" ? "cash-outline" : item === "شبكة" ? "card-outline" : "time-outline"} size={20} color={payment === item ? "#FFFFFF" : "#132238"} /><Text style={[styles.paymentText, payment === item && styles.paymentTextActive]}>{item}</Text></Pressable>)}</View><Summary subtotal={subtotal} vat={vat} total={total} /><Pressable style={styles.checkoutButton} onPress={finishSale}><Text style={styles.checkoutText}>إتمام البيع • {money(total)}</Text><Ionicons name="checkmark-circle-outline" size={22} color="#FFFFFF" /></Pressable></>}</ScrollView>}

        {tab === "reports" && <ReportsScreen total={total} />}
        {tab === "accounts" && <AccountsScreen />}

        <View style={styles.bottomNav}>{([{ id: "home", label: "الرئيسية", icon: "home-outline" }, { id: "sales", label: "المبيعات", icon: "pricetags-outline" }, { id: "cart", label: "السلة", icon: "cart-outline" }, { id: "reports", label: "التقارير", icon: "bar-chart-outline" }, { id: "accounts", label: "الحسابات", icon: "people-outline" }] as { id: Tab; label: string; icon: keyof typeof Ionicons.glyphMap }[]).map((item) => <Pressable key={item.id} style={styles.navItem} onPress={() => setTab(item.id)} accessibilityLabel={item.label}><Ionicons name={item.icon} size={22} color={tab === item.id ? "#19B7A5" : "#8691A3"} /><Text style={[styles.navLabel, tab === item.id && styles.navLabelActive]}>{item.label}</Text>{item.id === "cart" && itemCount > 0 && <View style={styles.navBadge}><Text style={styles.navBadgeText}>{itemCount}</Text></View>}</Pressable>)}</View>
      </View>
    </SafeAreaView>
  );
}

function QuickAction({ icon, label, detail, onPress }: { icon: keyof typeof Ionicons.glyphMap; label: string; detail: string; onPress: () => void }) { return <Pressable style={styles.quickCard} onPress={onPress}><View style={styles.quickIcon}><Ionicons name={icon} size={21} color="#19B7A5" /></View><Text style={styles.quickLabel}>{label}</Text><Text style={styles.quickDetail}>{detail}</Text></Pressable>; }
function EmptyState({ icon, title, body, action, onPress }: { icon: keyof typeof Ionicons.glyphMap; title: string; body: string; action: string; onPress: () => void }) { return <View style={styles.emptyState}><View style={styles.emptyIcon}><Ionicons name={icon} size={34} color="#19B7A5" /></View><Text style={styles.emptyTitle}>{title}</Text><Text style={styles.emptyBody}>{body}</Text><Pressable style={styles.secondaryButton} onPress={onPress}><Text style={styles.secondaryButtonText}>{action}</Text></Pressable></View>; }
function ProductDetail({ product, onAdd, onClose }: { product: Product; onAdd: () => void; onClose: () => void }) { return <View style={styles.detailCard}><Pressable style={styles.detailClose} onPress={onClose}><Ionicons name="close" size={22} color="#132238" /></Pressable><View style={[styles.detailIcon, { backgroundColor: product.color }]}><Ionicons name={product.icon} size={56} color="#132238" /></View><Text style={styles.detailCategory}>{product.category}</Text><Text style={styles.detailTitle}>{product.name}</Text><Text style={styles.detailNote}>{product.note}</Text><Text style={styles.detailPrice}>{money(product.price)}</Text><View style={styles.detailMeta}><Text style={styles.detailMetaText}>متوفر في المخزون</Text><Text style={styles.detailMetaStock}>{product.stock} حبة</Text></View><Pressable style={styles.primaryButtonWide} onPress={onAdd}><Text style={styles.primaryButtonText}>إضافة إلى السلة</Text><Ionicons name="cart-outline" size={20} color="#FFFFFF" /></Pressable></View>; }
function Summary({ subtotal, vat, total }: { subtotal: number; vat: number; total: number }) { return <View style={styles.summary}><View style={styles.summaryRow}><Text style={styles.summaryLabel}>المجموع قبل الضريبة</Text><Text style={styles.summaryValue}>{money(subtotal)}</Text></View><View style={styles.summaryRow}><Text style={styles.summaryLabel}>خصم إضافي</Text><Text style={styles.summaryMuted}>0.00 ريال</Text></View><View style={styles.summaryRow}><Text style={styles.summaryLabel}>ضريبة القيمة المضافة (15%)</Text><Text style={styles.summaryValue}>{money(vat)}</Text></View><View style={[styles.summaryRow, styles.totalRow]}><Text style={styles.totalLabel}>المبلغ المطلوب</Text><Text style={styles.totalValue}>{money(total)}</Text></View></View>; }
function ReportsScreen({ total }: { total: number }) { return <ScrollView contentContainerStyle={styles.scrollContent}><View style={styles.screenHeading}><View><Text style={styles.screenTitle}>التقارير</Text><Text style={styles.screenSubtitle}>نظرة سريعة على أداء اليوم</Text></View><View style={styles.datePill}><Text style={styles.datePillText}>اليوم</Text></View></View><View style={styles.statsGrid}><Stat title="مبيعات اليوم" value="4,860 ريال" icon="trending-up-outline" tone="teal" /><Stat title="عدد الفواتير" value="28" icon="receipt-outline" tone="blue" /><Stat title="متوسط الفاتورة" value="173.50 ريال" icon="calculator-outline" tone="orange" /><Stat title="الأصناف المباعة" value="64" icon="cube-outline" tone="purple" /></View><View style={styles.reportCard}><SectionTitle title="ملخص الحركة" action="هذا الأسبوع" /><ReportBar label="أدوات منزلية" value="2,140 ريال" width="82%" color="#19B7A5" /><ReportBar label="إلكترونيات" value="1,420 ريال" width="64%" color="#5A78D6" /><ReportBar label="هدايا" value="860 ريال" width="40%" color="#D99542" /><ReportBar label="مفروشات" value="440 ريال" width="24%" color="#9A78D0" /></View><View style={styles.tipCard}><View style={styles.tipIcon}><Ionicons name="information-circle-outline" size={21} color="#C47718" /></View><View style={{ flex: 1 }}><Text style={styles.tipTitle}>بيانات تجريبية</Text><Text style={styles.tipBody}>الأرقام المعروضة للتوضيح ويمكن ربطها لاحقًا بقاعدة بيانات المبيعات.</Text></View></View></ScrollView>; }
function Stat({ title, value, icon, tone }: { title: string; value: string; icon: keyof typeof Ionicons.glyphMap; tone: "teal" | "blue" | "orange" | "purple" }) { const colors = { teal: ["#E7F5F2", "#19B7A5"], blue: ["#EAF0FF", "#5A78D6"], orange: ["#FFF0E5", "#D99542"], purple: ["#F1EAFE", "#9A78D0"] } as const; return <View style={styles.statCard}><View style={[styles.statIcon, { backgroundColor: colors[tone][0] }]}><Ionicons name={icon} size={20} color={colors[tone][1]} /></View><Text style={styles.statTitle}>{title}</Text><Text style={styles.statValue}>{value}</Text></View>; }
function ReportBar({ label, value, width, color }: { label: string; value: string; width: string; color: string }) { return <View style={styles.reportBarRow}><View style={styles.reportBarHeader}><Text style={styles.reportBarLabel}>{label}</Text><Text style={styles.reportBarValue}>{value}</Text></View><View style={styles.track}><View style={[styles.fill, { width: width as `${number}%`, backgroundColor: color }]} /></View></View>; }
function AccountsScreen() { return <ScrollView contentContainerStyle={styles.scrollContent}><View style={styles.screenHeading}><View><Text style={styles.screenTitle}>الحسابات</Text><Text style={styles.screenSubtitle}>اختر العميل قبل إتمام البيع الآجل</Text></View><View style={styles.accountCount}><Text style={styles.accountCountText}>4</Text></View></View><View style={styles.accountSummary}><View><Text style={styles.accountSummaryLabel}>إجمالي الديون</Text><Text style={styles.accountSummaryValue}>8,900 ريال</Text></View><Ionicons name="wallet-outline" size={28} color="#FFFFFF" /></View>{customers.slice(1).map((item, index) => <View key={item.id} style={styles.accountRow}><View style={styles.avatar}><Text style={styles.avatarText}>{item.name.slice(0, 1)}</Text></View><View style={styles.accountInfo}><Text style={styles.accountName}>{item.name}</Text><Text style={styles.accountDetail}>{item.detail}</Text></View><Ionicons name="chevron-back" size={19} color="#9AA3B1" /></View>)}<View style={styles.tipCard}><View style={styles.tipIcon}><Ionicons name="shield-checkmark-outline" size={21} color="#C47718" /></View><View style={{ flex: 1 }}><Text style={styles.tipTitle}>إدارة أوضح للحسابات</Text><Text style={styles.tipBody}>التطبيق يفصل الحسابات عن شاشة البيع حتى لا تتكدس الإجراءات في مسار واحد.</Text></View></View></ScrollView>; }

const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: "#F7F8FA" }, app: { flex: 1, backgroundColor: "#F7F8FA" }, flex: { flex: 1 }, scrollContent: { padding: 18, paddingBottom: 112 }, header: { height: 76, paddingHorizontal: 18, flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between", backgroundColor: "#FFFFFF", borderBottomWidth: 1, borderBottomColor: "#EDF0F4" }, headerIdentity: { flexDirection: "row-reverse", alignItems: "center", gap: 10 }, brandMark: { width: 40, height: 40, borderRadius: 14, backgroundColor: "#132238", alignItems: "center", justifyContent: "center" }, brandName: { color: "#132238", fontSize: 16, fontWeight: "800", textAlign: "right" }, brandSub: { color: "#7B8799", fontSize: 11, marginTop: 2, textAlign: "right" }, cartHeaderButton: { width: 43, height: 43, borderRadius: 14, backgroundColor: "#F2F5F7", alignItems: "center", justifyContent: "center", position: "relative" }, badge: { position: "absolute", top: -4, left: -4, width: 19, height: 19, borderRadius: 10, backgroundColor: "#F28D54", alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "#FFFFFF" }, badgeText: { color: "#FFFFFF", fontSize: 10, fontWeight: "800" }, notice: { marginHorizontal: 18, marginTop: 10, padding: 12, borderRadius: 14, backgroundColor: "#E7F5F2", flexDirection: "row-reverse", alignItems: "center", gap: 7 }, noticeText: { flex: 1, color: "#0D806F", fontSize: 12, fontWeight: "700", textAlign: "right" }, hero: { backgroundColor: "#132238", borderRadius: 26, padding: 22, minHeight: 210, overflow: "hidden", flexDirection: "row-reverse", justifyContent: "space-between", alignItems: "center" }, heroCopy: { flex: 1 }, eyebrow: { color: "#9CB7B5", fontSize: 11, fontWeight: "700", textAlign: "right", marginBottom: 12 }, heroTitle: { color: "#FFFFFF", fontSize: 26, lineHeight: 33, fontWeight: "800", textAlign: "right" }, heroAccent: { color: "#42D0BD" }, heroBody: { color: "#C4CEDA", fontSize: 13, lineHeight: 21, textAlign: "right", marginTop: 9, maxWidth: 210 }, heroOrb: { width: 82, height: 82, borderRadius: 41, backgroundColor: "#1E3D50", alignItems: "center", justifyContent: "center", marginLeft: 8 }, primaryButton: { backgroundColor: "#19B7A5", paddingHorizontal: 16, paddingVertical: 12, borderRadius: 13, alignSelf: "flex-end", flexDirection: "row-reverse", gap: 7, alignItems: "center", marginTop: 18, minHeight: 46 }, primaryButtonWide: { backgroundColor: "#19B7A5", paddingHorizontal: 16, paddingVertical: 14, borderRadius: 14, flexDirection: "row-reverse", gap: 8, alignItems: "center", justifyContent: "center", marginTop: 20, minHeight: 50 }, primaryButtonText: { color: "#FFFFFF", fontWeight: "800", fontSize: 13 }, sectionTitleRow: { flexDirection: "row-reverse", justifyContent: "space-between", alignItems: "center", marginTop: 24, marginBottom: 12 }, sectionTitle: { color: "#132238", fontWeight: "800", fontSize: 17, textAlign: "right" }, textAction: { color: "#0D9D8E", fontSize: 12, fontWeight: "700" }, quickGrid: { flexDirection: "row-reverse", flexWrap: "wrap", gap: 10 }, quickCard: { backgroundColor: "#FFFFFF", borderRadius: 18, padding: 13, width: "48.2%", minHeight: 105, borderWidth: 1, borderColor: "#EDF0F4" }, quickIcon: { width: 35, height: 35, borderRadius: 12, backgroundColor: "#E7F5F2", alignItems: "center", justifyContent: "center", marginBottom: 8 }, quickLabel: { color: "#132238", fontWeight: "800", fontSize: 14, textAlign: "right" }, quickDetail: { color: "#8994A5", fontSize: 11, marginTop: 4, textAlign: "right" }, featuredRow: { gap: 11, paddingBottom: 4 }, featuredCard: { width: 144, padding: 12, backgroundColor: "#FFFFFF", borderRadius: 18, borderWidth: 1, borderColor: "#EDF0F4" }, featuredIcon: { width: 50, height: 50, borderRadius: 16, alignItems: "center", justifyContent: "center", alignSelf: "flex-end", marginBottom: 10 }, featuredName: { color: "#132238", fontSize: 12, lineHeight: 18, fontWeight: "700", textAlign: "right", minHeight: 36 }, featuredPrice: { color: "#0D9D8E", fontSize: 13, fontWeight: "800", textAlign: "right", marginTop: 9 }, tipCard: { marginTop: 18, padding: 14, backgroundColor: "#FFF8E8", borderRadius: 17, flexDirection: "row-reverse", gap: 10, alignItems: "flex-start" }, tipIcon: { width: 34, height: 34, borderRadius: 12, backgroundColor: "#FFEDC5", alignItems: "center", justifyContent: "center" }, tipTitle: { color: "#80500F", fontSize: 13, fontWeight: "800", textAlign: "right" }, tipBody: { color: "#9B6A29", fontSize: 12, lineHeight: 19, marginTop: 3, textAlign: "right" }, screenHeading: { paddingHorizontal: 18, paddingTop: 22, paddingBottom: 12, flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between" }, screenTitle: { color: "#132238", fontSize: 25, fontWeight: "900", textAlign: "right" }, screenSubtitle: { color: "#8290A3", fontSize: 12, marginTop: 5, textAlign: "right" }, iconButton: { width: 42, height: 42, borderRadius: 14, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#EDF0F4" }, searchBox: { marginHorizontal: 18, height: 49, borderRadius: 15, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E7EBF0", paddingHorizontal: 13, flexDirection: "row-reverse", alignItems: "center", gap: 9 }, searchInput: { flex: 1, color: "#132238", fontSize: 13 }, chipsRow: { paddingHorizontal: 18, gap: 8, paddingVertical: 14 }, chip: { paddingHorizontal: 15, height: 36, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E7EBF0" }, chipActive: { backgroundColor: "#132238", borderColor: "#132238" }, chipText: { color: "#69768A", fontSize: 12, fontWeight: "700" }, chipTextActive: { color: "#FFFFFF" }, productList: { paddingHorizontal: 18, paddingBottom: 112, gap: 10 }, productCard: { backgroundColor: "#FFFFFF", borderRadius: 18, padding: 12, flexDirection: "row-reverse", alignItems: "center", gap: 11, borderWidth: 1, borderColor: "#EDF0F4", minHeight: 112 }, productIcon: { width: 62, height: 62, borderRadius: 18, alignItems: "center", justifyContent: "center" }, productInfo: { flex: 1 }, productCategory: { color: "#0D9D8E", fontSize: 10, fontWeight: "800", textAlign: "right" }, productName: { color: "#132238", fontSize: 13, fontWeight: "800", lineHeight: 19, textAlign: "right", marginTop: 3 }, productNote: { color: "#8D98A8", fontSize: 10, textAlign: "right", marginTop: 3 }, productBottom: { flexDirection: "row-reverse", justifyContent: "space-between", alignItems: "center", marginTop: 5 }, productPrice: { color: "#132238", fontSize: 14, fontWeight: "900" }, stockText: { color: "#9AA3B1", fontSize: 10 }, addButton: { width: 38, height: 38, borderRadius: 13, backgroundColor: "#19B7A5", alignItems: "center", justifyContent: "center" }, emptyState: { alignItems: "center", backgroundColor: "#FFFFFF", borderRadius: 20, margin: 18, padding: 28, borderWidth: 1, borderColor: "#EDF0F4" }, emptyIcon: { width: 68, height: 68, borderRadius: 24, backgroundColor: "#E7F5F2", alignItems: "center", justifyContent: "center" }, emptyTitle: { color: "#132238", fontSize: 17, fontWeight: "900", marginTop: 14 }, emptyBody: { color: "#8994A5", fontSize: 13, textAlign: "center", lineHeight: 20, marginTop: 7, maxWidth: 250 }, secondaryButton: { marginTop: 17, borderRadius: 12, backgroundColor: "#E7F5F2", paddingHorizontal: 17, paddingVertical: 11, minHeight: 42, justifyContent: "center" }, secondaryButtonText: { color: "#0D806F", fontWeight: "800", fontSize: 12 }, detailCard: { backgroundColor: "#FFFFFF", borderRadius: 22, marginHorizontal: 18, padding: 20, alignItems: "center", borderWidth: 1, borderColor: "#EDF0F4" }, detailClose: { alignSelf: "flex-start", width: 36, height: 36, borderRadius: 12, backgroundColor: "#F2F5F7", alignItems: "center", justifyContent: "center" }, detailIcon: { width: 118, height: 118, borderRadius: 35, alignItems: "center", justifyContent: "center", marginTop: -2, marginBottom: 14 }, detailCategory: { color: "#0D9D8E", fontSize: 12, fontWeight: "800" }, detailTitle: { color: "#132238", fontSize: 21, lineHeight: 28, fontWeight: "900", textAlign: "center", marginTop: 7 }, detailNote: { color: "#8994A5", fontSize: 13, marginTop: 7 }, detailPrice: { color: "#132238", fontSize: 24, fontWeight: "900", marginTop: 16 }, detailMeta: { width: "100%", flexDirection: "row-reverse", justifyContent: "space-between", marginTop: 17, paddingTop: 14, borderTopWidth: 1, borderTopColor: "#EDF0F4" }, detailMetaText: { color: "#8994A5", fontSize: 12 }, detailMetaStock: { color: "#0D806F", fontWeight: "800", fontSize: 12 }, cartTotalPill: { backgroundColor: "#E7F5F2", paddingHorizontal: 11, paddingVertical: 8, borderRadius: 12 }, cartTotalValue: { color: "#0D806F", fontSize: 12, fontWeight: "900" }, linesCard: { marginHorizontal: 18, backgroundColor: "#FFFFFF", borderRadius: 19, padding: 5, borderWidth: 1, borderColor: "#EDF0F4" }, cartLine: { minHeight: 80, padding: 10, borderBottomWidth: 1, borderBottomColor: "#F0F2F5", flexDirection: "row-reverse", alignItems: "center", gap: 9 }, lineIcon: { width: 42, height: 42, borderRadius: 13, alignItems: "center", justifyContent: "center" }, lineInfo: { flex: 1 }, lineName: { color: "#132238", fontSize: 12, fontWeight: "800", textAlign: "right", lineHeight: 17 }, linePrice: { color: "#8994A5", fontSize: 10, textAlign: "right", marginTop: 4 }, stepper: { alignItems: "center", gap: 4 }, stepButton: { width: 29, height: 29, borderRadius: 10, backgroundColor: "#F2F5F7", alignItems: "center", justifyContent: "center" }, quantity: { color: "#132238", fontSize: 13, fontWeight: "900" }, formLabel: { color: "#132238", fontSize: 14, fontWeight: "800", textAlign: "right", marginHorizontal: 18, marginTop: 20, marginBottom: 10 }, customerRow: { paddingHorizontal: 18, gap: 8 }, customerChip: { minWidth: 135, padding: 11, borderRadius: 14, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E7EBF0" }, customerChipActive: { backgroundColor: "#132238", borderColor: "#132238" }, customerName: { color: "#132238", fontSize: 11, fontWeight: "800", textAlign: "right" }, customerDetail: { color: "#8994A5", fontSize: 10, textAlign: "right", marginTop: 4 }, customerTextActive: { color: "#FFFFFF" }, paymentRow: { paddingHorizontal: 18, flexDirection: "row-reverse", gap: 8 }, paymentOption: { flex: 1, minHeight: 54, borderRadius: 14, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E7EBF0", flexDirection: "row-reverse", gap: 5, alignItems: "center", justifyContent: "center" }, paymentActive: { backgroundColor: "#19B7A5", borderColor: "#19B7A5" }, paymentText: { color: "#132238", fontSize: 12, fontWeight: "800" }, paymentTextActive: { color: "#FFFFFF" }, summary: { margin: 18, padding: 15, backgroundColor: "#FFFFFF", borderRadius: 17, borderWidth: 1, borderColor: "#EDF0F4" }, summaryRow: { flexDirection: "row-reverse", justifyContent: "space-between", marginVertical: 5 }, summaryLabel: { color: "#758195", fontSize: 12 }, summaryValue: { color: "#132238", fontSize: 12, fontWeight: "800" }, summaryMuted: { color: "#A7AFBB", fontSize: 12 }, totalRow: { borderTopWidth: 1, borderTopColor: "#EDF0F4", paddingTop: 12, marginTop: 9 }, totalLabel: { color: "#132238", fontSize: 14, fontWeight: "900" }, totalValue: { color: "#0D9D8E", fontSize: 18, fontWeight: "900" }, checkoutButton: { marginHorizontal: 18, marginBottom: 22, minHeight: 54, borderRadius: 16, backgroundColor: "#132238", flexDirection: "row-reverse", justifyContent: "center", alignItems: "center", gap: 8 }, checkoutText: { color: "#FFFFFF", fontWeight: "900", fontSize: 14 }, bottomNav: { height: 76, position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#FFFFFF", borderTopWidth: 1, borderTopColor: "#E9EDF2", flexDirection: "row-reverse", justifyContent: "space-around", alignItems: "center", paddingHorizontal: 7 }, navItem: { minWidth: 57, minHeight: 56, alignItems: "center", justifyContent: "center", position: "relative", gap: 3 }, navLabel: { color: "#8691A3", fontSize: 10, fontWeight: "700" }, navLabelActive: { color: "#0D9D8E" }, navBadge: { position: "absolute", top: -2, right: 4, backgroundColor: "#F28D54", borderRadius: 9, minWidth: 17, height: 17, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#FFFFFF" }, navBadgeText: { color: "#FFFFFF", fontSize: 9, fontWeight: "800" }, datePill: { backgroundColor: "#FFFFFF", borderRadius: 12, paddingHorizontal: 13, paddingVertical: 9, borderWidth: 1, borderColor: "#E7EBF0" }, datePillText: { color: "#0D806F", fontSize: 12, fontWeight: "800" }, statsGrid: { flexDirection: "row-reverse", flexWrap: "wrap", paddingHorizontal: 18, gap: 10 }, statCard: { width: "48.2%", backgroundColor: "#FFFFFF", borderRadius: 17, padding: 13, minHeight: 115, borderWidth: 1, borderColor: "#EDF0F4" }, statIcon: { width: 33, height: 33, borderRadius: 11, alignItems: "center", justifyContent: "center", marginBottom: 10 }, statTitle: { color: "#8994A5", fontSize: 11, textAlign: "right" }, statValue: { color: "#132238", fontSize: 17, fontWeight: "900", textAlign: "right", marginTop: 6 }, reportCard: { margin: 18, padding: 14, borderRadius: 18, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#EDF0F4" }, reportBarRow: { marginTop: 12 }, reportBarHeader: { flexDirection: "row-reverse", justifyContent: "space-between", marginBottom: 6 }, reportBarLabel: { color: "#667388", fontSize: 11 }, reportBarValue: { color: "#132238", fontSize: 11, fontWeight: "800" }, track: { height: 8, backgroundColor: "#F0F2F5", borderRadius: 4, overflow: "hidden" }, fill: { height: 8, borderRadius: 4 }, accountCount: { width: 39, height: 39, borderRadius: 13, backgroundColor: "#E7F5F2", alignItems: "center", justifyContent: "center" }, accountCountText: { color: "#0D806F", fontWeight: "900" }, accountSummary: { marginHorizontal: 18, padding: 18, borderRadius: 19, backgroundColor: "#132238", flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between" }, accountSummaryLabel: { color: "#B7C4D0", fontSize: 12, textAlign: "right" }, accountSummaryValue: { color: "#FFFFFF", fontSize: 24, fontWeight: "900", marginTop: 6, textAlign: "right" }, accountRow: { marginHorizontal: 18, marginTop: 9, padding: 13, backgroundColor: "#FFFFFF", borderRadius: 16, flexDirection: "row-reverse", alignItems: "center", gap: 11, borderWidth: 1, borderColor: "#EDF0F4" }, avatar: { width: 39, height: 39, borderRadius: 14, backgroundColor: "#EAF0FF", alignItems: "center", justifyContent: "center" }, avatarText: { color: "#5A78D6", fontWeight: "900", fontSize: 16 }, accountInfo: { flex: 1 }, accountName: { color: "#132238", fontSize: 12, fontWeight: "800", textAlign: "right" }, accountDetail: { color: "#8994A5", fontSize: 10, textAlign: "right", marginTop: 4 }, });
