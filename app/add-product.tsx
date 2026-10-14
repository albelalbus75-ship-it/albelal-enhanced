import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Header } from "../components/Header";

export default function AddProductScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [notice, setNotice] = useState("");

  const handleSave = () => {
    if (!name.trim()) {
      setNotice("الرجاء إدخال اسم المنتج");
      return;
    }
    setNotice("تم حفظ المنتج بنجاح (نسخة تجريبية)");
    setTimeout(() => router.push("/sales"), 1500);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <Header />
      {notice ? (
        <View style={styles.notice}>
          <Text style={styles.noticeText}>{notice}</Text>
        </View>
      ) : null}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>إضافة صنف جديد</Text>
        <Text style={styles.label}>اسم المنتج *</Text>
        <TextInput value={name} onChangeText={setName} placeholder="اسم المنتج" style={styles.input} textAlign="right" />
        <Text style={styles.label}>السعر</Text>
        <TextInput value={price} onChangeText={setPrice} placeholder="0.00" keyboardType="numeric" style={styles.input} textAlign="right" />
        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>حفظ المنتج</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F1F5F9" },
  content: { padding: 16 },
  title: { color: "#0F172A", fontSize: 22, fontWeight: "900", textAlign: "right", marginBottom: 20 },
  label: { color: "#0F172A", fontSize: 13, fontWeight: "800", textAlign: "right", marginBottom: 6, marginTop: 14 },
  input: { height: 48, borderRadius: 12, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E2E8F0", paddingHorizontal: 14, fontSize: 13, color: "#0F172A" },
  saveButton: { backgroundColor: "#0F172A", height: 54, borderRadius: 14, marginTop: 30, alignItems: "center", justifyContent: "center" },
  saveButtonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "800" },
  notice: { margin: 16, padding: 10, borderRadius: 12, backgroundColor: "#CCFBF1" },
  noticeText: { color: "#0F766E", fontSize: 12, fontWeight: "700", textAlign: "center" },
});
