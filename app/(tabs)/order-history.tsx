import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OrderHistoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order History</Text>
      <Text style={styles.info}>Your past orders will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FA' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FF6B35', marginBottom: 12 },
  info: { fontSize: 16, color: '#666' },
});
