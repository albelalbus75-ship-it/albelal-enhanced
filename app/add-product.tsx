import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useProducts } from "../context/ProductContext";
import { Header } from "../components/Header";

export default function AddProductScreen() {
  const router = useRouter();
  const { categories, addProduct } = useProducts();
  const [permission, requestPermission] = useCameraPermissions();
  
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState(categories[1] || "أدوات منزلية");
  const [barcode, setBarcode] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [notice, setNotice] = useState("");

  const handleSave = () => {
    if (!name.trim() || !price.trim()) {
      setNotice("الرجاء إدخال اسم المنتج والسعر على الأقل");
      return;
    }
    
    addProduct({
      id: Date.now().toString(),
      name: name.trim(),
      category: category,
      price: parseFloat(price) || 0,
      stock: parseInt(stock) || 0,
      icon: "cube-outline", // أيقونة افتراضية
      color: "#E2E8F0", // لون افتراضي
      note: barcode ? `باركود: ${barcode}` : undefined,
    });

    setNotice("تمت إضافة المنتج بنجاح");
    setTimeout(() => {
      router.push("/sales");
    }, 1500);
  };

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    setBarcode(data);
    setShowScanner(false);
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

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>إضافة صنف جديد</Text>
        <Text style={styles.subtitle}>أدخل تفاصيل المنتج واضغط حفظ</Text>

        {/* اسم المنتج */}
        <Text style={styles.label}>اسم المنتج *</Text>
        <TextInput value={name} onChangeText={setName} placeholder="مثال: طقم قدور جرانيت" placeholderTextColor="#94A3B8" style={styles.input} textAlign="right" />

        {/* السعر والمخزون */}
        <View style={styles.row}>
          <View style={styles.half}>
            <Text style={styles.label}>السعر (ريال) *</Text>
            <TextInput value={price} onChangeText={setPrice} placeholder="0.00" keyboardType="numeric" placeholderTextColor="#94A3B8" style={styles.input} textAlign="right" />
          </View>
          <View style={styles.half}>
            <Text style={styles.label}>الكمية بالمخزون</Text>
            <TextInput value={stock} onChangeText={setStock} placeholder="0" keyboardType="numeric" placeholderTextColor="#94A3B8" style={styles.input} textAlign="right" />
          </View>
        </View>

        {/* القسم */}
        <Text style={styles.label}>القسم</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
          {categories.filter(c => c !== "الكل").map((item) => (
            <Pressable key={item} onPress={() => setCategory(item)} style={[styles.chip, category === item && styles.chipActive]}>
              <Text style={[styles.chipText, category === item && styles.chipTextActive]}>{item}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* الباركود */}
        <Text style={styles.label}>الباركود</Text>
        <View style={styles.barcodeRow}>
          <TextInput value={barcode} onChangeText={setBarcode} placeholder="أدخل الباركود يدوياً أو صوره" placeholderTextColor="#94A3B8" style={[styles.input, { flex: 1 }]} textAlign="right" />
          <Pressable style={styles.scanButton} onPress={() => {
            if (!permission?.granted) {
              requestPermission();
            } else {
              setShowScanner(true);
            }
          }}>
            <Ionicons name="camera-outline" size={22} color="#FFFFFF" />
          </Pressable>
        </View>

        {/* زر الحفظ */}
        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Ionicons name="checkmark-circle-outline" size={22} color="#FFFFFF" />
          <Text style={styles.saveButtonText}>حفظ المنتج</Text>
        </Pressable>
      </ScrollView>

      {/* نافذة الكاميرا لمسح الباركود */}
      <Modal visible={showScanner} animationType="slide">
        <View style={styles.scannerContainer}>
          {permission?.granted ? (
            <CameraView
              style={StyleSheet.absoluteFillObject}
              facing="back"
              onBarcodeScanned={handleBarcodeScanned}
              barcodeScannerSettings={{
                barcodeTypes: ["qr", "ean13", "ean8", "code128", "code39", "upc_a"],
              }}
            />
          ) : (
            <View style={styles.permissionView}>
              <Text style={styles.permissionText}>نحتاج إذن الكاميرا لمسح الباركود</Text>
              <Pressable style={styles.permissionButton} onPress={requestPermission}>
                <Text style={styles.permissionButtonText}>منح الإذن</Text>
              </Pressable>
            </View>
          )}
          
          {/* إطار المسح */}
          <View style={styles.scanFrame} />
          
          <Pressable style={styles.closeScanner} onPress={() => setShowScanner(false)}>
            <Ionicons name="close" size={28} color="#FFFFFF" />
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F1F5F9" },
  content: { padding: 16, paddingBottom: 100 },
  title: { color: "#0F172A", fontSize: 22, fontWeight: "900", textAlign: "right", marginBottom: 4 },
  subtitle: { color: "#64748B", fontSize: 12, textAlign: "right", marginBottom: 20 },
  label: { color: "#0F172A", fontSize: 13, fontWeight: "800", textAlign: "right", marginBottom: 6, marginTop: 14 },
  input: { height: 48, borderRadius: 12, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E2E8F0", paddingHorizontal: 14, fontSize: 13, color: "#0F172A" },
  row: { flexDirection: "row-reverse", gap: 10 },
  half: { flex: 1 },
  chipsRow: { gap: 6, paddingBottom: 4, flexDirection: "row-reverse" },
  chip: { paddingHorizontal: 14, height: 34, borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E2E8F0" },
  chipActive: { backgroundColor: "#0F172A", borderColor: "#0F172A" },
  chipText: { color: "#64748B", fontSize: 11, fontWeight: "700" },
  chipTextActive: { color: "#FFFFFF" },
  barcodeRow: { flexDirection: "row-reverse", gap: 8 },
  scanButton: { width: 48, height: 48, borderRadius: 12, backgroundColor: "#0D9488", alignItems: "center", justifyContent: "center" },
  saveButton: { flexDirection: "row-reverse", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: "#0F172A", height: 54, borderRadius: 14, marginTop: 30 },
  saveButtonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "800" },
  notice: { marginHorizontal: 16, marginTop: 8, padding: 10, borderRadius: 12, backgroundColor: "#CCFBF1", flexDirection: "row-reverse", alignItems: "center", gap: 6 },
  noticeText: { flex: 1, color: "#0F766E", fontSize: 12, fontWeight: "700", textAlign: "right" },
  scannerContainer: { flex: 1, backgroundColor: "#000" },
  permissionView: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  permissionText: { color: "#FFFFFF", fontSize: 16, textAlign: "center", marginBottom: 20 },
  permissionButton: { backgroundColor: "#0D9488", paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12 },
  permissionButtonText: { color: "#FFFFFF", fontSize: 14, fontWeight: "800" },
  scanFrame: { position: "absolute", top: "30%", left: "10%", right: "10%", height: 200, borderWidth: 2, borderColor: "#0D9488", borderRadius: 20, backgroundColor: "transparent" },
  closeScanner: { position: "absolute", top: 60, right: 20, width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(0,0,0,0.5)", alignItems: "center", justifyContent: "center" },
});
