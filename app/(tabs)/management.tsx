import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function ManagementScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>لوحة الإدارة والتهيئة</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.card} onPress={() => router.push('/items')}>
          <Text style={styles.cardText}>إدارة الأصناف والمنتجات</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/add-category')}>
          <Text style={styles.cardText}>إدارة الأقسام (الفئات)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/units')}>
          <Text style={styles.cardText}>إدارة وحدات القياس</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/settings')}>
          <Text style={styles.cardText}>إعدادات النظام</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA' },
  header: { backgroundColor: '#FFFFFF', padding: 20, paddingTop: 50, borderBottomWidth: 1, borderBottomColor: '#E9EDF2' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#1E293B', textAlign: 'right' },
  content: { padding: 16 },
  card: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#E9EDF2' },
  cardText: { fontSize: 14, fontWeight: 'bold', color: '#1E293B', textAlign: 'right' },
});
