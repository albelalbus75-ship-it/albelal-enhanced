import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";

export function BrandMark() {
  return (
    <View style={styles.brandMark}>
      <Ionicons name="receipt-outline" size={21} color="#FFFFFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  brandMark: { width: 40, height: 40, borderRadius: 14, backgroundColor: "#132238", alignItems: "center", justifyContent: "center" },
});
