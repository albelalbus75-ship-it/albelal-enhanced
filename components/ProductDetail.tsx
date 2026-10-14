import { Ionicons } from "@expo/vector-icons";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Product } from "../constants/types";
import { money } from "../constants/mockData";

export function ProductDetail({ product, onAdd, onClose }: { product: Product; onAdd: () => void; onClose: () => void }) {
  return (
    <View style={styles.detailCard}>
      <Pressable style={styles.detailClose} onPress={onClose}><Ionicons name="close" size={22} color="#132238" /></Pressable>
      <View style={[styles.detailIcon, { backgroundColor: product.color }]}><Ionicons name={product.icon} size={56} color="#132238" /></View>
      <Text style={styles.detailCategory}>{product.category}</Text>
      <Text style={styles.detailTitle}>{product.name}</Text>
      <Text style={styles.detailNote}>{product.note}</Text>
      <Text style={styles.detailPrice}>{money(product.price)}</Text>
      <View style={styles.detailMeta}>
        <Text style={styles.detailMetaText}>متوفر في المخزون</Text>
        <Text style={styles.detailMetaStock}>{product.stock} حبة</Text>
      </View>
      <Pressable style={styles.primaryButtonWide} onPress={onAdd}>
        <Text style={styles.primaryButtonText}>إضافة إلى السلة</Text>
        <Ionicons name="cart-outline" size={20} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  detailCard: { backgroundColor: "#FFFFFF", borderRadius: 22, marginHorizontal: 18, padding: 20, alignItems: "center", borderWidth: 1, borderColor: "#EDF0F4" },
  detailClose: { alignSelf: "flex-start", width: 36, height: 36, borderRadius: 12, backgroundColor: "#F2F5F7", alignItems: "center", justifyContent: "center" },
  detailIcon: { width: 118, height: 118, borderRadius: 35, alignItems: "center", justifyContent: "center", marginTop: -2, marginBottom: 14 },
  detailCategory: { color: "#0D9D8E", fontSize: 12, fontWeight: "800" },
  detailTitle: { color: "#132238", fontSize: 21, lineHeight: 28, fontWeight: "900", textAlign: "center", marginTop: 7 },
  detailNote: { color: "#8994A5", fontSize: 13, marginTop: 7 },
  detailPrice: { color: "#132238", fontSize: 24, fontWeight: "900", marginTop: 16 },
  detailMeta: { width: "100%", flexDirection: "row-reverse", justifyContent: "space-between", marginTop: 17, paddingTop: 14, borderTopWidth: 1, borderTopColor: "#EDF0F4" },
  detailMetaText: { color: "#8994A5", fontSize: 12 },
  detailMetaStock: { color: "#0D806F", fontWeight: "800", fontSize: 12 },
  primaryButtonWide: { backgroundColor: "#19B7A5", paddingHorizontal: 16, paddingVertical: 14, borderRadius: 14, flexDirection: "row-reverse", gap: 8, alignItems: "center", justifyContent: "center", marginTop: 20, minHeight: 50, width: "100%" },
  primaryButtonText: { color: "#FFFFFF", fontWeight: "800", fontSize: 13 },
});
