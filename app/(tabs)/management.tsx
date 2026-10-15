import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ManagementScreen() {
  const router = useRouter();

  const managementItems = [
    {
      title: 'إدارة الأصناف والمنتجات',
      subtitle: 'عرض الأصناف، التعديل، واستيراد أكسل',
      icon: 'cube-outline',
      color: '#19B7A5',
      route: '/items',
    },
    {
      title: 'إدارة الأقسام (الفئات)',
      subtitle: 'تصنيف وترتيب أقسام المتجر',
      icon: 'folder-outline',
      color: '#F28D54',
      route: '/add-category',
    },
    {
      title: 'إدارة وحدات القياس',
      subtitle: 'حبة، كرتون، طقم، درزن، كجم',
      icon: 'layers-outline',
      color: '#3B82F6',
      route: '/units',
    },
    {
      title: 'إعدادات النظام والربط',
      subtitle: 'إعدادات المتجر والطابعة والنسخ الاحتياطي',
      icon: 'settings-outline',
      color: '#64748B',
      route: '/settings',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>لوحة الإدارة والتهيئة</Text>
        <Text style={styles.headerSubtitle}>إدارة بيانات النظام والأصناف والإعدادات</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {managementItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => router.push(item.route as any)}
          >
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            </View>
            <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
              <Ionicons name={item.icon as any} size={24} color={item.color} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA' },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E9EDF2',
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B', textAlign: 'right' },
  headerSubtitle: { fontSize: 12, color: '#64748B', textAlign: 'right', marginTop: 2 },
  content: { padding: 16 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E9EDF2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardInfo: { flex: 1, alignItems: 'flex-end', marginRight: 12 },
  cardTitle: { fontSize: 14, fontWeight: '700', color: '#1E293B' },
  cardSubtitle: { fontSize: 11, color: '#64748B', marginTop: 2 },
  iconContainer: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
});
