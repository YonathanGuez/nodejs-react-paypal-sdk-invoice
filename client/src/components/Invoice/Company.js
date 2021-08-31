import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 36,
  },
  companyStyle: {
    marginTop: 20,
    paddingBottom: 3,
    fontFamily: 'Helvetica-Oblique',
  },
});

const Company = ({ invoice }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.companyStyle}>Recu par :</Text>
    <Text>{invoice.company}</Text>
    <Text>{invoice.address}</Text>
    <Text>{invoice.phone}</Text>
    <Text>{invoice.email}</Text>
  </View>
);

export default Company;
