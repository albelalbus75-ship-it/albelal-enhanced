import "@/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { Platform, I18nManager } from "react-native";
import "@/lib/_core/nativewind-pressable";
import { ThemeProvider } from "@/lib/theme-provider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { trpc, createTRPCClient } from "@/lib/trpc";
import { initManusRuntime } from "@/lib/_core/manus-runtime";
// 👇 استيراد مزود السلة
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
        {/* 👇 تغليف التطبيق بـ CartProvider */}
        <CartProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <trpc.Provider client={trpcClient} queryClient={queryClient}>
              <QueryClientProvider client={queryClient}>
                <Stack screenOptions={{ headerShown: false }} />
                <StatusBar style="dark" />
              </QueryClientProvider>
            </trpc.Provider>
          </GestureHandlerRootView>
        </CartProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
