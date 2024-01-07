import { useLocation, useNavigate } from "react-router-dom";
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { useEffect } from "react";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import CardComponent from "../CardComponent/CardComponent";

const Step2 = () => {
    const location = useLocation();
    const stepOneData = location.state;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}$/;
    const navigate = useNavigate();


    useEffect(() => {
        if (stepOneData === null) {
            navigate('/register')
        }
    }, [location]);

    const { createUser, updateUserProfile, verifyEmail } = useContext(AuthContext)
    const email = stepOneData.email;

    const displayName = stepOneData.first_name + ' ' + stepOneData.last_name;

    const handelStep = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const create_password = e.target.create_password.value;
        const confirm_password = e.target.confirm_password.value;
        const seq = e.target.seq.value;
        const seq_answer = e.target.seq_answer.value;
        const card_number = e.target.card_number.value;
        const cvc = e.target.cvc.value;
        const exdate = e.target.exdate.value;



        const stepTwoData = {
            ...stepOneData,
            email,
            create_password,
            confirm_password,
            seq,
            seq_answer,
            card_number,
            cvc,
            exdate
        };

        // check exdate vaule is valid or not
        const exdate_split = exdate.split('/');
        const exdate_month = exdate_split[1];
        const exdate_year = exdate_split[0];
        const exdate_date = new Date(exdate_year, exdate_month - 1, 1);
        const today = new Date();
        const exdate_diff = exdate_date - today;
        const exdate_diff_in_days = Math.ceil(exdate_diff / (1000 * 60 *
            60 * 24));
        if (exdate_diff_in_days < 0) {
            // alert('Invalid Expiration Date');
            console.log(exdate_diff_in_days);
            return;
        }
        if (exdate_diff_in_days > 365) {
            // alert('Invalid Expiration Date');
            console.log(exdate_diff_in_days);
            return;
        }
        if (exdate_diff_in_days > 30) {
            // alert('Invalid Expiration Date');
            console.log(exdate_diff_in_days);
            return;
        }

        if (create_password !== confirm_password) {
            toast.error('Password not match');
        } else if (confirm_password.length < 8) {
            toast.error('Password must be at least 8 characters long');
        } else if (!passwordRegex.test(confirm_password)) {
            toast.error('Password must contain at least one capital letter, one special character, and one number');
        } else {
            // Create user with email and password
            createUser(email, create_password)
                .then(res => {
                    // send email verification link
                    verifyEmail();
                    updateUserProfile(displayName)
                    navigate('/register/step3', { state: stepTwoData });
                })
                .catch(err => {
                    toast.error("Your email already exist");
                })
        }
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
                            Step - 2
                        </h1>
                        <div className="w-full flex-1 mt-8">
                            <div className="mx-auto max-w-xs">
                                <div className="">
                                    <form onSubmit={handelStep} className="mb-6">
                                        <h2 className="text-xl font-semibold text-gray-700  mb-2">Tell us about yourself</h2>
                                        {/* Email */}
                                        <div className="divider">Create Account</div>
                                        <div className="grid grid-cols-1 gap-4">
                                            <div>
                                                <label className="block text-gray-700  mb-1">Email <span className='text-red-500'>*</span></label>
                                                <input defaultValue={email} disabled required type="text" name="email" className="w-full rounded-lg border py-2 px-3" />
                                            </div>
                                        </div>

                                        {/* Date of birth */}
                                        <div className="grid grid-cols-1">
                                            <div>
                                                <label className="block text-gray-700  mb-1">Create Password <span className='text-red-500'>*</span></label>
                                                <input required type="password" name="create_password" className="w-full rounded-lg border py-2 px-3" />
                                            </div>
                                            <div>
                                                <label className="block text-gray-700  mb-1">Confirm Password
                                                    <span className='text-red-500'>*</span></label>
                                                <input required type="password" name="confirm_password" className="w-full rounded-lg border py-2 px-3" />
                                            </div>
                                        </div>

                                        <div className="divider">Secret Info</div>
                                        {/* Email address & phone */}
                                        <div>
                                            <div>
                                                <label className="block text-gray-700  mb-1">Secret Question
                                                    <span className='text-red-500'>*</span></label>
                                                <select name="seq" required aria-required="true" data-selenium="form-orderstep2-secretquestion" aria-describedby="secret-question-desc" data-module="Select" data-error="No Option Selected" className="w-full rounded-lg border py-2 px-3" aria-invalid="true">
                                                    <option value="" selected="true">-- choose a secret question --</option>
                                                    <option value="What was your high school mascot?">What was your high school
                                                        mascot?</option>
                                                    <option value="What was your first grade teacher's last name?">What was your
                                                        first grade teacher's last name?</option>
                                                    <option value="What was the make and model of your first car?">What was the make
                                                        and model of your first car?</option>
                                                    <option value="What is your mother's middle name?">What is your mother's middle
                                                        name?</option>
                                                    <option value="What is your father's middle name?">What is your father's middle
                                                        name?</option>
                                                    <option value="What city were you born in?">What city were you born in?</option>
                                                    <option value="What is your grandmother's first name (on your mother's side)?">
                                                        What is your grandmother's first name (on your mother's side)?</option>
                                                    <option value="What is your grandfather's first name (on your father's side)?">
                                                        What is your grandfather's first name (on your father's side)?</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-gray-700  mb-1">Secret Answer
                                                    <span className='text-red-500'>*</span></label>
                                                <input required type="text" name="seq_answer" className="w-full rounded-lg border py-2 px-3" />
                                            </div>
                                        </div>

                                        <div className="divider">Payment info</div>
                                        {/* Payment info */}
                                        <div className="gap-4 grid grid-cols-1">
                                            <div className="mt-4">
                                                <label className="block text-gray-700  mb-1">Credit Card Number for Monthly Payment<span className='text-red-500'>*</span></label>
                                                <input placeholder="Card Number" required type="text" maxLength={16} name="card_number" className="w-full rounded-lg border py-2 px-3" />
                                            </div>

                                            <div className="mt-4 grid grid-cols-2 items-center">
                                                <label className="block text-gray-700  mb-1">Security Code
                                                    <span className='text-red-500'>*</span></label>
                                                <input placeholder="CVC Number" minLength={4} maxLength={5} required type="text" name="cvc" className="w-full rounded-lg border py-2 px-3" />
                                            </div>

                                            <div className="grid grid-cols-1 gap-4 mt-4">
                                                <div>
                                                    <label className="block text-gray-700 mb-1">Expiration Month
                                                        <span className='text-red-500'>*</span></label>
                                                    <input required type="month" name="exdate" className="w-full rounded-lg border py-2 px-3" />
                                                </div>
                                            </div>
                                        </div>
                                        {/* next btn */}
                                        <div className="mt-6 justify-end flex" >
                                            <button className="relative overflow-hidden btn  border-indigo group mt-4 ">
                                                <span className="relative z-10 transition-colors group-hover:text-white px-6 ">Next</span>
                                                <span className="absolute inset-0 bg-indigo transition-all duration-500 transform scale-x-0 origin-left group-hover:scale-x-50"></span>
                                                <span className="absolute inset-0 bg-indigo transition-all duration-500 transform scale-x-0 origin-right group-hover:scale-x-50"></span>
                                            </button>
                                        </div >
                                    </form >
                                </div >
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
                            </div >
                        </div >
                    </div >
                </div >
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

export default Step2;