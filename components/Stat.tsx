import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

export function Stat({ title, value, icon, tone }: { title: string; value: string; icon: keyof typeof Ionicons.glyphMap; tone: "teal" | "blue" | "orange" | "purple" }) {
  const colors = { teal: ["#E7F5F2", "#19B7A5"], blue: ["#EAF0FF", "#5A78D6"], orange: ["#FFF0E5", "#D99542"], purple: ["#F1EAFE", "#9A78D0"] } as const;
  return (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: colors[tone][0] }]}><Ionicons name={icon} size={20} color={colors[tone][1]} /></View>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  statCard: { width: "48.2%", backgroundColor: "#FFFFFF", borderRadius: 17, padding: 13, minHeight: 115, borderWidth: 1, borderColor: "#EDF0F4" },
  statIcon: { width: 33, height: 33, borderRadius: 11, alignItems: "center", justifyContent: "center", marginBottom: 10 },
  statTitle: { color: "#8994A5", fontSize: 11, textAlign: "right" },
  statValue: { color: "#132238", fontSize: 17, fontWeight: "900", textAlign: "right", marginTop: 6 },
});
