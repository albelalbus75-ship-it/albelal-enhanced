import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useProducts } from "../context/ProductContext";
import { Header } from "../components/Header";

export default function AddCategoryScreen() {
  const router = useRouter();
  const { categories, addCategory } = useProducts();
  const [newCategory, setNewCategory] = useState("");
  const [notice, setNotice] = useState("");

  const handleAdd = () => {
    if (!newCategory.trim()) {
      setNotice("الرجاء إدخال اسم القسم");
      return;
    }
    addCategory(newCategory.trim());
    setNewCategory("");
    setNotice("تمت إضافة القسم بنجاح");
    setTimeout(() => setNotice(""), 2000);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <Header />
      
      {notice ? (
        <View style={styles.notice}>
          <Ionicons name="checkmark-circle" size={18} color="#0D9488" />
          <Text style={styles.noticeText}>{notice}</Text>
        </View>
      ) : null}

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>إدارة الأقسام</Text>
        <Text style={styles.subtitle}>أضف أقساماً جديدة لتصنيف المنتجات</Text>

        <View style={styles.inputRow}>
          <TextInput
            value={newCategory}
            onChangeText={setNewCategory}
            placeholder="اسم القسم الجديد (مثال: أدوات مكتبية)"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            textAlign="right"
          />
          <Pressable style={styles.addButton} onPress={handleAdd}>
            <Ionicons name="add" size={22} color="#FFFFFF" />
          </Pressable>
        </View>

        <Text style={styles.listTitle}>الأقسام الحالية ({categories.length - 1})</Text>
        <View style={styles.listContainer}>
          {categories.filter(c => c !== "الكل").map((cat, index) => (
            <View key={index} style={styles.categoryItem}>
              <Ionicons name="pricetag-outline" size={18} color="#0D9488" />
              <Text style={styles.categoryText}>{cat}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F1F5F9" },
  content: { padding: 16, paddingBottom: 100 },
  title: { color: "#0F172A", fontSize: 22, fontWeight: "900", textAlign: "right", marginBottom: 4 },
  subtitle: { color: "#64748B", fontSize: 12, textAlign: "right", marginBottom: 20 },
  inputRow: { flexDirection: "row-reverse", gap: 8, marginBottom: 24 },
  input: { flex: 1, height: 48, borderRadius: 12, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E2E8F0", paddingHorizontal: 14, fontSize: 13, color: "#0F172A" },
  addButton: { width: 48, height: 48, borderRadius: 12, backgroundColor: "#0D9488", alignItems: "center", justifyContent: "center" },
  listTitle: { color: "#0F172A", fontSize: 14, fontWeight: "800", textAlign: "right", marginBottom: 10 },
  listContainer: { gap: 8 },
  categoryItem: { flexDirection: "row-reverse", alignItems: "center", gap: 10, backgroundColor: "#FFFFFF", padding: 14, borderRadius: 12, borderWidth: 1, borderColor: "#E2E8F0" },
  categoryText: { color: "#0F172A", fontSize: 14, fontWeight: "700", flex: 1, textAlign: "right" },
  notice: { marginHorizontal: 16, marginTop: 8, padding: 10, borderRadius: 12, backgroundColor: "#CCFBF1", flexDirection: "row-reverse", alignItems: "center", gap: 6 },
  noticeText: { flex: 1, color: "#0F766E", fontSize: 12, fontWeight: "700", textAlign: "right" },
});
