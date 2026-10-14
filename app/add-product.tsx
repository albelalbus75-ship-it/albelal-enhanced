import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useProducts } from "../context/ProductContext";
import { Header } from "../components/Header";

export default function AddProductScreen() {
  const router = useRouter();
  const { categories, addProduct } = useProducts();
  
  // حالات الحقول
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [unit, setUnit] = useState("");
  const [barcode, setBarcode] = useState("");
  const [category, setCategory] = useState(categories[1] || "أدوات منزلية");
  const [costPrice, setCostPrice] = useState("");
  const [retailPrice, setRetailPrice] = useState("");
  const [wholesalePrice, setWholesalePrice] = useState("");
  const [notes, setNotes] = useState("");
  const [notice, setNotice] = useState("");

  // حفظ المنتج
  const handleSave = () => {
    if (!name.trim() || !retailPrice.trim()) {
      setNotice("الرجاء إدخال اسم الصنف وسعر التجزئة على الأقل");
      return;
    }
    
    addProduct({
      id: Date.now().toString(),
      code: code.trim() || undefined,
      name: name.trim(),
      model: model.trim() || undefined,
      unit: unit.trim() || undefined,
      barcode: barcode.trim() || undefined,
      category: category,
      costPrice: parseFloat(costPrice) || 0,
      price: parseFloat(retailPrice) || 0, // سعر التجزئة
      wholesalePrice: parseFloat(wholesalePrice) || 0,
      stock: 0, // يمكن إضافة حقل للمخزون لاحقاً
      icon: "cube-outline",
      color: "#E2E8F0",
      note: notes.trim() || undefined,
    });

    setNotice("تمت إضافة الصنف بنجاح");
    setTimeout(() => router.push("/sales"), 1500);
  };

  // زر الحذف (يظهر فقط عند التعديل مستقبلاً)
  const handleDelete = () => {
    Alert.alert("تنبيه", "لا يمكن حذف صنف جديد لم يتم حفظه بعد.");
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
        <Text style={styles.subtitle}>أدخل تفاصيل الصنف بدقة ثم اضغط حفظ</Text>

        {/* قسم البيانات الأساسية */}
        <Text style={styles.sectionTitle}>البيانات الأساسية</Text>
        
        <Text style={styles.label}>رقم الصنف</Text>
        <TextInput value={code} onChangeText={setCode} placeholder="مثال: 1001" placeholderTextColor="#94A3B8" style={styles.input} textAlign="right" keyboardType="numeric" />

        <Text style={styles.label}>اسم الصنف *</Text>
        <TextInput value={name} onChangeText={setName} placeholder="مثال: طقم قدور جرانيت" placeholderTextColor="#94A3B8" style={styles.input} textAlign="right" />

        <Text style={styles.label}>موديل الصنف</Text>
        <TextInput value={model} onChangeText={setModel} placeholder="مثال: GR-9PCS" placeholderTextColor="#94A3B8" style={styles.input} textAlign="right" />

        <Text style={styles.label}>الوحدة</Text>
        <TextInput value={unit} onChangeText={setUnit} placeholder="مثال: قطعة، كرتون، كجم" placeholderTextColor="#94A3B8" style={styles.input} textAlign="right" />

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
        <Text style={styles.label}>باركود الصنف</Text>
        <View style={styles.barcodeRow}>
          <TextInput value={barcode} onChangeText={setBarcode} placeholder="أدخل الباركود يدوياً" placeholderTextColor="#94A3B8" style={[styles.input, { flex: 1 }]} textAlign="right" keyboardType="numeric" />
          <Pressable style={styles.scanButton} onPress={() => {
            setNotice("ميزة تصوير الباركود ستتوفر قريباً. أدخل الرقم يدوياً.");
            setTimeout(() => setNotice(""), 3000);
          }}>
            <Ionicons name="camera-outline" size={22} color="#FFFFFF" />
          </Pressable>
        </View>

        {/* قسم الأسعار */}
        <Text style={styles.sectionTitle}>الأسعار</Text>

        <View style={styles.row}>
          <View style={styles.half}>
            <Text style={styles.label}>سعر التكلفة</Text>
            <TextInput value={costPrice} onChangeText={setCostPrice} placeholder="0.00" keyboardType="numeric" placeholderTextColor="#94A3B8" style={styles.input} textAlign="right" />
          </View>
          <View style={styles.half}>
            <Text style={styles.label}>سعر التجزئة *</Text>
            <TextInput value={retailPrice} onChangeText={setRetailPrice} placeholder="0.00" keyboardType="numeric" placeholderTextColor="#94A3B8" style={styles.input} textAlign="right" />
          </View>
        </View>

        <Text style={styles.label}>سعر الجملة</Text>
        <TextInput value={wholesalePrice} onChangeText={setWholesalePrice} placeholder="0.00" keyboardType="numeric" placeholderTextColor="#94A3B8" style={styles.input} textAlign="right" />

        {/* ملاحظات */}
        <Text style={styles.label}>ملاحظات</Text>
        <TextInput 
          value={notes} 
          onChangeText={setNotes} 
          placeholder="أي ملاحظات إضافية عن الصنف..." 
          placeholderTextColor="#94A3B8" 
          style={[styles.input, styles.textArea]} 
          textAlign="right" 
          multiline
          numberOfLines={4}
        />

        {/* الأزرار */}
        <View style={styles.buttonsRow}>
          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Ionicons name="checkmark-circle-outline" size={20} color="#FFFFFF" />
            <Text style={styles.saveButtonText}>حفظ</Text>
          </Pressable>
          
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-forward-outline" size={20} color="#0F172A" />
            <Text style={styles.backButtonText}>تراجع</Text>
          </Pressable>
        </View>

        <Pressable style={styles.deleteButton} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={18} color="#EF4444" />
          <Text style={styles.deleteButtonText}>حذف الصنف (يظهر عند وجود حركة)</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F1F5F9" },
  content: { padding: 16, paddingBottom: 60 },
  title: { color: "#0F172A", fontSize: 22, fontWeight: "900", textAlign: "right", marginBottom: 4 },
  subtitle: { color: "#64748B", fontSize: 12, textAlign: "right", marginBottom: 20 },
  sectionTitle: { color: "#0D9488", fontSize: 14, fontWeight: "900", textAlign: "right", marginTop: 24, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: "#E2E8F0", paddingBottom: 6 },
  label: { color: "#0F172A", fontSize: 13, fontWeight: "800", textAlign: "right", marginBottom: 6, marginTop: 12 },
  input: { height: 48, borderRadius: 12, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E2E8F0", paddingHorizontal: 14, fontSize: 13, color: "#0F172A" },
  textArea: { height: 100, paddingTop: 12, textAlignVertical: "top" },
  row: { flexDirection: "row-reverse", gap: 10 },
  half: { flex: 1 },
  chipsRow: { gap: 6, paddingBottom: 4, flexDirection: "row-reverse" },
  chip: { paddingHorizontal: 14, height: 34, borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E2E8F0" },
  chipActive: { backgroundColor: "#0F172A", borderColor: "#0F172A" },
  chipText: { color: "#64748B", fontSize: 11, fontWeight: "700" },
  chipTextActive: { color: "#FFFFFF" },
  barcodeRow: { flexDirection: "row-reverse", gap: 8 },
  scanButton: { width: 48, height: 48, borderRadius: 12, backgroundColor: "#0D9488", alignItems: "center", justifyContent: "center" },
  
  // الأزرار
  buttonsRow: { flexDirection: "row-reverse", gap: 10, marginTop: 30 },
  saveButton: { flex: 1, flexDirection: "row-reverse", alignItems: "center", justifyContent: "center", gap: 6, backgroundColor: "#0D9488", height: 54, borderRadius: 14 },
  saveButtonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "800" },
  backButton: { flex: 1, flexDirection: "row-reverse", alignItems: "center", justifyContent: "center", gap: 6, backgroundColor: "#FFFFFF", height: 54, borderRadius: 14, borderWidth: 1, borderColor: "#E2E8F0" },
  backButtonText: { color: "#0F172A", fontSize: 15, fontWeight: "800" },
  deleteButton: { flexDirection: "row-reverse", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 16, height: 48, borderRadius: 12, backgroundColor: "#FEF2F2", borderWidth: 1, borderColor: "#FECACA" },
  deleteButtonText: { color: "#EF4444", fontSize: 12, fontWeight: "700" },
  
  notice: { marginHorizontal: 16, marginTop: 8, padding: 10, borderRadius: 12, backgroundColor: "#CCFBF1", flexDirection: "row-reverse", alignItems: "center", gap: 6 },
  noticeText: { flex: 1, color: "#0F766E", fontSize: 12, fontWeight: "700", textAlign: "right" },
});
