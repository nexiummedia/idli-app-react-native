import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  Menu,
  User,
  X,
  Home,
  Heart,
  ShoppingBag,
  ShoppingCart,
  LogOut,
} from "lucide-react-native";
import { Slot, router, usePathname } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

export default function TabsLayout() {
  const { user, loading, signOut } = useAuth();
  // const { cart } = useCart();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const pathname = usePathname();
  const activeRoute =
    pathname === "/(tabs)" ||
    pathname === "/(tabs)/index" ||
    pathname === "/(tabs)/home"
      ? "/(tabs)"
      : pathname;
  const isHomeActive =
    pathname === "/(tabs)" ||
    pathname === "/(tabs)/index" ||
    pathname === "/(tabs)/home";

  const handleNavHome = () => {
    setSidebarVisible(false);
    router.replace("/(tabs)");
  };
  const handleNavCart = () => {
    setSidebarVisible(false);
    // router.push("/cart");
  };
  const handleNavWishlist = () => {
    setSidebarVisible(false);
    // router.push("/wishlist");
  };
  const handleNavProfile = () => {
    // router.push("/profile");
  };
  const handleNavOrder = () => {
    setSidebarVisible(false);
    // router.push("/order");
  };
  const handleLogout = () => {
    setSidebarVisible(false);
    signOut();
    router.replace("/(auth)/login");
  };

  if (loading || !user) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity
          onPress={() => setSidebarVisible(true)}
          style={styles.navIcon}
        >
          <Menu size={28} color="#FF6B35" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Idli App</Text>
        <View style={styles.navRight}>
          <TouchableOpacity
            onPress={() => router.push("/cart")}
            style={styles.navIcon}
          >
            <ShoppingCart size={26} color="#FF6B35" />
            {/* {cart?.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cart.length}</Text>
              </View>
            )} */}
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNavProfile} style={styles.navIcon}>
            <User size={28} color="#FF6B35" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Sidebar Overlay */}
      {sidebarVisible && (
        <View style={styles.sidebarOverlay}>
          <TouchableOpacity
            style={styles.sidebarBackdrop}
            onPress={() => setSidebarVisible(false)}
          />
          <View style={styles.sidebar}>
            {/* Avatar and Name */}
            <View style={styles.sidebarHeader}>
              <View style={styles.avatar}>
                <User size={28} color="#FFF" />
              </View>
              <Text style={styles.userName}>{user?.name}</Text>
              <TouchableOpacity
                onPress={() => setSidebarVisible(false)}
                style={styles.closeBtn}
              >
                <X size={22} color="#FF6B35" />
              </TouchableOpacity>
            </View>
            {/* Links */}
            <View style={styles.sidebarLinks}>
              <TouchableOpacity
                style={[
                  styles.sidebarLink,
                  isHomeActive && styles.sidebarLinkActive,
                ]}
                onPress={handleNavHome}
              >
                <Home
                  size={20}
                  color={isHomeActive ? "#FFF" : "#FF6B35"}
                  style={styles.sidebarIcon}
                />
                <Text
                  style={[
                    styles.sidebarLinkText,
                    isHomeActive && styles.sidebarLinkTextActive,
                  ]}
                >
                  Home
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sidebarLink,
                  activeRoute === "/cart" && styles.sidebarLinkActive,
                ]}
                onPress={handleNavCart}
              >
                <ShoppingCart
                  size={20}
                  color={activeRoute === "/cart" ? "#FFF" : "#FF6B35"}
                  style={styles.sidebarIcon}
                />
                <Text
                  style={[
                    styles.sidebarLinkText,
                    activeRoute === "/cart" && styles.sidebarLinkTextActive,
                  ]}
                >
                  Cart
                </Text>
                {/* {cart?.length > 0 && (
                  <View style={styles.sidebarCartBadge}>
                    <Text style={styles.sidebarCartBadgeText}>
                      {cart.length}
                    </Text>
                  </View>
                )} */}
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sidebarLink,
                  activeRoute === "/wishlist" && styles.sidebarLinkActive,
                ]}
                onPress={handleNavWishlist}
              >
                <Heart
                  size={20}
                  color={activeRoute === "/wishlist" ? "#FFF" : "#FF6B35"}
                  style={styles.sidebarIcon}
                />
                <Text
                  style={[
                    styles.sidebarLinkText,
                    activeRoute === "/wishlist" && styles.sidebarLinkTextActive,
                  ]}
                >
                  Wishlist
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sidebarLink,
                  activeRoute === "/order" && styles.sidebarLinkActive,
                ]}
                onPress={handleNavOrder}
              >
                <ShoppingBag
                  size={20}
                  color={activeRoute === "/order" ? "#FFF" : "#FF6B35"}
                  style={styles.sidebarIcon}
                />
                <Text
                  style={[
                    styles.sidebarLinkText,
                    activeRoute === "/order" && styles.sidebarLinkTextActive,
                  ]}
                >
                  Order
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sidebarLink,
                  activeRoute === "/profile" && styles.sidebarLinkActive,
                ]}
                onPress={handleNavProfile}
              >
                <User
                  size={20}
                  color={activeRoute === "/profile" ? "#FFF" : "#FF6B35"}
                  style={styles.sidebarIcon}
                />
                <Text
                  style={[
                    styles.sidebarLinkText,
                    activeRoute === "/profile" && styles.sidebarLinkTextActive,
                  ]}
                >
                  Profile
                </Text>
              </TouchableOpacity>
            </View>
            {/* Logout */}
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <LogOut size={20} color="#FFF" style={styles.sidebarIcon} />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Render route content */}
      <View style={{ flex: 1 }}>
        <Slot />
      </View>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={handleNavHome}>
          <Home size={22} color={isHomeActive ? "#FF6B35" : "#999"} />
          <Text
            style={[styles.tabLabel, isHomeActive && styles.tabLabelActive]}
          >
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={handleNavWishlist}>
          <Heart
            size={22}
            color={pathname === "/wishlist" ? "#FF6B35" : "#999"}
          />
          <Text
            style={[
              styles.tabLabel,
              pathname === "/wishlist" && styles.tabLabelActive,
            ]}
          >
            Wishlist
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={handleNavOrder}>
          <ShoppingBag
            size={22}
            color={pathname === "/order" ? "#FF6B35" : "#999"}
          />
          <Text
            style={[
              styles.tabLabel,
              pathname === "/order" && styles.tabLabelActive,
            ]}
          >
            Order
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={handleNavProfile}>
          <User
            size={22}
            color={pathname === "/profile" ? "#FF6B35" : "#999"}
          />
          <Text
            style={[
              styles.tabLabel,
              pathname === "/profile" && styles.tabLabelActive,
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  navIcon: {
    padding: 4,
    marginLeft: 4,
    marginRight: 4,
  },
  navTitle: {
    fontSize: 18,
    color: "#FF6B35",
    fontWeight: "bold",
  },
  navRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartBadge: {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: "#FF6B35",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  cartBadgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
    paddingHorizontal: 3,
  },
  sidebarOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    flexDirection: "row",
    zIndex: 100,
  },
  sidebarBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  sidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 230,
    backgroundColor: "#FFF",
    paddingVertical: 24,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  sidebarHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 12,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FF6B35",
    alignItems: "center",
    justifyContent: "center",
  },
  userName: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
    flex: 1,
  },
  closeBtn: {
    padding: 4,
  },
  sidebarLinks: {
    flexGrow: 1,
    marginTop: 8,
    marginBottom: 16,
  },
  sidebarLink: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 6,
    backgroundColor: "transparent",
  },
  sidebarLinkActive: {
    backgroundColor: "#FF6B35",
  },
  sidebarIcon: {
    marginRight: 12,
  },
  sidebarLinkText: {
    fontSize: 15,
    color: "#FF6B35",
    letterSpacing: 0.2,
    fontWeight: "500",
  },
  sidebarLinkTextActive: {
    color: "#FFF",
  },
  sidebarCartBadge: {
    marginLeft: 8,
    backgroundColor: "#FFF",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  sidebarCartBadgeText: {
    color: "#FF6B35",
    fontSize: 10,
    fontWeight: "bold",
    paddingHorizontal: 3,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#FF6B35", // changed from #FFF to #FF6B35
    justifyContent: "flex-start",
  },
  logoutText: {
    fontSize: 15,
    color: "#FFF", // changed from #FF6B35 to #FFF
    letterSpacing: 0.2,
    marginLeft: 12,
    fontWeight: "500",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 56,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    zIndex: 99,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  tabLabelActive: {
    color: "#FF6B35",
    fontWeight: "bold",
  },
});
