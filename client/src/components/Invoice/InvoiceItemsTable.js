import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';
import InvoiceTableHeader from './InvoiceTableHeader';
import InvoiceTableRow from './InvoiceTableRow';
import InvoiceTableBlankSpace from './InvoiceTableBlankSpace';
import InvoiceTableFooter from './InvoiceTableFooter';

const tableRowsCount = 2;

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#6b6b69',
  },
});

const InvoiceItemsTable = ({ invoice }) => (
  <View style={styles.tableContainer}>
    <InvoiceTableHeader />
    <InvoiceTableRow items={invoice.items} />
    <InvoiceTableBlankSpace rowsCount={tableRowsCount} />
    <InvoiceTableFooter items={invoice.items} />
  </View>
);

export default InvoiceItemsTable;
