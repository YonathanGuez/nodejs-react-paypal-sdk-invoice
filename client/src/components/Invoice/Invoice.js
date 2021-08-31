import React from 'react';
import { Page, Document, Image, StyleSheet } from '@react-pdf/renderer';
import InvoiceTitle from './InvoiceTitle';
import Company from './Company';
import InvoiceNBandDate from './InvoiceNBandDate';
import InvoiceItemsTable from './InvoiceItemsTable';
import InvoiceThankYouMsg from './InvoiceThankYouMsg';
import logo from '../../../src/logo.png';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: 'column',
  },
  logo: {
    width: 90,
    height: 80,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

const Invoice = ({ invoice, Mytitle, MsgThanks }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image style={styles.logo} src={logo} />
      <InvoiceTitle title={Mytitle} />
      <InvoiceNBandDate invoice={invoice} />
      <Company invoice={invoice} />
      <InvoiceItemsTable invoice={invoice} />
      <InvoiceThankYouMsg msgthanks={MsgThanks} />
    </Page>
  </Document>
);

export default Invoice;
