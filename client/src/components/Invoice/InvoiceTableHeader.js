import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#6b6b69';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: '#6b6b69',
    backgroundColor: '#bff0fd',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 24,
    textAlign: 'center',
    fontStyle: 'bold',
    flexGrow: 1,
  },
  description: {
    width: '60%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  qty: {
    width: '10%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  rate: {
    width: '15%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  amount: {
    width: '15%',
  },
});

const InvoiceTableHeader = () => (
  <View style={styles.container}>
    <Text style={styles.description}>Description </Text>
    <Text style={styles.qty}>Quantier</Text>
    <Text style={styles.rate}>prix</Text>
    <Text style={styles.amount}>Montant</Text>
  </View>
);

export default InvoiceTableHeader;
