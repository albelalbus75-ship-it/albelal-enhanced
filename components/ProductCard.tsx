import { Ionicons } from "@expo/vector-icons";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Product } from "../constants/types";
import { money } from "../constants/mockData";

export function ProductCard({ product, onAdd, onOpen }: { product: Product; onAdd: () => void; onOpen: () => void }) {
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

const styles = StyleSheet.create({
  productCard: { backgroundColor: "#FFFFFF", borderRadius: 18, padding: 12, flexDirection: "row-reverse", alignItems: "center", gap: 11, borderWidth: 1, borderColor: "#EDF0F4", minHeight: 112 },
  productIcon: { width: 62, height: 62, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  productInfo: { flex: 1 },
  productCategory: { color: "#0D9D8E", fontSize: 10, fontWeight: "800", textAlign: "right" },
  productName: { color: "#132238", fontSize: 13, fontWeight: "800", lineHeight: 19, textAlign: "right", marginTop: 3 },
  productNote: { color: "#8D98A8", fontSize: 10, textAlign: "right", marginTop: 3 },
  productBottom: { flexDirection: "row-reverse", justifyContent: "space-between", alignItems: "center", marginTop: 5 },
  productPrice: { color: "#132238", fontSize: 14, fontWeight: "900" },
  stockText: { color: "#9AA3B1", fontSize: 10 },
  addButton: { width: 38, height: 38, borderRadius: 13, backgroundColor: "#19B7A5", alignItems: "center", justifyContent: "center" },
});
