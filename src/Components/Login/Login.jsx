import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider/AuthProvider';
import useAuth from '../../hooks/useAuth';
import useAdmin from '../../hooks/useAdmin';

const Login = () => {
    const { signIn, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isAdmin] = useAdmin();

    const verifyEmail = () => {
        const form = document.querySelector('form');
        const email = form.email.value;
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter a valid email',
            })
        }
    }

    const handellogin = (event) => {
        verifyEmail();
        event.preventDefault();
        const form = event.target;

        const email = form.email.value;
        const current_password = form.current_password.value;

        signIn(email, current_password)
            .then(res => {
                if (res.user.emailVerified === false) {
                    logOut();
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Please verify your email first',
                    })
                    return;
                }
                else {
                    if(isAdmin) {
                        navigate('/dashboard/adminHome')
                    }
                    else {
                        navigate('/dashboard/userHome')
                    }
                };
                // navigate('/dashboard');
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message,
                })
            })
    }


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
                            Sign In
                        </h1>
                        <div className="w-full flex-1 mt-8">
                            <div className="mx-auto max-w-xs">
                                <form onSubmit={handellogin}>
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="email" placeholder="Email" name='email' />
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="password" placeholder="Password" name='current_password' />
                                    <button
                                        className="mt-5 tracking-wide font-semibold bg-indigo text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                        <svg className="w-6 h-6 -ml-2 text-white" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" strokeLinejoin="round">
                                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                            <circle cx="8.5" cy="7" r="4" />
                                            <path d="M20 8v6M23 11h-6" />
                                        </svg>
                                        <span className="ml-3 text-white">
                                            Sign In
                                        </span>
                                    </button>
                                </form>
                                <div className="mt-2">
                                    <Link className='text-sm text-indigo ' to={'/forgetPassword'}>Forget Password?</Link>
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
                </div>
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                    <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{ backgroundImage: 'url(https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg)' }}>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Login;