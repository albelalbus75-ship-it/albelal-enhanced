import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductCard } from "../../components/ProductCard";
import { EmptyState } from "../../components/EmptyState";
import { ProductDetail } from "../../components/ProductDetail";
import { Header } from "../../components/Header";
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
      <Header />

      {/* 👇 شريط صغير مدمج: العنوان + زر التحديث + البحث في سطر واحد */}
      <View style={styles.compactBar}>
        <Text style={styles.compactTitle}>المنتجات</Text>
        <Text style={styles.compactCount}>{filteredProducts.length} صنف</Text>
        <Pressable style={styles.compactIconButton} onPress={() => { setQuery(""); setCategory("الكل"); }}>
          <Ionicons name="refresh-outline" size={16} color="#0F172A" />
        </Pressable>
      </View>

      {/* 👇 صندوق البحث مباشرة بدون عنوان كبير */}
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={18} color="#64748B" />
        <TextInput 
          value={query} 
          onChangeText={setQuery} 
          placeholder="ابحث باسم المنتج أو القسم" 
          placeholderTextColor="#94A3B8" 
          style={styles.searchInput} 
          textAlign="right" 
        />
        <Pressable onPress={() => setQuery("")}>
          <Ionicons name="close-circle" size={16} color={query ? "#64748B" : "transparent"} />
        </Pressable>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.chipsRow}
        style={styles.chipsScroll}
      >
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
  safe: { flex: 1, backgroundColor: "#F1F5F9" },
  
  // 👇 شريط صغير مدمج (بدل من screenHeading الضخم)
  compactBar: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 8,
  },
  compactTitle: { 
    color: "#0F172A", 
    fontSize: 16, 
    fontWeight: "900", 
    textAlign: "right" 
  },
  compactCount: { 
    color: "#64748B", 
    fontSize: 11, 
    fontWeight: "600",
    flex: 1,
    textAlign: "right",
    marginTop: 2,
  },
  compactIconButton: { 
    width: 32, 
    height: 32, 
    borderRadius: 10, 
    backgroundColor: "#FFFFFF", 
    alignItems: "center", 
    justifyContent: "center", 
    borderWidth: 1, 
    borderColor: "#E2E8F0" 
  },

  searchBox: { 
    marginHorizontal: 16, 
    marginTop: 4,
    height: 40, 
    borderRadius: 10, 
    backgroundColor: "#FFFFFF", 
    borderWidth: 1, 
    borderColor: "#E2E8F0", 
    paddingHorizontal: 12, 
    flexDirection: "row-reverse", 
    alignItems: "center", 
    gap: 8 
  },
  searchInput: { flex: 1, color: "#0F172A", fontSize: 12 },

  chipsScroll: {
    maxHeight: 46,
  },
  chipsRow: { 
    paddingHorizontal: 16, 
    gap: 6, 
    paddingVertical: 8,
    alignItems: "center",
  },
  chip: { 
    paddingHorizontal: 12, 
    height: 30, 
    borderRadius: 9, 
    alignItems: "center", 
    justifyContent: "center", 
    backgroundColor: "#FFFFFF", 
    borderWidth: 1, 
    borderColor: "#E2E8F0" 
  },
  chipActive: { backgroundColor: "#0F172A", borderColor: "#0F172A" },
  chipText: { color: "#64748B", fontSize: 11, fontWeight: "700" },
  chipTextActive: { color: "#FFFFFF" },

  productList: { paddingHorizontal: 16, paddingBottom: 100, gap: 8 },
});
