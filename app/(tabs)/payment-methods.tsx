import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PaymentMethodsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Methods</Text>
      <Text style={styles.info}>Add or manage your payment methods here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FA' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FF6B35', marginBottom: 12 },
  info: { fontSize: 16, color: '#666' },
});
