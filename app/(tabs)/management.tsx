import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ManagementScreen() {
  const router = useRouter();

  const menuItems = [
    {
      title: 'شاشة الأصناف والمنتجات',
      subtitle: 'عرض الأصناف، التعديل، واستيراد أكسل',
      icon: 'package',
      color: 'bg-emerald-50 text-emerald-600',
      route: '/items',
    },
    {
      title: 'شاشة الأقسام (الفئات)',
      subtitle: 'إدارة وتصنيف أقسام المتجر',
      icon: 'folder',
      color: 'bg-amber-50 text-amber-600',
      route: '/add-category',
    },
    {
      title: 'شاشة وحدات القياس',
      subtitle: 'حبة، كرتون، درزن، طقم، كجم',
      icon: 'layers',
      color: 'bg-blue-50 text-blue-600',
      route: '/units',
    },
    {
      title: 'إعدادات النظام',
      subtitle: 'إعدادات المتجر، الطابعة، والنسخ الاحتياطي',
      icon: 'settings',
      color: 'bg-slate-100 text-slate-700',
      route: '/settings',
    },
  ];

  return (
    <View className="flex-1 bg-slate-100">
      <!-- Header -->
      <View className="bg-white px-5 py-4 border-b border-slate-200 pt-12">
        <Text className="text-lg font-bold text-slate-800 text-right">لوحة الإدارة والتهيئة</Text>
        <Text className="text-xs text-slate-500 text-right mt-0.5">إدارة بيانات النظام والأصناف والإعدادات</Text>
      </View>

      <ScrollView className="flex-1 p-4 space-y-3">
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => router.push(item.route as any)}
            className="bg-white p-4 rounded-2xl border border-slate-200 flex-row items-center justify-between mb-3 shadow-sm"
          >
            <Feather name="chevron-left" size={20} color="#94a3b8" />
            <View className="flex-row items-center gap-3">
              <View className="items-end">
                <Text className="text-sm font-bold text-slate-800">{item.title}</Text>
                <Text className="text-[11px] text-slate-500 mt-0.5">{item.subtitle}</Text>
              </View>
              <View className={`w-11 h-11 rounded-xl items-center justify-center ${item.color.split(' ')[0]}`}>
                <Feather name={item.icon as any} size={22} className={item.color.split(' ')[1]} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
