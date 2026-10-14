import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stat } from "../../components/Stat";
import { ReportBar } from "../../components/ReportBar";

export default function ReportsScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.screenHeading}>
          <View><Text style={styles.screenTitle}>التقارير</Text><Text style={styles.screenSubtitle}>نظرة سريعة على أداء اليوم</Text></View>
          <View style={styles.datePill}><Text style={styles.datePillText}>اليوم</Text></View>
        </View>

        <View style={styles.statsGrid}>
          <Stat title="مبيعات اليوم" value="4,860 ريال" icon="trending-up-outline" tone="teal" />
          <Stat title="عدد الفواتير" value="28" icon="receipt-outline" tone="blue" />
          <Stat title="متوسط الفاتورة" value="173.50 ريال" icon="calculator-outline" tone="orange" />
          <Stat title="الأصناف المباعة" value="64" icon="cube-outline" tone="purple" />
        </View>

        <View style={styles.reportCard}>
          <Text style={styles.sectionTitle}>ملخص الحركة</Text>
          <ReportBar label="أدوات منزلية" value="2,140 ريال" width="82%" color="#19B7A5" />
          <ReportBar label="إلكترونيات" value="1,420 ريال" width="64%" color="#5A78D6" />
          <ReportBar label="هدايا" value="860 ريال" width="40%" color="#D99542" />
          <ReportBar label="مفروشات" value="440 ريال" width="24%" color="#9A78D0" />
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>بيانات تجريبية</Text>
          <Text style={styles.tipBody}>الأرقام المعروضة للتوضيح ويمكن ربطها لاحقًا بقاعدة بيانات المبيعات.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F7F8FA" },
  scrollContent: { paddingBottom: 112 },
  screenHeading: { paddingHorizontal: 18, paddingTop: 22, paddingBottom: 12, flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between" },
  screenTitle: { color: "#132238", fontSize: 25, fontWeight: "900", textAlign: "right" },
  screenSubtitle: { color: "#8290A3", fontSize: 12, marginTop: 5, textAlign: "right" },
  datePill: { backgroundColor: "#FFFFFF", borderRadius: 12, paddingHorizontal: 13, paddingVertical: 9, borderWidth: 1, borderColor: "#E7EBF0" },
  datePillText: { color: "#0D806F", fontSize: 12, fontWeight: "800" },
  statsGrid: { flexDirection: "row-reverse", flexWrap: "wrap", paddingHorizontal: 18, gap: 10 },
  reportCard: { margin: 18, padding: 14, borderRadius: 18, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#EDF0F4" },
  sectionTitle: { color: "#132238", fontWeight: "800", fontSize: 17, textAlign: "right", marginBottom: 12 },
  tipCard: { marginHorizontal: 18, padding: 14, backgroundColor: "#FFF8E8", borderRadius: 17 },
  tipTitle: { color: "#80500F", fontSize: 13, fontWeight: "800", textAlign: "right" },
  tipBody: { color: "#9B6A29", fontSize: 12, lineHeight: 19, marginTop: 3, textAlign: "right" },
});
