import { Ionicons } from "@expo/vector-icons";
import { View, Text, Pressable, StyleSheet } from "react-native";

export function EmptyState({ icon, title, body, action, onPress }: { icon: keyof typeof Ionicons.glyphMap; title: string; body: string; action: string; onPress: () => void }) {
  return (
    <View style={styles.emptyState}>
      <View style={styles.emptyIcon}><Ionicons name={icon} size={34} color="#19B7A5" /></View>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyBody}>{body}</Text>
      <Pressable style={styles.secondaryButton} onPress={onPress}>
        <Text style={styles.secondaryButtonText}>{action}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyState: { alignItems: "center", backgroundColor: "#FFFFFF", borderRadius: 20, margin: 18, padding: 28, borderWidth: 1, borderColor: "#EDF0F4" },
  emptyIcon: { width: 68, height: 68, borderRadius: 24, backgroundColor: "#E7F5F2", alignItems: "center", justifyContent: "center" },
  emptyTitle: { color: "#132238", fontSize: 17, fontWeight: "900", marginTop: 14 },
  emptyBody: { color: "#8994A5", fontSize: 13, textAlign: "center", lineHeight: 20, marginTop: 7, maxWidth: 250 },
  secondaryButton: { marginTop: 17, borderRadius: 12, backgroundColor: "#E7F5F2", paddingHorizontal: 17, paddingVertical: 11, minHeight: 42, justifyContent: "center" },
  secondaryButtonText: { color: "#0D806F", fontWeight: "800", fontSize: 12 },
});
