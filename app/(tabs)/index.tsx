import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-slate-100">
      
      {/* Header / الشريط العلوي */}
      <View className="bg-white px-5 py-3.5 border-b border-slate-200/80 flex-row items-center justify-between pt-12 shadow-sm">
        <TouchableOpacity className="w-10 h-10 rounded-xl bg-slate-100 items-center justify-center">
          <Feather name="shopping-cart" size={20} color="#475569" />
        </TouchableOpacity>

        <View className="flex-row items-center gap-2.5">
          <View className="items-end">
            <Text className="text-sm font-bold text-slate-800 leading-tight">مركز الفيصل</Text>
            <Text className="text-[11px] text-slate-500">كاشير المبيعات</Text>
          </View>
          <View className="w-10 h-10 rounded-xl bg-slate-900 items-center justify-center shadow-sm">
            <MaterialCommunityIcons name="store" size={22} color="#d4af37" />
          </View>
        </View>
      </View>

      {/* المحتوى القابل للتمرير */}
      <ScrollView className="flex-1 px-4 pt-4 pb-24" showsVerticalScrollIndicator={false}>
        
        {/* البانر الرئيسي الترحيبي */}
        <View className="bg-slate-900 rounded-2xl p-5 text-white shadow-lg mb-5 border border-slate-800">
          <Text className="text-slate-400 text-[11px] font-semibold mb-2">
            ورديّة اليوم • الأربعاء 14 أكتوبر
          </Text>
          <Text className="text-xl font-extrabold text-white leading-snug">
            خَلّ البيع أسرع،{'\n'}
            <Text className="text-emerald-500">والحساب أوضح.</Text>
          </Text>
          <Text className="text-xs text-slate-300 mt-2 leading-relaxed">
            كل ما تحتاجه لإتمام عملية بيع مرتبة من شاشة واحدة.
          </Text>
          
          <TouchableOpacity 
            onPress={() => router.push('/add-product')}
            className="mt-4 bg-emerald-600 self-start px-4 py-2 rounded-xl flex-row items-center gap-2 shadow-md"
          >
            <Text className="text-white text-xs font-bold">ابدأ بيعاً جديداً</Text>
            <Feather name="arrow-left" size={16} color="white" />
          </TouchableOpacity>
        </View>

        {/* أقسام المتجر (الفئات الرئيسية) */}
        <View className="mb-8">
          <View className="flex-row items-center justify-between mb-3 px-1">
            <Text className="text-base font-bold text-slate-800">أقسام المتجر (الفئات)</Text>
            <TouchableOpacity onPress={() => router.push('/add-category')}>
              <Text className="text-xs text-emerald-600 font-bold">إدارة الأقسام</Text>
            </TouchableOpacity>
          </View>

          {/* شبكة الأقسام */}
          <View className="flex-row flex-wrap justify-between gap-3">
            
            {/* قسم 1 */}
            <View className="w-[48%] bg-white border-2 border-amber-200 rounded-2xl p-3 items-center text-center shadow-sm mb-2">
              <View className="w-full h-32 bg-slate-50 rounded-xl overflow-hidden mb-3 items-center justify-center p-2">
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=300&q=80' }} 
                  className="w-full h-full resizeMode-contain" 
                  resizeMode="contain"
                />
              </View>
              <Text className="text-xs font-bold text-slate-800 mb-1 text-center">الأدوات والتراثيات</Text>
              <Text className="text-[10px] text-slate-500 mb-3 text-center">دِلال وأواني ضيافة</Text>
              <TouchableOpacity className="w-full border border-amber-400 py-1.5 rounded-xl items-center bg-amber-50/50">
                <Text className="text-[11px] font-bold text-slate-800">استكشف القسم</Text>
              </TouchableOpacity>
            </View>

            {/* قسم 2 */}
            <View className="w-[48%] bg-white border-2 border-amber-200 rounded-2xl p-3 items-center text-center shadow-sm mb-2">
              <View className="w-full h-32 bg-slate-50 rounded-xl overflow-hidden mb-3 items-center justify-center p-2">
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1517668808822-9eaa03afd2af?auto=format&fit=crop&w=300&q=80' }} 
                  className="w-full h-full" 
                  resizeMode="contain"
                />
              </View>
              <Text className="text-xs font-bold text-slate-800 mb-1 text-center">الأجهزة الحديثة</Text>
              <Text className="text-[10px] text-slate-500 mb-3 text-center">صانعات القهوة والشوايات</Text>
              <TouchableOpacity className="w-full border border-amber-400 py-1.5 rounded-xl items-center bg-amber-50/50">
                <Text className="text-[11px] font-bold text-slate-800">استكشف القسم</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>

      </ScrollView>

    </View>
  );
}
