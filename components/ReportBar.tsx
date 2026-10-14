import { View, Text, StyleSheet } from "react-native";

export function ReportBar({ label, value, width, color }: { label: string; value: string; width: string; color: string }) {
  return (
    <View style={styles.reportBarRow}>
      <View style={styles.reportBarHeader}>
        <Text style={styles.reportBarLabel}>{label}</Text>
        <Text style={styles.reportBarValue}>{value}</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: width as `${number}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  reportBarRow: { marginTop: 12 },
  reportBarHeader: { flexDirection: "row-reverse", justifyContent: "space-between", marginBottom: 6 },
  reportBarLabel: { color: "#667388", fontSize: 11 },
  reportBarValue: { color: "#132238", fontSize: 11, fontWeight: "800" },
  track: { height: 8, backgroundColor: "#F0F2F5", borderRadius: 4, overflow: "hidden" },
  fill: { height: 8, borderRadius: 4 },
});
