import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ItemsScreen() {
  const router = useRouter();

  // دالة محاكاة استيراد ملف أكسل
  const handleExcelImport = () => {
    Alert.alert(
      'استيراد الأصناف من ملف Excel',
      'يرجى اختيار ملف أكسل (.xlsx أو .csv) يحتوي على الأعمدة التالية:\n(الباركود، اسم الصنف، القسم، سعر التكلفة، سعر التجزئة)',
      [
        { text: 'إلغاء', style: 'cancel' },
        { text: 'اختيار ملف', onPress: () => console.log('Importing Excel...') },
      ]
    );
  };

  return (
    <View className="flex-1 bg-slate-100">
      <!-- Header -->
      <View className="bg-white px-5 py-4 border-b border-slate-200 pt-12 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-right" size={22} color="#334155" />
        </TouchableOpacity>
        <Text className="text-base font-bold text-slate-800">قائمة الأصناف</Text>
        <TouchableOpacity onPress={() => router.push('/add-product')}>
          <Feather name="plus" size={22} color="#059669" />
        </TouchableOpacity>
      </View>

      <!-- أزرار الإجراءات السريعة (إضافة صنف + زر أكسل) -->
      <View className="p-4 flex-row gap-3">
        <TouchableOpacity
          onPress={() => router.push('/add-product')}
          className="flex-1 bg-emerald-600 p-3 rounded-xl flex-row items-center justify-center gap-2 shadow-sm"
        >
          <Feather name="plus-circle" size={18} color="white" />
          <Text className="text-white font-bold text-xs">صنف جديد</Text>
        </TouchableOpacity>

        <!-- زر استيراد الأصناف من أكسل -->
        <TouchableOpacity
          onPress={handleExcelImport}
          className="flex-1 bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex-row items-center justify-center gap-2 shadow-sm"
        >
          <MaterialCommunityIcons name="file-excel" size={20} color="#059669" />
          <Text className="text-emerald-700 font-bold text-xs">استيراد من Excel</Text>
        </TouchableOpacity>
      </View>

      <!-- قائمة الأصناف التجريبية -->
      <ScrollView className="flex-1 px-4 space-y-2">
        <View className="bg-white p-3.5 rounded-2xl border border-slate-200 flex-row items-center justify-between mb-2">
          <Text className="text-sm font-black text-emerald-600">260.00 ريال</Text>
          <View className="items-end">
            <Text className="text-xs font-bold text-slate-800">طقم قدور جرانيت تركية</Text>
            <Text className="text-[10px] text-slate-500">القسم: أدوات منزلية | الباركود: 1001</Text>
          </View>
        </View>

        <View className="bg-white p-3.5 rounded-2xl border border-slate-200 flex-row items-center justify-between mb-2">
          <Text className="text-sm font-black text-emerald-600">320.00 ريال</Text>
          <View className="items-end">
            <Text className="text-xs font-bold text-slate-800">قلاية هوائية فيليبس 4.1 لتر</Text>
            <Text className="text-[10px] text-slate-500">القسم: إلكترونيات | الباركود: 1002</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
