import React, { useEffect, useState, useRef } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import CardOne from './Cards/CardOne';
import CardTwo from './Cards/CardTwo';
import CardThree from './Cards/CardThree';
import CardFour from './Cards/CardFour';
import AdminChartOne from './AdminChart/AdminChartOne';

const AdminHome = () => {
    return (
        <div className="flex flex-col -mt-20">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                <CardOne />
                <CardTwo />
                <CardThree />
                <CardFour />
            </div>

            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
            {/* <AdminChartOne /> */}
            </div>
        </div>
    );
};

export default AdminHome;