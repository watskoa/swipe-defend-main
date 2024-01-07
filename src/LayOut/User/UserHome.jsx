import React from 'react';
import useSingleUser from '../../hooks/useSingleUser';
import useAuth from '../../hooks/useAuth';
import ChartOne from '../Dashboard/Components/Chart/ChartOne';
import useUserScoreReport from '../../hooks/useUserSocreReport';

const UserHome = () => {
    const { user } = useAuth();
    const { userData } = useSingleUser(user.email);
    const scoreReport = useUserScoreReport(user.email);

    const lastCreditScore = scoreReport && scoreReport.length > 0 ? scoreReport[scoreReport.length - 1]?.creditScore : null;

    const previousCreditScore = scoreReport && scoreReport.length > 0 ? scoreReport[scoreReport.length - 2]?.creditScore : null;

    const { first_name } = userData;

    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
                {/* ... */}
                <div className="bg-white overflow-hidden shadow rounded-lg">

                    <div className="">
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Hello..!
                                    </dt>
                                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                                        {first_name}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-4 py-5 sm:p-6">
                    <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                            Last Score
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">
                            {lastCreditScore}
                        </dd>
                    </dl>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg">

                    <div className="px-4 py-5 sm:p-6">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                                Previous Score
                            </dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">
                                {previousCreditScore}
                            </dd>
                        </dl>
                    </div>
                </div>
            </div >


            <div className="">
                <ChartOne />
            </div>
        </>
    );
};

export default UserHome;
