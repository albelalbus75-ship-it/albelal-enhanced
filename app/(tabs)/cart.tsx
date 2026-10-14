import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useCartStore } from "../../store/useCartStore";
import { customers, money } from "../../constants/mockData";
import { Summary } from "../../components/Summary"; // تأكد من نقل هذا المكون
import { EmptyState } from "../../components/EmptyState"; // تأكد من نقل هذا المكون

export default function CartScreen() {
  const router = useRouter();
  const { cart, customer, payment, updateQuantity, setCustomer, setPayment, finishSale, notice } = useCartStore();

  const itemCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = cart.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const vat = subtotal * 0.15;
  const total = subtotal + vat;

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      {notice ? <View style={styles.notice}><Ionicons name="checkmark-circle" size={19} color="#0D806F" /><Text style={styles.noticeText}>{notice}</Text></View> : null}
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.screenHeading}>
          <View><Text style={styles.screenTitle}>سلة البيع</Text><Text style={styles.screenSubtitle}>{itemCount} عناصر في الفاتورة الحالية</Text></View>
          <View style={styles.cartTotalPill}><Text style={styles.cartTotalValue}>{money(total)}</Text></View>
        </View>

        {cart.length === 0 ? (
          <EmptyState icon="cart-outline" title="السلة فارغة" body="تصفح المنتجات وأضف الأصناف التي تريد بيعها." action="تصفح المنتجات" onPress={() => router.push("/sales")} />
        ) : (
          <>
            <View style={styles.linesCard}>
              {cart.map((line) => (
                <View key={line.id} style={styles.cartLine}>
                  <View style={[styles.lineIcon, { backgroundColor: line.color }]}><Ionicons name={line.icon} size={20} color="#132238" /></View>
                  <View style={styles.lineInfo}><Text style={styles.lineName} numberOfLines={2}>{line.name}</Text><Text style={styles.linePrice}>{money(line.price)} للوحدة</Text></View>
                  <View style={styles.stepper}>
                    <Pressable onPress={() => updateQuantity(line.id, 1)} style={styles.stepButton}><Ionicons name="add" size={17} color="#132238" /></Pressable>
                    <Text style={styles.quantity}>{line.quantity}</Text>
                    <Pressable onPress={() => updateQuantity(line.id, -1)} style={styles.stepButton}><Ionicons name="remove" size={17} color="#132238" /></Pressable>
                  </View>
                </View>
              ))}
            </View>

            <Text style={styles.formLabel}>العميل</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.customerRow}>
              {customers.map((item) => (
                <Pressable key={item.id} onPress={() => setCustomer(item)} style={[styles.customerChip, customer.id === item.id && styles.customerChipActive]}>
                  <Text style={[styles.customerName, customer.id === item.id && styles.customerTextActive]}>{item.name}</Text>
                  <Text style={[styles.customerDetail, customer.id === item.id && styles.customerTextActive]}>{item.detail}</Text>
                </Pressable>
              ))}
            </ScrollView>

            <Text style={styles.formLabel}>طريقة الدفع</Text>
            <View style={styles.paymentRow}>
              {["نقدًا", "شبكة", "آجل"].map((item) => (
                <Pressable key={item} onPress={() => setPayment(item)} style={[styles.paymentOption, payment === item && styles.paymentActive]}>
                  <Ionicons name={item === "نقدًا" ? "cash-outline" : item === "شبكة" ? "card-outline" : "time-outline"} size={20} color={payment === item ? "#FFFFFF" : "#132238"} />
                  <Text style={[styles.paymentText, payment === item && styles.paymentTextActive]}>{item}</Text>
                </Pressable>
              ))}
            </View>

            <Summary subtotal={subtotal} vat={vat} total={total} />
            <Pressable style={styles.checkoutButton} onPress={finishSale}>
              <Text style={styles.checkoutText}>إتمام البيع • {money(total)}</Text>
              <Ionicons name="checkmark-circle-outline" size={22} color="#FFFFFF" />
            </Pressable>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// ... (أضف الأنماط الخاصة بهذه الشاشة هنا)
const styles = StyleSheet.create({ /* ... */ });
