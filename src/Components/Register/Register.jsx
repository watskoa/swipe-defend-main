import React, { useEffect } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { FcLock } from "react-icons/fc";
import Swal from 'sweetalert2';


const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state === undefined) {
            navigate('/register')
        }
    }, [location]);

    const handelStep = (event) => {
        event.preventDefault();

        const form = event.target;
        const first_name = form.first_name.value;
        const last_name = form.last_name.value;
        const dob = form.date.value;
        const ssn = form.ssn.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const address = form.address.value;
        const city = form.city.value;
        const state = form.state.value;
        const zip = form.zip.value;
        console.log(dob)

        // check the dob value is valid or not 
        const dob_split = dob.split('-');
        const dob_split_length = dob_split.length;
        if (dob_split_length !== 3) {
            // alert('Invalid Date of Birth');
            console.log(dob_split_length);
            return;
        }
        const dob_split_year = dob_split[0];
        console.log(dob_split_year);
        const dob_split_month = dob_split[1];
        const dob_split_day = dob_split[2];
        const dob_date = new Date(dob_split_year, dob_split_month - 1, dob_split_day);
        const today = new Date();
        let age = today.getFullYear() - dob_date.getFullYear();
        const m = today.getMonth() - dob_date.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob_date.getDate())) {
            age--;
        }
        if (age <= 18) {
            // alert('You must be at least 18 years old to register');
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You must be at least 18 years old to register',
            })
            return;
        }
        if (age >= 100) {
            // alert('You are too old to register');
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You are too old to register',
            })
            return;
        }

        const stepOneData = {
            first_name,
            last_name,
            dob,
            ssn,
            email,
            phone,
            address,
            city,
            state,
            zip
        }
        navigate('/register/step2', { state: stepOneData });
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
                            Step - 1
                        </h1>
                        <div className="w-full flex-1 mt-8">
                            <div className="mx-auto max-w-xs">
                                <div className="">
                                    <form onSubmit={handelStep} className="mb-6">
                                        <h2 className="text-xl font-semibold text-gray-700  mb-2">Tell us about yourself</h2>
                                        {/* name */}
                                        <div className="divider">Personal Info</div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-gray-700  mb-1">First Name  <span className='text-red-500'>*</span></label>
                                                <input required placeholder='Kathy' type="text" name="first_name" className="w-full rounded-lg border py-2 px-3" />
                                            </div>
                                            <div>
                                                <label className="block text-gray-700  mb-1">Last Name <span className='text-red-500'>*</span></label>
                                                <input required placeholder='Henning' type="text" name="last_name" className="w-full rounded-lg border py-2 px-3" />
                                            </div>
                                        </div>

                                        {/* Date of birth */}
                                        <div className="grid grid-cols-1 mt-1 gap-4">
                                            <div>
                                                <label className="block text-gray-700 mb-1">Date of Birth <span className='text-red-500'>*</span></label>
                                                <input required type="date" name="date" className="w-full rounded-lg border py-2 px-3" />
                                            </div>
                                        </div>

                                        {/* Last 4 Digits of Social Security Number* */}
                                        <div className="mt-4">
                                            <h2 className='font-normal text-lg'>Last 4 Digits of Social Security Number <span className='text-red-500'>*</span></h2>
                                            <p className='font-normal text-sm'>By providing the last 4  digits of my SSN, I understand that TransUnion will retrieve my full SSN to deliver products that I input requiredrequest on this website.</p>
                                            <div className="grid grid-cols-2 justify-items-end">
                                                <label className="block text-gray-700  mb-1"><FcLock className='text-4xl' /></label>
                                                <input placeholder='1234' type="password" maxLength={4} required name="ssn" className="w-full rounded-lg border py-2 px-3" />
                                            </div>
                                        </div>

                                        <div className="divider">Contact Info</div>

                                        {/* Email address & phone */}
                                        <div>
                                            <div>
                                                <label className="block text-gray-700  mb-1">Email Address <span className='text-red-500'>*</span></label>
                                                <input placeholder='user@swipedefender.com' required type="text" name="email" className="w-full rounded-lg border py-2 px-3" />
                                            </div>
                                            <div>
                                                <label className="block text-gray-700 mb-1">Phone <span className='text-red-500'>*</span></label>
                                                <input minLength={9} maxLength={10} required type="text" placeholder='+1 (234) 56789' name="phone" className="w-full rounded-lg border py-2 px-3" />
                                            </div>
                                        </div>

                                        <div className="divider">Address Info</div>
                                        {/* Address */}
                                        <div className="mt-4">
                                            <label className="block text-gray-700  mb-1">Address <span className='text-red-500'>*</span></label>
                                            <input required type="text" name="address" placeholder='Address' className="w-full rounded-lg border py-2 px-3" />
                                        </div>

                                        <div className="mt-4">
                                            <label className="block text-gray-700  mb-1">City <span className='text-red-500'>*</span></label>
                                            <input required placeholder='Dallas' type="text" name="city" className="w-full rounded-lg border py-2 px-3" />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                            <div>
                                                <label className="block text-gray-700  mb-1">State <span className='text-red-500'>*</span></label>
                                                {/* <input required type="text" name="state" className="w-full rounded-lg border py-2 px-3" /> */}

                                                <select name="state" id="state" data-selenium="form-orderstep1-currstate" data-module="Select" autocomplete="address-level1" aria-required="true" data-error="No Option Selected" className="w-full rounded-lg border py-2 px-3" aria-invalid="true">
                                                    <option value="" selected=""></option>
                                                    <option value="AL">Alabama</option>
                                                    <option value="AK">Alaska</option>
                                                    <option value="AS">American Samoa</option>
                                                    <option value="AZ">Arizona</option>
                                                    <option value="AR">Arkansas</option>
                                                    <option value="AA">Armed Forces Americas</option>
                                                    <option value="AE">Armed Forces Europe, Middle East, Africa, &amp; Canada</option>
                                                    <option value="AP">Armed Forces Pacific</option>
                                                    <option value="CA">California</option>
                                                    <option value="CO">Colorado</option>
                                                    <option value="CT">Connecticut</option>
                                                    <option value="DE">Delaware</option>
                                                    <option value="DC">District Of Columbia</option>
                                                    <option value="FM">Federated States Of Micronesia</option>
                                                    <option value="FL">Florida</option>
                                                    <option value="GA">Georgia</option>
                                                    <option value="GU">Guam</option>
                                                    <option value="HI">Hawaii</option>
                                                    <option value="ID">Idaho</option>
                                                    <option value="IL">Illinois</option>
                                                    <option value="IN">Indiana</option>
                                                    <option value="IA">Iowa</option>
                                                    <option value="KS">Kansas</option>
                                                    <option value="KY">Kentucky</option>
                                                    <option value="LA">Louisiana</option>
                                                    <option value="ME">Maine</option>
                                                    <option value="MH">Marshall Islands</option>
                                                    <option value="MD">Maryland</option>
                                                    <option value="MA">Massachusetts</option>
                                                    <option value="MI">Michigan</option>
                                                    <option value="MN">Minnesota</option>
                                                    <option value="MS">Mississippi</option>
                                                    <option value="MO">Missouri</option>
                                                    <option value="MT">Montana</option>
                                                    <option value="NE">Nebraska</option>
                                                    <option value="NV">Nevada</option>
                                                    <option value="NH">New Hampshire</option>
                                                    <option value="NJ">New Jersey</option>
                                                    <option value="NM">New Mexico</option>
                                                    <option value="NY">New York</option>
                                                    <option value="NC">North Carolina</option>
                                                    <option value="ND">North Dakota</option>
                                                    <option value="MP">Northern Mariana Islands</option>
                                                    <option value="OH">Ohio</option>
                                                    <option value="OK">Oklahoma</option>
                                                    <option value="OR">Oregon</option>
                                                    <option value="PW">Palau</option>
                                                    <option value="PA">Pennsylvania</option>
                                                    <option value="PR">Puerto Rico</option>
                                                    <option value="RI">Rhode Island</option>
                                                    <option value="SC">South Carolina</option>
                                                    <option value="SD">South Dakota</option>
                                                    <option value="TN">Tennessee</option>
                                                    <option value="TX">Texas</option>
                                                    <option value="UT">Utah</option>
                                                    <option value="VT">Vermont</option>
                                                    <option value="VI">Virgin Islands</option>
                                                    <option value="VA">Virginia</option>
                                                    <option value="WA">Washington</option>
                                                    <option value="WV">West Virginia</option>
                                                    <option value="WI">Wisconsin</option>
                                                    <option value="WY">Wyoming</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-gray-700  mb-1">ZIP Code <span className='text-red-500'>*</span></label>
                                                <input required placeholder='12345' maxlength="5" type="text" name="zip" className="w-full rounded-lg border py-2 px-3" />
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
        </div >
    );
};

export default Register;