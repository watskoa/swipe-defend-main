import Lottie from 'lottie-react';
import creditScore from '../../../assets/credit-Score.json';
import creditMonitoring from '../../../assets/credit-monitoting.json';
import creditFrod from '../../../assets/creditFrod.json';

const Product = () => {
    return (
        <div className="bg-gray-100 min-h-[80vh] max-w-7xl mx-auto py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold mb-8">Our Products</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-center p-4">
                            <Lottie className='w-60' animationData={creditScore} />
                        </div>
                        <h3 className="text-lg font-medium mb-4">Credit Socre</h3>
                        <p className="text-gray-600">
                            Credit scores typically range from 300 to 850, with higher scores indicating better creditworthiness. Lenders use these scores to determine the interest rates, credit limits, and terms offered to borrowers.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-center">
                            <Lottie className='w-60' animationData={creditMonitoring} />
                        </div>
                        <h3 className="text-lg font-medium mb-4">Credit Monitoring</h3>
                        <p className="text-gray-600">
                            It's important to note that credit monitoring is a proactive measure to detect potential issues, but it does not prevent identity theft or fraud. Instead, it offers early detection and alerts to take action promptly in case of suspicious activities.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-center">
                            <Lottie className='w-60' animationData={creditFrod} />
                        </div>
                        <div className="">
                            <h3 className="text-lg font-medium mb-4">Credit Fraud Alert</h3>
                            <p className="text-gray-600">
                                When a fraud alert is in place, creditors should verify your identity before extending credit. They might attempt to contact you directly at a provided phone number or take additional steps to verify your identity, such as asking for more documentation.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
