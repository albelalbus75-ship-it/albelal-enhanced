import { Ionicons } from "@expo/vector-icons";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Product } from "../constants/types";
import { money } from "../constants/mockData";

export function ProductCard({ product, onAdd, onOpen }: { product: Product; onAdd: () => void; onOpen: () => void }) {
  return (
    <Pressable style={styles.productCard} onPress={onOpen}>
      <View style={[styles.productIcon, { backgroundColor: product.color }]}><Ionicons name={product.icon} size={24} color="#0F172A" /></View>
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
        <Ionicons name="add" size={18} color="#FFFFFF" />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  productCard: { backgroundColor: "#FFFFFF", borderRadius: 16, padding: 10, flexDirection: "row-reverse", alignItems: "center", gap: 10, borderWidth: 1, borderColor: "#E2E8F0", minHeight: 96 },
  productIcon: { width: 54, height: 54, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  productInfo: { flex: 1 },
  productCategory: { color: "#0D9488", fontSize: 9, fontWeight: "800", textAlign: "right" },
  productName: { color: "#0F172A", fontSize: 12, fontWeight: "800", lineHeight: 17, textAlign: "right", marginTop: 2 },
  productNote: { color: "#94A3B8", fontSize: 9, textAlign: "right", marginTop: 2 },
  productBottom: { flexDirection: "row-reverse", justifyContent: "space-between", alignItems: "center", marginTop: 4 },
  productPrice: { color: "#0F172A", fontSize: 13, fontWeight: "900" },
  stockText: { color: "#94A3B8", fontSize: 9 },
  addButton: { width: 34, height: 34, borderRadius: 11, backgroundColor: "#0D9488", alignItems: "center", justifyContent: "center" },
});
