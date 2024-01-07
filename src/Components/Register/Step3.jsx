import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import AuthProvider from '../../Provider/AuthProvider/AuthProvider';

const Step3 = () => {

    const navigate = useNavigate();
    const { user } = useAuth();
    const location = useLocation();
    const alldata = location.state;
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        if (alldata === null) {
            navigate('/register')
        }
    }, [location]);

    const handelSubmit = (e) => {
        e.preventDefault();
        const ssn_create = e.target.ssn_create.value;
        const ssn_confirm = e.target.ssn_confirm.value;
        const metaData = user?.metadata;
        const join_date = user?.metadata?.creationTime;

        const finalData = {
            ...alldata,
            ssn_create,
            ssn_confirm,
            metaData,
            join_date
        };

        if (ssn_create !== ssn_confirm) {
            toast.error('SSN number not match');
        }
        else {
            toast.success('Registration successfull');
            axiosPublic.post('/users', finalData)
                .then(res => {
                    navigate('/login');
                })
                .catch(err => {
                    console.log(err);
                })
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div>
                        <img src={logo}
                            className="w-32 mx-auto" />
                    </div>
                    <div className="mt-12 flex flex-col items-center justify-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">
                            Step - 3
                        </h1>
                        <div className="w-full flex-1 mt-8">
                            <div className="mx-auto max-w-xs">
                                <div className="">
                                    <form onSubmit={handelSubmit} className="mb-6">
                                        <h2 className="text-xl font-semibold text-gray-700  mb-2">Tell us about yourself</h2>
                                        <div className="divider">Full SSN Number</div>
                                        {/* Full SNN number  */}
                                        <div>
                                            <div>
                                                <label className="block text-gray-700  mb-1">Social Security Numbe
                                                    <span className='text-red-500'>*</span></label>
                                                <input required maxLength={9} type="new-password" name="ssn_create" className="w-full rounded-lg border py-2 px-3" />
                                            </div>
                                            <div>
                                                <label className="block text-gray-700  mb-1">Confirm Social Security Number
                                                    <span className='text-red-500'>*</span></label>
                                                <input maxLength={9} required type="new-password" name="ssn_confirm" className="w-full rounded-lg border py-2 px-3" />
                                            </div>
                                        </div>

                                        {/* next btn */}
                                        <div className="mt-6 justify-end flex">
                                            <button className="relative overflow-hidden btn  border-indigo group mt-4 ">
                                                <span className="relative z-10 transition-colors group-hover:text-white px-6 ">Next</span>
                                                <span className="absolute inset-0 bg-indigo transition-all duration-500 transform scale-x-0 origin-left group-hover:scale-x-50"></span>
                                                <span className="absolute inset-0 bg-indigo transition-all duration-500 transform scale-x-0 origin-right group-hover:scale-x-50"></span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <p className="mt-6 text-xs text-gray-600 text-center">
                                    I agree to abide by templatana's
                                    <Link to={'/'} className="border-b border-gray-500 border-dotted">
                                        Terms of Service
                                    </Link>
                                    and its
                                    <Link to={'/'} className="border-b border-gray-500 border-dotted">
                                        Privacy Policy
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                    <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{ backgroundImage: 'url(https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg)' }}>
                    </div>
                </div>
            </div >
            <ToastContainer />
        </div >
    );
};

export default Step3;