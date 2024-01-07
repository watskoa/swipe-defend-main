import { useQuery } from '@tanstack/react-query';
import React, { useRef } from 'react';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

import logo from '../../../../../src/assets/logo.png';
import useReportHistory from '../../../../hooks/useReportHistory';

const ScoreHistory = () => {
    const datas = useReportHistory();
    console.log(datas);
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            backgroundColor: '#ffffff',
            padding: 20,
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
        tableHeader: {
            display: 'table-header-group',
            backgroundColor: '#000000',
            color: '#ffffff',
            fontWeight: 'bold',
        },
        tableBody: {
            display: 'table-row-group',
        },
        tableFooter: {
            display: 'table-footer-group',
            backgroundColor: '#000000',
            color: '#ffffff',
            fontWeight: 'bold',
        },
        userInfoColumn: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        userInfoRow: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        userInfoCell: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        userInfoCellImage: {
            width: 100,
            height: 100,
        },
        userInfoCellText: {
            fontSize: 12,
        },

    });

    return (
        <div>
            <h1>Total Credit Score History = {datas.length}</h1>

            <table className='w-full text-center'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Date & Time</th>
                        <th>Report Id</th>
                        <th>Score</th>
                        <th>Download</th>
                    </tr>
                </thead>
                <tbody>
                    {datas.map((data, index) => (
                        <tr key={data._id}>
                            <td>{index + 1}</td>
                            <td>{data.full_name}</td>
                            <td>{data.date}</td>
                            <td>{`${data._id.slice(0, 5)}......${data._id.slice(-5)}`}</td>
                            <td>{data.creditScore}</td>
                            <td className='flex justify-center items-center'>
                                <PDFDownloadLink
                                    document={
                                        <Document>
                                            <Page size="A4">
                                                {/* page titel with image */}
                                                <View>
                                                    <Text>Report</Text>
                                                    <Image
                                                        source={logo}
                                                        style={styles.userInfoCellImage}
                                                    />
                                                </View>
                                            </Page>
                                        </Document>
                                    }
                                    fileName="report.pdf"
                                >
                                    {({ blob, url, loading, error }) =>
                                        loading ? 'Loading...' : 'Download'
                                    }
                                </PDFDownloadLink>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ScoreHistory;
