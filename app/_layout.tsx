import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { useFrameworkReady } from "@/hooks/useFrameworkReady";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  useFrameworkReady();

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            {/* <Stack.Screen name="product/[id]" /> */}
            {/* <Stack.Screen name="checkout" /> */}
            {/* <Stack.Screen name="+not-found" /> */}
          </Stack>
          <StatusBar style="auto" />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
