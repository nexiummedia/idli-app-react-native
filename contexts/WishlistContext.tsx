import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  category: string;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (itemId: number) => void;
  isInWishlist: (itemId: number) => boolean;
  toggleWishlist: (item: WishlistItem) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const STORAGE_KEY = 'idli_app_wishlist';

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  useEffect(() => {
    saveWishlist();
  }, [wishlistItems]);

  const loadWishlist = async () => {
    try {
      const wishlistData = await AsyncStorage.getItem(STORAGE_KEY);
      if (wishlistData) {
        setWishlistItems(JSON.parse(wishlistData));
      }
    } catch (error) {
      console.error('Failed to load wishlist:', error);
    }
  };

  const saveWishlist = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistItems));
    } catch (error) {
      console.error('Failed to save wishlist:', error);
    }
  };

  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems(prevItems => {
      const exists = prevItems.some(wishlistItem => wishlistItem.id === item.id);
      if (!exists) {
        return [...prevItems, item];
      }
      return prevItems;
    });
  };

  const removeFromWishlist = (itemId: number) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const isInWishlist = (itemId: number): boolean => {
    return wishlistItems.some(item => item.id === itemId);
  };

  const toggleWishlist = (item: WishlistItem) => {
    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist(item);
    }
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    clearWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}