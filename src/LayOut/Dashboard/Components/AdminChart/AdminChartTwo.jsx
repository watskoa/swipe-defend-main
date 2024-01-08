import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import useAllUser from '../../../../hooks/useAllUser';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const AdminChartTwo = () => {
    const { users, refetch } = useAllUser();
    const secureApi = useAxiosSecure();
    const payments = secureApi.get('/payments');
    const paymentDates = payments.map(payment => payment.date);

    return (
        <div>
            <div className="">
                <h1 className="text-2xl font-bold text-gray-800 text-center">Payment Status</h1>
            </div>
            <div className="">
                <Chart options={options} series={series} type="line" height={350} />
            </div>
        </div>
    );
};

export default AdminChartTwo;