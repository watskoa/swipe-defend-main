import React, { useEffect, useState, useRef } from 'react';
import CardOne from './Cards/CardOne';
import CardTwo from './Cards/CardTwo';
import CardThree from './Cards/CardThree';
import CardFour from './Cards/CardFour';
import AdminChartOne from './AdminChart/AdminChartOne';
import AdminChartTwo from './AdminChart/AdminChartTwo';

const AdminHome = () => {
    return (
        <div className="flex flex-col -mt-20">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                <CardOne />
                <CardTwo />
                <CardThree />
                <CardFour />
            </div>

            <div className="mt-4 grid grid-cols-1">
            <AdminChartOne />
            {/* <AdminChartTwo /> */}
            </div>
        </div>
    );
};

export default AdminHome;