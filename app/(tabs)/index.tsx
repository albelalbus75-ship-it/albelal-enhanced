import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Header } from "../../components/Header";
import { SectionTitle } from "../../components/SectionTitle";
import { QuickAction } from "../../components/QuickAction";
import { products, money } from "../../constants/mockData";
import { useCart } from "../../context/CartContext";

export default function HomeScreen() {
  const router = useRouter();
  const { notice } = useCart();

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <Header />
      {notice ? <View style={styles.notice}><Ionicons name="checkmark-circle" size={18} color="#0D9488" /><Text style={styles.noticeText}>{notice}</Text></View> : null}

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero Section - أكثر إحكاماً */}
        <View style={styles.hero}>
          <View style={styles.heroCopy}>
            <Text style={styles.eyebrow}>وردية اليوم • الأربعاء 14 أكتوبر</Text>
            <Text style={styles.heroTitle}>خلّ البيع أسرع،{"\n"}<Text style={styles.heroAccent}>والحساب أوضح.</Text></Text>
            <Text style={styles.heroBody}>كل ما تحتاجه لإتمام عملية بيع مرتبة من شاشة واحدة.</Text>
            <Pressable style={styles.primaryButton} onPress={() => router.push("/sales")}>
              <Text style={styles.primaryButtonText}>ابدأ بيعًا جديدًا</Text>
              <Ionicons name="arrow-back" size={16} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>

        <SectionTitle title="اختصارات التشغيل" />
        <View style={styles.quickGrid}>
          <QuickAction icon="pricetags-outline" label="المنتجات" detail={`${products.length} أصناف`} onPress={() => router.push("/sales")} />
          <QuickAction icon="cart-outline" label="سلة البيع" detail={useCart().cart.length ? "عناصر" : "فارغة الآن"} onPress={() => router.push("/cart")} />
          <QuickAction icon="bar-chart-outline" label="التقارير" detail="ملخص اليوم" onPress={() => router.push("/reports")} />
          <QuickAction icon="people-outline" label="الحسابات" detail="4 عملاء" onPress={() => router.push("/accounts")} />
        </View>

        <SectionTitle title="الأكثر مبيعًا" action="عرض الكل" onPress={() => router.push("/sales")} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featuredRow}>
          {products.slice(0, 4).map((product) => (
            <Pressable key={product.id} style={styles.featuredCard} onPress={() => router.push("/sales")}>
              <View style={[styles.featuredIcon, { backgroundColor: product.color }]}><Ionicons name={product.icon} size={24} color="#0F172A" /></View>
              <Text style={styles.featuredName} numberOfLines={2}>{product.name}</Text>
              <Text style={styles.featuredPrice}>{money(product.price)}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F1F5F9" },
  scrollContent: { padding: 16, paddingBottom: 100 },
  notice: { marginHorizontal: 16, marginTop: 8, padding: 10, borderRadius: 12, backgroundColor: "#CCFBF1", flexDirection: "row-reverse", alignItems: "center", gap: 6 },
  noticeText: { flex: 1, color: "#0F766E", fontSize: 12, fontWeight: "700", textAlign: "right" },
  hero: { backgroundColor: "#0F172A", borderRadius: 20, padding: 18, minHeight: 170, justifyContent: "center" },
  heroCopy: { flex: 1 },
  eyebrow: { color: "#94A3B8", fontSize: 10, fontWeight: "700", textAlign: "right", marginBottom: 8 },
  heroTitle: { color: "#FFFFFF", fontSize: 22, lineHeight: 28, fontWeight: "800", textAlign: "right" },
  heroAccent: { color: "#2DD4BF" },
  heroBody: { color: "#CBD5E1", fontSize: 12, lineHeight: 18, textAlign: "right", marginTop: 6, maxWidth: 220 },
  primaryButton: { backgroundColor: "#0D9488", paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, alignSelf: "flex-end", flexDirection: "row-reverse", gap: 6, alignItems: "center", marginTop: 14 },
  primaryButtonText: { color: "#FFFFFF", fontWeight: "800", fontSize: 12 },
  quickGrid: { flexDirection: "row-reverse", flexWrap: "wrap", gap: 10 },
  featuredRow: { gap: 10, paddingBottom: 4 },
  featuredCard: { width: 130, padding: 10, backgroundColor: "#FFFFFF", borderRadius: 16, borderWidth: 1, borderColor: "#E2E8F0" },
  featuredIcon: { width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center", alignSelf: "flex-end", marginBottom: 8 },
  featuredName: { color: "#0F172A", fontSize: 11, lineHeight: 16, fontWeight: "700", textAlign: "right", minHeight: 32 },
  featuredPrice: { color: "#0D9488", fontSize: 12, fontWeight: "800", textAlign: "right", marginTop: 6 },
});
