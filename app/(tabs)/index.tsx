import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { BrandMark } from "../../components/BrandMark";
import { SectionTitle } from "../../components/SectionTitle";
import { QuickAction } from "../../components/QuickAction"; // تأكد من نقل هذا المكون
import { products, money } from "../../constants/mockData";
import { useCartStore } from "../../store/useCartStore";

export default function HomeScreen() {
  const router = useRouter();
  const { cart, notice, setNotice } = useCartStore();
  const itemCount = cart.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <View style={styles.headerIdentity}><BrandMark /><View><Text style={styles.brandName}>مركز البلال</Text><Text style={styles.brandSub}>كاشير المبيعات</Text></View></View>
        <Pressable style={styles.cartHeaderButton} onPress={() => router.push("/cart")} accessibilityLabel="فتح سلة البيع">
          <Ionicons name="cart-outline" size={23} color="#132238" />
          {itemCount > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{itemCount}</Text></View>}
        </Pressable>
      </View>

      {notice ? <View style={styles.notice}><Ionicons name="checkmark-circle" size={19} color="#0D806F" /><Text style={styles.noticeText}>{notice}</Text></View> : null}

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.heroCopy}>
            <Text style={styles.eyebrow}>وردية اليوم • الأربعاء 14 أكتوبر</Text>
            <Text style={styles.heroTitle}>خلّ البيع أسرع،{"\n"}<Text style={styles.heroAccent}>والحساب أوضح.</Text></Text>
            <Text style={styles.heroBody}>كل ما تحتاجه لإتمام عملية بيع مرتبة من شاشة واحدة.</Text>
            <Pressable style={styles.primaryButton} onPress={() => router.push("/sales")}>
              <Text style={styles.primaryButtonText}>ابدأ بيعًا جديدًا</Text>
              <Ionicons name="arrow-back" size={18} color="#FFFFFF" />
            </Pressable>
          </View>
          <View style={styles.heroOrb}><Ionicons name="receipt" size={48} color="#FFFFFF" /></View>
        </View>

        <SectionTitle title="اختصارات التشغيل" />
        <View style={styles.quickGrid}>
          <QuickAction icon="pricetags-outline" label="المنتجات" detail={`${products.length} أصناف`} onPress={() => router.push("/sales")} />
          <QuickAction icon="cart-outline" label="سلة البيع" detail={itemCount ? `${itemCount} عناصر` : "فارغة الآن"} onPress={() => router.push("/cart")} />
          <QuickAction icon="bar-chart-outline" label="التقارير" detail="ملخص اليوم" onPress={() => router.push("/reports")} />
          <QuickAction icon="people-outline" label="الحسابات" detail="4 عملاء" onPress={() => router.push("/accounts")} />
        </View>

        <SectionTitle title="الأكثر مبيعًا" action="عرض الكل" onPress={() => router.push("/sales")} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featuredRow}>
          {products.slice(0, 4).map((product) => (
            <Pressable key={product.id} style={styles.featuredCard} onPress={() => router.push("/sales")}>
              <View style={[styles.featuredIcon, { backgroundColor: product.color }]}><Ionicons name={product.icon} size={28} color="#132238" /></View>
              <Text style={styles.featuredName} numberOfLines={2}>{product.name}</Text>
              <Text style={styles.featuredPrice}>{money(product.price)}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

// ... (أضف الأنماط الخاصة بهذه الشاشة هنا)
const styles = StyleSheet.create({ /* ... */ });
