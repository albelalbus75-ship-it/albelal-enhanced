import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import { useCart } from "../../context/CartContext"; // 👈 استبدال zustand بـ Context API

export default function TabLayout() {
  // 👈 استخدام useCart بدلاً من useCartStore
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#19B7A5",
        tabBarInactiveTintColor: "#8691A3",
        tabBarStyle: styles.bottomNav,
        tabBarLabelStyle: styles.navLabel,
        // 👈 هذا السطر يمنع ظهور الخلفية القديمة خلف العناصر (المستطيل الأزرق)
        sceneContainerStyle: { backgroundColor: "#F7F8FA" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "الرئيسية",
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="sales"
        options={{
          title: "المبيعات",
          tabBarIcon: ({ color }) => <Ionicons name="pricetags-outline" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "السلة",
          tabBarIcon: ({ color }) => (
            <View>
              <Ionicons name="cart-outline" size={22} color={color} />
              {itemCount > 0 && (
                <View style={styles.navBadge}>
                  <Text style={styles.navBadgeText}>{itemCount}</Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: "التقارير",
          tabBarIcon: ({ color }) => <Ionicons name="bar-chart-outline" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="accounts"
        options={{
          title: "الحسابات",
          tabBarIcon: ({ color }) => <Ionicons name="people-outline" size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    height: 76,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E9EDF2",
    paddingHorizontal: 7,
  },
  navLabel: { fontSize: 10, fontWeight: "700", marginTop: 3 },
  navBadge: {
    position: "absolute",
    top: -4,
    right: -6,
    backgroundColor: "#F28D54",
    borderRadius: 9,
    minWidth: 17,
    height: 17,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  navBadgeText: { color: "#FFFFFF", fontSize: 9, fontWeight: "800" },
});
