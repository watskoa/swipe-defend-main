import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import useAllUser from '../../../../hooks/useAllUser';

const AdminChartOne = () => {
    const { users, refetch } = useAllUser();
    const joinDates = users.map(user => user.join_date);
    const dailyNewUsers = joinDates.reduce((acc, date) => {
        const formattedDate = new Date(date).toLocaleDateString();
        acc[formattedDate] = (acc[formattedDate] || 0) + 1;
        return acc;
    }, {});
    const options = {
        chart: {
            id: 'basic-bar',
            toolbar: {
                show: false,
            },
        },
        xaxis: {
            categories: Object.keys(dailyNewUsers),
        },
        yaxis: {
            min: 0,
            max: 500,
        },
        stroke: {
            curve: 'smooth',
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            enabled: true,
            theme: 'dark',
            x: {
                show: true,
                format: 'dd MMM yyyy',
            },
        },
        colors: ['#FBBF24'],
        grid: {
            show: false,
        },
        markers: {
            size: 0,
        },
    };

    const series = [
        {
            name: 'New Users',
            data: Object.values(dailyNewUsers),
        },
    ];

    // Add new function to filter chart by date range here

    return (
        <div>
            <div className="">
                <h1 className="text-2xl font-bold text-gray-800 text-center">New Users</h1>
                <Chart options={options} series={series} type="line" height={350} />
            </div>
        </div>
    );
};

export default AdminChartOne;