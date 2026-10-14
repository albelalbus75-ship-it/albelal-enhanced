import { Ionicons } from "@expo/vector-icons";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useCart } from "../context/CartContext";
import { BrandMark } from "./BrandMark";

export function Header() {
  const router = useRouter();
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <View style={styles.header}>
      <View style={styles.headerIdentity}>
        <BrandMark />
        <View>
          <Text style={styles.brandName}>مركز الفيصل</Text>
          <Text style={styles.brandSub}>كاشير المبيعات</Text>
        </View>
      </View>
      <Pressable style={styles.cartHeaderButton} onPress={() => router.push("/cart")} accessibilityLabel="فتح سلة البيع">
        <Ionicons name="cart-outline" size={20} color="#0F172A" />
        {itemCount > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{itemCount}</Text></View>}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { height: 60, paddingHorizontal: 16, flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between", backgroundColor: "#FFFFFF", borderBottomWidth: 1, borderBottomColor: "#E2E8F0" },
  headerIdentity: { flexDirection: "row-reverse", alignItems: "center", gap: 8 },
  brandName: { color: "#0F172A", fontSize: 14, fontWeight: "800", textAlign: "right" },
  brandSub: { color: "#64748B", fontSize: 10, marginTop: 1, textAlign: "right" },
  cartHeaderButton: { width: 38, height: 38, borderRadius: 12, backgroundColor: "#F1F5F9", alignItems: "center", justifyContent: "center", position: "relative" },
  badge: { position: "absolute", top: -4, left: -4, width: 18, height: 18, borderRadius: 9, backgroundColor: "#F97316", alignItems: "center", justifyContent: "center", borderWidth: 1.5, borderColor: "#FFFFFF" },
  badgeText: { color: "#FFFFFF", fontSize: 9, fontWeight: "800" },
});
