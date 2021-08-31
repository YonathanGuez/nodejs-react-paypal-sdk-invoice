import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  invoiceNBContainer: {
    flexDirection: 'row',
    marginTop: 36,
    justifyContent: 'flex-end',
  },
  invoiceDateContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  invoiceDate: {
    fontSize: 12,
    fontStyle: 'bold',
  },
  label: {
    width: 130,
  },
});

const InvoiceNBandDate = ({ invoice }) => (
  <Fragment>
    <View style={styles.invoiceNBContainer}>
      <Text style={styles.label}>Numéro de transaction:</Text>
      <Text style={styles.invoiceDate}>{invoice.invoice_no}</Text>
    </View>
    <View style={styles.invoiceDateContainer}>
      <Text style={styles.label}>Date: </Text>
      <Text>{invoice.date}</Text>
    </View>
  </Fragment>
);

export default InvoiceNBandDate;
