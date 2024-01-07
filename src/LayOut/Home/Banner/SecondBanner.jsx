import Lottie from 'lottie-react';
import anim from '../../../assets/anim.json'
import { Link } from 'react-router-dom';

const SecondBanner = () => {
    return (
        <div className="hero min-h-screen max-w-7xl mx-auto">
        <div className="hero-content flex-col md:flex-col-reverse lg:flex-row-reverse">
            <div className="text-left lg:w-1/2" data-aos="fade-down"  data-aos-duration="1500">
                <h1 className='text-5xl mb-6'>
                Know your score. Protect your credit.
                </h1>
                <p className='text-xl mb-6'>
                See your credit score now and stay on top of it with updates available daily. Discover your credit potential with powerful tools like CreditCompassTM. Protect what you’ve built with Credit Lock Plus, and rest easy with up to $1MM in ID theft insurance.
                </p>
                <Link to={'dashboard/credit-score'} className="relative overflow-hidden btn  border-indigo group mt-4 ">
                    <span className="relative z-10 transition-colors group-hover:text-white px-6 ">Start Now</span>
                    <span className="absolute inset-0 bg-indigo transition-all duration-500 transform scale-x-0 origin-left group-hover:scale-x-50"></span>
                    <span className="absolute inset-0 bg-indigo transition-all duration-500 transform scale-x-0 origin-right group-hover:scale-x-50"></span>
                </Link>
            </div>
            <div className="md:w-1/2 lg:w-1/2" data-aos="fade-up"  data-aos-duration="1500">
            <Lottie animationData={anim} />
            </div>
        </div>
    </div>
    );
};

export default SecondBanner;