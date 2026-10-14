import "@/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { Platform, I18nManager, View, StyleSheet } from "react-native";
import "@/lib/_core/nativewind-pressable";
import { ThemeProvider } from "@/lib/theme-provider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { trpc, createTRPCClient } from "@/lib/trpc";
import { initManusRuntime } from "@/lib/_core/manus-runtime";
import { CartProvider } from "../context/CartContext";
import { ProductProvider } from "../context/ProductContext";

export const unstable_settings = { anchor: "(tabs)" };

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1 } } }));
  const [trpcClient] = useState(() => createTRPCClient());

  useEffect(() => {
    initManusRuntime();
    if (Platform.OS !== "web" && !I18nManager.isRTL) I18nManager.allowRTL(true);
  }, []);

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        {/* 👇 المنتجات يجب أن تكون في الخارج لتكون متاحة لجميع الشاشات */}
        <ProductProvider>
          <CartProvider>
            <GestureHandlerRootView style={[styles.root, Platform.OS === 'web' && styles.webRoot]}>
              <trpc.Provider client={trpcClient} queryClient={queryClient}>
                <QueryClientProvider client={queryClient}>
                  <View style={Platform.OS === 'web' ? styles.webContainer : styles.nativeContainer}>
                    <Stack screenOptions={{ headerShown: false }} />
                    <StatusBar style="dark" />
                  </View>
                </QueryClientProvider>
              </trpc.Provider>
            </GestureHandlerRootView>
          </CartProvider>
        </ProductProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  webRoot: { backgroundColor: "#E5E7EB", alignItems: "center", justifyContent: "center" },
  nativeContainer: { flex: 1 },
  webContainer: {
    flex: 1,
    width: "100%",
    maxWidth: 480,
    backgroundColor: "#F7F8FA",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 5,
  },
});
