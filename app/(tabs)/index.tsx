import { useAuth } from "@/contexts/AuthContext";
// import { useCart } from "@/contexts/CartContext";
// import { useWishlist } from "@/contexts/WishlistContext";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Heart, Plus, Star } from "lucide-react-native";
import React, { useEffect } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const banners = [
  {
    id: 1,
    title: "Special Offer",
    subtitle: "20% off on all idli combos",
    image:
      "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800",
    color: "#FF6B35",
  },
  {
    id: 2,
    title: "Fresh & Hot",
    subtitle: "Steaming hot idlis delivered",
    image:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
    color: "#4CAF50",
  },
];

const idliVarieties = [
  {
    id: 1,
    name: "Classic Idli",
    description: "Soft and fluffy traditional steamed idli",
    price: 40,
    image:
      "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.5,
    category: "Traditional",
  },
  {
    id: 2,
    name: "Rava Idli",
    description: "Crispy semolina idli with vegetables",
    price: 50,
    image:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.3,
    category: "Special",
  },
  {
    id: 3,
    name: "Oats Idli",
    description: "Healthy oats idli with herbs",
    price: 60,
    image:
      "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.4,
    category: "Healthy",
  },
  {
    id: 4,
    name: "Mini Idli",
    description: "Bite-sized idlis perfect for snacking",
    price: 45,
    image:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.6,
    category: "Special",
  },
  {
    id: 5,
    name: "Ghee Roast Idli",
    description: "Idli roasted in pure ghee with spices",
    price: 70,
    image:
      "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.7,
    category: "Premium",
  },
  {
    id: 6,
    name: "Button Idli",
    description: "Small round idlis with sambar",
    price: 55,
    image:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.2,
    category: "Traditional",
  },
];

export default function HomeScreen() {
  // const { addToCart } = useCart();
  // const { isInWishlist, toggleWishlist } = useWishlist();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/(auth)/login");
    }
  }, [user, loading]);

  // const handleAddToCart = (item: any) => {
  //   addToCart(item);
  // };

  // const handleProductPress = (id: number) => {
  //   router.push(`/product/${id}`);
  // };

  // Show loading state while authentication is being checked
  if (loading) {
    return null;
  }

  if (!user) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, {user.name}!</Text>
            <Text style={styles.subtitle}>
              What would you like to order today?
            </Text>
          </View>
        </View>

        {/* Banners */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.bannersContainer}
          contentContainerStyle={styles.bannersContent}
        >
          {banners.map((banner) => (
            <TouchableOpacity key={banner.id} style={styles.banner}>
              <LinearGradient
                colors={[banner.color, `${banner.color}CC`]}
                style={styles.bannerGradient}
              >
                <View style={styles.bannerContent}>
                  <Text style={styles.bannerTitle}>{banner.title}</Text>
                  <Text style={styles.bannerSubtitle}>{banner.subtitle}</Text>
                </View>
                <Image
                  source={{ uri: banner.image }}
                  style={styles.bannerImage}
                />
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Menu Section */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Our Special Idlis</Text>
          <View style={styles.menuGrid}>
            {idliVarieties.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                // onPress={() => handleProductPress(item.id)}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.menuItemImage}
                />
                <TouchableOpacity
                  style={styles.wishlistButton}
                  // onPress={() => toggleWishlist(item)}
                >
                  <Heart
                    size={16}
                    // color={isInWishlist(item.id) ? "#FF6B35" : "#999"}
                    // fill={isInWishlist(item.id) ? "#FF6B35" : "transparent"}
                  />
                </TouchableOpacity>
                <View style={styles.menuItemContent}>
                  <Text style={styles.menuItemName}>{item.name}</Text>
                  <Text style={styles.menuItemDescription}>
                    {item.description}
                  </Text>
                  <View style={styles.menuItemFooter}>
                    <View style={styles.ratingContainer}>
                      <Star size={12} color="#FFD700" fill="#FFD700" />
                      <Text style={styles.rating}>{item.rating}</Text>
                    </View>
                    <View style={styles.priceContainer}>
                      <Text style={styles.price}>₹{item.price}</Text>
                      <TouchableOpacity
                        style={styles.addButton}
                        // onPress={() => handleAddToCart(item)}
                      >
                        <Plus size={16} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  bannersContainer: {
    marginBottom: 32,
  },
  bannersContent: {
    paddingLeft: 24,
  },
  banner: {
    width: width * 0.8,
    height: 140,
    marginRight: 16,
    borderRadius: 16,
    overflow: "hidden",
  },
  bannerGradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
  },
  bannerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  menuSection: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  menuItem: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItemImage: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  wishlistButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItemContent: {
    padding: 12,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  menuItemFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6B35",
    marginRight: 8,
  },
  addButton: {
    backgroundColor: "#FF6B35",
    borderRadius: 12,
    padding: 6,
  },
});
