import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  CreditCard, 
  ShoppingBag, 
  Settings, 
  LogOut,
  ChevronRight 
} from 'lucide-react-native';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive', 
          onPress: async () => {
            await signOut();
            router.replace('/(auth)/login');
          } 
        },
      ]
    );
  };

  const menuItems = [
    {
      id: 1,
      title: 'Order History',
      icon: ShoppingBag,
      onPress: () => router.push('/order-history'),
    },
    {
      id: 2,
      title: 'Addresses',
      icon: MapPin,
      onPress: () => router.push('/addresses'),
    },
    {
      id: 3,
      title: 'Payment Methods',
      icon: CreditCard,
      onPress: () => router.push('/payment-methods'),
    },
    {
      id: 4,
      title: 'Settings',
      icon: Settings,
      onPress: () => router.push('/settings'),
    },
  ];

  if (!user) {
    router.replace('/(auth)/login');
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileImageContainer}>
            <User size={40} color="#FF6B35" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <View style={styles.contactInfo}>
              <View style={styles.contactItem}>
                <Mail size={16} color="#666" />
                <Text style={styles.contactText}>{user.email}</Text>
              </View>
              {user.phone && (
                <View style={styles.contactItem}>
                  <Phone size={16} color="#666" />
                  <Text style={styles.contactText}>{user.phone}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={item.onPress}
              >
                <View style={styles.menuItemLeft}>
                  <View style={styles.menuItemIcon}>
                    <IconComponent size={20} color="#FF6B35" />
                  </View>
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                </View>
                <ChevronRight size={20} color="#999" />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <LogOut size={20} color="#FF4444" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>Idli Express v1.0.0</Text>
          <Text style={styles.appInfoText}>Made with ❤️ for idli lovers</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileCard: {
    backgroundColor: 'white',
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF5F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  contactInfo: {
    gap: 4,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#666',
  },
  menuSection: {
    backgroundColor: 'white',
    marginHorizontal: 24,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF5F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: 24,
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 32,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  signOutText: {
    fontSize: 16,
    color: '#FF4444',
    fontWeight: '600',
  },
  appInfo: {
    alignItems: 'center',
    paddingBottom: 32,
    gap: 4,
  },
  appInfoText: {
    fontSize: 12,
    color: '#999',
  },
});