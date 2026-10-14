import { Ionicons } from "@expo/vector-icons";
import { View, Text, Pressable, StyleSheet } from "react-native";

export function QuickAction({ icon, label, detail, onPress }: { icon: keyof typeof Ionicons.glyphMap; label: string; detail: string; onPress: () => void }) {
  return (
    <Pressable style={styles.quickCard} onPress={onPress}>
      <View style={styles.quickIcon}><Ionicons name={icon} size={21} color="#19B7A5" /></View>
      <Text style={styles.quickLabel}>{label}</Text>
      <Text style={styles.quickDetail}>{detail}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  quickCard: { backgroundColor: "#FFFFFF", borderRadius: 18, padding: 13, width: "48.2%", minHeight: 105, borderWidth: 1, borderColor: "#EDF0F4" },
  quickIcon: { width: 35, height: 35, borderRadius: 12, backgroundColor: "#E7F5F2", alignItems: "center", justifyContent: "center", marginBottom: 8 },
  quickLabel: { color: "#132238", fontWeight: "800", fontSize: 14, textAlign: "right" },
  quickDetail: { color: "#8994A5", fontSize: 11, marginTop: 4, textAlign: "right" },
});
