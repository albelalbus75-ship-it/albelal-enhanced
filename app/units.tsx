import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function UnitsScreen() {
  const router = useRouter();
  const [units, setUnits] = useState([
    { id: '1', name: 'حبة / قطعة', symbol: 'PCS' },
    { id: '2', name: 'كرتون', symbol: 'BOX' },
    { id: '3', name: 'طقم', symbol: 'SET' },
    { id: '4', name: 'درزن (12 حبة)', symbol: 'DOZ' },
    { id: '5', name: 'كيلوجرام', symbol: 'KG' },
  ]);

  const handleAddUnit = () => {
    Alert.prompt(
      'إضافة وحدة قياس جديدة',
      'أدخل اسم وحدة القياس الجديدة (مثال: متر، لتر، ربطة):',
      [
        { text: 'إلغاء', style: 'cancel' },
        {
          text: 'إضافة',
          onPress: (text) => {
            if (text) {
              setUnits([...units, { id: Date.now().toString(), name: text, symbol: 'NEW' }]);
            }
          },
        },
      ],
      'plain-text'
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-forward" size={22} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>إدارة وحدات القياس</Text>
        <TouchableOpacity onPress={handleAddUnit}>
          <Ionicons name="add" size={24} color="#19B7A5" />
        </TouchableOpacity>
      </View>

      {/* زر إضافة وحدة جديدة */}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.primaryBtn} onPress={handleAddUnit}>
          <Ionicons name="add-circle-outline" size={18} color="#FFFFFF" />
          <Text style={styles.primaryBtnText}>إضافة وحدة قياس جديدة</Text>
        </TouchableOpacity>
      </View>

      {/* قائمة الوحدات */}
      <ScrollView contentContainerStyle={styles.listContainer}>
        {units.map((unit) => (
          <View key={unit.id} style={styles.unitCard}>
            <View style={styles.unitBadge}>
              <Text style={styles.unitBadgeText}>{unit.symbol}</Text>
            </View>
            <View style={styles.unitInfo}>
              <Text style={styles.unitName}>{unit.name}</Text>
              <Text style={styles.unitStatus}>مفعلة في النظام</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA' },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E9EDF2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { fontSize: 16, fontWeight: '800', color: '#1E293B' },
  actionsRow: { padding: 16 },
  primaryBtn: {
    backgroundColor: '#19B7A5',
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  primaryBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  listContainer: { paddingHorizontal: 16 },
  unitCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E9EDF2',
  },
  unitInfo: { alignItems: 'flex-end', flex: 1, marginRight: 12 },
  unitName: { fontSize: 14, fontWeight: '700', color: '#1E293B' },
  unitStatus: { fontSize: 10, color: '#19B7A5', marginTop: 2, fontWeight: '600' },
  unitBadge: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  unitBadgeText: { fontSize: 11, fontWeight: '800', color: '#16A34A' },
});
