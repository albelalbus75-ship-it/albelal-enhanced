import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductCard } from "../../components/ProductCard";
import { EmptyState } from "../../components/EmptyState";
import { ProductDetail } from "../../components/ProductDetail";
import { Header } from "../../components/Header"; // 👈 استيراد الرأس الموحد
import { categories, products } from "../../constants/mockData";
import { Product } from "../../constants/types";
import { useCart } from "../../context/CartContext";

export default function SalesScreen() {
  const [category, setCategory] = useState("الكل");
  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = category === "الكل" || product.category === category;
    const matchesQuery = product.name.includes(query.trim()) || product.category.includes(query.trim());
    return matchesCategory && matchesQuery;
  }), [category, query]);

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      {/* 👈 إضافة الرأس هنا ليظهر في كل الشاشات */}
      <Header />

      <View style={styles.screenHeading}>
        <View>
          <Text style={styles.screenTitle}>المنتجات</Text>
          <Text style={styles.screenSubtitle}>{filteredProducts.length} صنف متاح للبيع</Text>
        </View>
        <Pressable style={styles.iconButton} onPress={() => { setQuery(""); setCategory("الكل"); }}>
          <Ionicons name="refresh-outline" size={21} color="#132238" />
        </Pressable>
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={20} color="#7B8799" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="ابحث باسم المنتج أو القسم"
          placeholderTextColor="#98A2B2"
          style={styles.searchInput}
          textAlign="right"
        />
        <Pressable onPress={() => setQuery("")}>
          <Ionicons name="close-circle" size={18} color={query ? "#7B8799" : "transparent"} />
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
        {categories.map((item) => (
          <Pressable
            key={item}
            onPress={() => setCategory(item)}
            style={[styles.chip, category === item && styles.chipActive]}
          >
            <Text style={[styles.chipText, category === item && styles.chipTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* 👈 إصلاح المشكلة: وضع القائمة داخل View بـ flex: 1 لمنع التداخل */}
      <View style={{ flex: 1 }}>
        {selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onAdd={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
            onClose={() => setSelectedProduct(null)}
          />
        ) : (
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.productList}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                onAdd={() => addToCart(item)}
                onOpen={() => setSelectedProduct(item)}
              />
            )}
            ListEmptyComponent={
              <EmptyState
                icon="search-outline"
                title="لم نعثر على منتجات"
                body="جرّب كلمة بحث مختلفة أو امسح التصفية."
                action="مسح البحث"
                onPress={() => { setQuery(""); setCategory("الكل"); }}
              />
            }
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F7F8FA" },
  screenHeading: {
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 12,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  screenTitle: { color: "#132238", fontSize: 25, fontWeight: "900", textAlign: "right" },
  screenSubtitle: { color: "#8290A3", fontSize: 12, marginTop: 5, textAlign: "right" },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#EDF0F4",
  },
  searchBox: {
    marginHorizontal: 18,
    height: 49,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E7EBF0",
    paddingHorizontal: 13,
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 9,
  },
  searchInput: { flex: 1, color: "#132238", fontSize: 13 },
  chipsRow: { paddingHorizontal: 18, gap: 8, paddingVertical: 14 },
  chip: {
    paddingHorizontal: 15,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E7EBF0",
  },
  chipActive: { backgroundColor: "#132238", borderColor: "#132238" },
  chipText: { color: "#69768A", fontSize: 12, fontWeight: "700" },
  chipTextActive: { color: "#FFFFFF" },
  productList: { paddingHorizontal: 18, paddingBottom: 112, gap: 10 },
});
