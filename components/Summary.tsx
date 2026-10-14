import { View, Text, StyleSheet } from "react-native";
import { money } from "../constants/mockData";

export function Summary({ subtotal, vat, total }: { subtotal: number; vat: number; total: number }) {
  return (
    <View style={styles.summary}>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>المجموع قبل الضريبة</Text>
        <Text style={styles.summaryValue}>{money(subtotal)}</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>خصم إضافي</Text>
        <Text style={styles.summaryMuted}>0.00 ريال</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>ضريبة القيمة المضافة (15%)</Text>
        <Text style={styles.summaryValue}>{money(vat)}</Text>
      </View>
      <View style={[styles.summaryRow, styles.totalRow]}>
        <Text style={styles.totalLabel}>المبلغ المطلوب</Text>
        <Text style={styles.totalValue}>{money(total)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  summary: { margin: 18, padding: 15, backgroundColor: "#FFFFFF", borderRadius: 17, borderWidth: 1, borderColor: "#EDF0F4" },
  summaryRow: { flexDirection: "row-reverse", justifyContent: "space-between", marginVertical: 5 },
  summaryLabel: { color: "#758195", fontSize: 12 },
  summaryValue: { color: "#132238", fontSize: 12, fontWeight: "800" },
  summaryMuted: { color: "#A7AFBB", fontSize: 12 },
  totalRow: { borderTopWidth: 1, borderTopColor: "#EDF0F4", paddingTop: 12, marginTop: 9 },
  totalLabel: { color: "#132238", fontSize: 14, fontWeight: "900" },
  totalValue: { color: "#0D9D8E", fontSize: 18, fontWeight: "900" },
});
