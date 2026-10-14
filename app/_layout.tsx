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
        <CartProvider>
          {/* 👇 الخلفية الرمادية حول التطبيق على الويب */}
          <GestureHandlerRootView style={[styles.root, Platform.OS === 'web' && styles.webRoot]}>
            <trpc.Provider client={trpcClient} queryClient={queryClient}>
              <QueryClientProvider client={queryClient}>
                {/* 👇 إطار الهاتف الوهمي على الويب */}
                <View style={Platform.OS === 'web' ? styles.webContainer : styles.nativeContainer}>
                  <Stack screenOptions={{ headerShown: false }} />
                  <StatusBar style="dark" />
                </View>
              </QueryClientProvider>
            </trpc.Provider>
          </GestureHandlerRootView>
        </CartProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  webRoot: {
    // خلفية رمادية فاتحة تظهر حول التطبيق على الكمبيوتر
    backgroundColor: "#E5E7EB", 
    alignItems: "center",
    justifyContent: "center",
  },
  nativeContainer: {
    flex: 1,
  },
  webContainer: {
    // إطار الهاتف الوهمي
    flex: 1,
    width: "100%",
    maxWidth: 480, // عرض شاشة هاتف تقريبي
    backgroundColor: "#F7F8FA",
    // إضافة ظل خفيف لتمييز التطبيق عن الخلفية
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 5,
  },
});
