import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [autoPrint, setAutoPrint] = useState(true);

  const handleBackup = () => {
    Alert.alert('النسخ الاحتياطي', 'تم إنشاء نسخة احتياطية لقاعدة البيانات بنجاح.');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-forward" size={22} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>إعدادات النظام</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* قسم إعدادات الطباعة */}
        <Text style={styles.sectionTitle}>إعدادات الفواتير والطباعة</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <Switch
              value={autoPrint}
              onValueChange={setAutoPrint}
              trackColor={{ false: '#CBD5E1', true: '#19B7A5' }}
            />
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>الطباعة التلقائية للفاتورة</Text>
              <Text style={styles.settingSubtitle}>طباعة الإيصال فور إتمام عملية البيع</Text>
            </View>
          </View>
        </View>

        {/* قسم المظهر والتفضيلات */}
        <Text style={styles.sectionTitle}>المظهر والتفضيلات</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              trackColor={{ false: '#CBD5E1', true: '#19B7A5' }}
            />
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>الوضع الداكن (Dark Mode)</Text>
              <Text style={styles.settingSubtitle}>مناسب للعمل المسائي وتوفير البطارية</Text>
            </View>
          </View>
        </View>

        {/* قسم البيانات والنسخ الاحتياطي */}
        <Text style={styles.sectionTitle}>البيانات والنسخ الاحتياطي</Text>
        <TouchableOpacity style={styles.actionCard} onPress={handleBackup}>
          <Ionicons name="cloud-upload-outline" size={20} color="#19B7A5" />
          <Text style={styles.actionCardText}>إنشاء نسخة احتياطية الآن</Text>
        </TouchableOpacity>

        {/* معلومات النظام */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>مركز الفيصل - كاشير المبيعات</Text>
          <Text style={styles.infoSubText}>الإصدار 1.0.0 (جاهز لتحويل الأندرويد)</Text>
        </View>

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
  content: { padding: 16 },
  sectionTitle: { fontSize: 12, fontWeight: '700', color: '#64748B', textAlign: 'right', marginBottom: 8, marginTop: 12 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E9EDF2',
    marginBottom: 8,
  },
  settingRow: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' },
  settingText: { alignItems: 'flex-end', flex: 1, marginRight: 12 },
  settingTitle: { fontSize: 13, fontWeight: '700', color: '#1E293B' },
  settingSubtitle: { fontSize: 10, color: '#64748B', marginTop: 2 },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#19B7A5',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4,
  },
  actionCardText: { color: '#19B7A5', fontSize: 13, fontWeight: '700' },
  infoBox: { alignItems: 'center', marginTop: 30, paddingBottom: 20 },
  infoText: { fontSize: 12, fontWeight: '700', color: '#64748B' },
  infoSubText: { fontSize: 10, color: '#94A3B8', marginTop: 2 },
});
