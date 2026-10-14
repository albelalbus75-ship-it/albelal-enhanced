import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { customers } from "../../constants/mockData";

export default function AccountsScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.screenHeading}>
          <View><Text style={styles.screenTitle}>الحسابات</Text><Text style={styles.screenSubtitle}>اختر العميل قبل إتمام البيع الآجل</Text></View>
          <View style={styles.accountCount}><Text style={styles.accountCountText}>4</Text></View>
        </View>

        <View style={styles.accountSummary}>
          <View><Text style={styles.accountSummaryLabel}>إجمالي الديون</Text><Text style={styles.accountSummaryValue}>8,900 ريال</Text></View>
          <Ionicons name="wallet-outline" size={28} color="#FFFFFF" />
        </View>

        {customers.slice(1).map((item) => (
          <View key={item.id} style={styles.accountRow}>
            <View style={styles.avatar}><Text style={styles.avatarText}>{item.name.slice(0, 1)}</Text></View>
            <View style={styles.accountInfo}><Text style={styles.accountName}>{item.name}</Text><Text style={styles.accountDetail}>{item.detail}</Text></View>
            <Ionicons name="chevron-back" size={19} color="#9AA3B1" />
          </View>
        ))}

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>إدارة أوضح للحسابات</Text>
          <Text style={styles.tipBody}>التطبيق يفصل الحسابات عن شاشة البيع حتى لا تتكدس الإجراءات في مسار واحد.</Text>
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
  accountCount: { width: 39, height: 39, borderRadius: 13, backgroundColor: "#E7F5F2", alignItems: "center", justifyContent: "center" },
  accountCountText: { color: "#0D806F", fontWeight: "900" },
  accountSummary: { marginHorizontal: 18, padding: 18, borderRadius: 19, backgroundColor: "#132238", flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between" },
  accountSummaryLabel: { color: "#B7C4D0", fontSize: 12, textAlign: "right" },
  accountSummaryValue: { color: "#FFFFFF", fontSize: 24, fontWeight: "900", marginTop: 6, textAlign: "right" },
  accountRow: { marginHorizontal: 18, marginTop: 9, padding: 13, backgroundColor: "#FFFFFF", borderRadius: 16, flexDirection: "row-reverse", alignItems: "center", gap: 11, borderWidth: 1, borderColor: "#EDF0F4" },
  avatar: { width: 39, height: 39, borderRadius: 14, backgroundColor: "#EAF0FF", alignItems: "center", justifyContent: "center" },
  avatarText: { color: "#5A78D6", fontWeight: "900", fontSize: 16 },
  accountInfo: { flex: 1 },
  accountName: { color: "#132238", fontSize: 12, fontWeight: "800", textAlign: "right" },
  accountDetail: { color: "#8994A5", fontSize: 10, textAlign: "right", marginTop: 4 },
  tipCard: { marginHorizontal: 18, marginTop: 18, padding: 14, backgroundColor: "#FFF8E8", borderRadius: 17 },
  tipTitle: { color: "#80500F", fontSize: 13, fontWeight: "800", textAlign: "right" },
  tipBody: { color: "#9B6A29", fontSize: 12, lineHeight: 19, marginTop: 3, textAlign: "right" },
});
