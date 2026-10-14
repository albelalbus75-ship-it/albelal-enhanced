import { View, Text, Pressable, StyleSheet } from "react-native";

export function SectionTitle({ title, action, onPress }: { title: string; action?: string; onPress?: () => void }) {
  return (
    <View style={styles.sectionTitleRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action && <Pressable onPress={onPress} hitSlop={8}><Text style={styles.textAction}>{action}</Text></Pressable>}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitleRow: { flexDirection: "row-reverse", justifyContent: "space-between", alignItems: "center", marginTop: 24, marginBottom: 12 },
  sectionTitle: { color: "#132238", fontWeight: "800", fontSize: 17, textAlign: "right" },
  textAction: { color: "#0D9D8E", fontSize: 12, fontWeight: "700" },
});
