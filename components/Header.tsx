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
          <Text style={styles.brandName}>مركز البلال</Text>
          <Text style={styles.brandSub}>كاشير المبيعات</Text>
        </View>
      </View>
      <Pressable style={styles.cartHeaderButton} onPress={() => router.push("/cart")} accessibilityLabel="فتح سلة البيع">
        <Ionicons name="cart-outline" size={23} color="#132238" />
        {itemCount > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{itemCount}</Text></View>}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { height: 76, paddingHorizontal: 18, flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between", backgroundColor: "#FFFFFF", borderBottomWidth: 1, borderBottomColor: "#EDF0F4" },
  headerIdentity: { flexDirection: "row-reverse", alignItems: "center", gap: 10 },
  brandName: { color: "#132238", fontSize: 16, fontWeight: "800", textAlign: "right" },
  brandSub: { color: "#7B8799", fontSize: 11, marginTop: 2, textAlign: "right" },
  cartHeaderButton: { width: 43, height: 43, borderRadius: 14, backgroundColor: "#F2F5F7", alignItems: "center", justifyContent: "center", position: "relative" },
  badge: { position: "absolute", top: -4, left: -4, width: 19, height: 19, borderRadius: 10, backgroundColor: "#F28D54", alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "#FFFFFF" },
  badgeText: { color: "#FFFFFF", fontSize: 10, fontWeight: "800" },
});
