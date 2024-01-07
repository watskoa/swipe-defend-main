import React, { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

import logo from '../../../../../src/assets/logo.png';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    description: {
        marginBottom: 20,
    },
    table: {
        display: 'table',
        width: 'auto',
        marginVertical: 10,
    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row',
    },
    tableCell: {
        borderWidth: 1,
        borderColor: '#000000',
        padding: 8,
    },
});

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const tableRef = useRef(null);

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        },
    });

    const paymentsInUTC = payments.map((payment) => ({
        ...payment,
        date: new Date(payment.date).toUTCString(),
    }));

    const renderTable = () => (
        <table className="table table-zebra">
            {/* head */}
            <thead>
                <tr>
                    <th>#</th>
                    <th>Price</th>
                    <th>Date</th>
                    <th>Transaction Id</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {paymentsInUTC.map((payment, index) => (
                    <tr key={payment._id}>
                        <th>{index + 1}</th>
                        <td>${payment.price}</td>
                        <td>{payment.date}</td>
                        <td>{`${payment.transactionId.substring(0, 7)}****${payment.transactionId.substring(payment.transactionId.length - 7)}`}</td>
                        <td>{payment.status === 'success' ? <p className='bg-green-400 text-center p-2 rounded-xl text-white'> Paid </p> : <p className='bg-red-400 text-center p-2 rounded-xl text-white'> Rejected </p>}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const renderPDF = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <Image src={logo} style={styles.logo} />
                <Text style={styles.description}>Payment History</Text>
                <View style={styles.table} ref={tableRef}>
                    {renderTable()}
                </View>

            </Page>
        </Document>
    );

    return (
        <div>
            <div>
                <div className="flex justify-end">
                    <PDFDownloadLink document={renderPDF()} fileName="payment_history.pdf">
                        {({ blob, url, loading, error }) =>
                            loading ? 'Loading document...' : 'Download PDF'
                        }
                    </PDFDownloadLink>
                </div>
                <div className="">
                    <div className="overflow-x-auto" ref={tableRef}>
                        {renderTable()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;