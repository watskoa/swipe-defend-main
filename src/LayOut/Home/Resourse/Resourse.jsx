import React from 'react';

const Resourse = () => {
    return (
        <div className="resourse sm:p-4 bg-gray-200 min-h-[80vh] max-w-7xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Resources</h2>

            <div className="resourse__container grid grid-cols-2 gap-4">
                <div className="resourse__item bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold mb-2">Reports</h3>
                    <p>View detailed credit reports and analysis.</p>
                </div>

                <div className="resourse__item bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold mb-2">Education</h3>
                    <p>Learn how to understand and improve your credit.</p>
                </div>

                <div className="resourse__item bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold mb-2">Community</h3>
                    <p>Connect with others working to improve their financial health.</p>
                </div>

                <div className="resourse__item bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold mb-2">Blog</h3>
                    <p>Read the latest tips and advice from financial experts.</p>
                </div>
            </div>
        </div>
    );
};

export default Resourse;
