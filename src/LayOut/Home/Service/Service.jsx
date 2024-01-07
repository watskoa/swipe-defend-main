import React from 'react';

const Service = () => {
    return (
        <div className="bg-gray-100 sm:p-4 min-h-[80vh] max-w-7xl mx-auto mt-10">
            <h2 className="text-3xl font-bold mb-10">Our Services</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Credit Monitoring</h3>
                    <p>We monitor your credit reports and alert you to any changes that could impact your credit score.</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Identity Theft Protection</h3>
                    <p>We monitor your personal information and the dark web to alert you if your identity may be compromised.</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Credit Counseling</h3>
                    <p>Our financial experts provide guidance to help improve your credit and reach your financial goals.</p>
                </div>
            </div>
        </div>
    );
};

export default Service;
