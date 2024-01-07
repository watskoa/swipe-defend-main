import { Link, NavLink, Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// Icons
import { FaAlignLeft, FaRegUser, FaCalendar, FaEnvelope, FaHome, FaList, FaMailchimp, FaSearch, FaShoppingCart, FaUsers, FaAd } from "react-icons/fa";
import { MdReviews, MdAddBox, MdOutlinePersonPin } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { CiSettings } from "react-icons/ci";

const Dashboard = () => {
    const { user, logOut } = useAuth();
    const [isAdmin] = useAdmin();
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (!user.emailVerified) {
            logOut();
        }
    }, [user.emailVerified])

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosSecure.get(`singleuser/${user.email}`);
                setUserData(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [axiosSecure, user.email]);

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col p-10">
                <div className="flex justify-between items-center bg-indigo-300 p-4 rounded-lg">
                    <div className="lg:text-center">
                        <h2 className="text-2xl">Welcome to Dashboard, {userData.first_name}</h2>
                    </div>
                    <div className="lg:hidden">
                        <label htmlFor="my-drawer-2" className="btn items-center justify-center btn-square btn-primary drawer-button"><FaAlignLeft ></FaAlignLeft></label>
                    </div>
                </div>

                <div id="advatiser" className="relative py-28 lg:py-32 bg-white">
                    <div className="relative z-0">
                        <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col gap-10 ">
                            <div className="relative z-10">
                                <Outlet />
                            </div>
                            <div className="absolute w-full lg:w-1/2 inset-y-0 lg:right-0 hidden lg:block">

                                <span
                                    className="absolute -left-6 md:left-4 top-24 lg:top-28 w-24 h-24 rotate-90 skew-x-12 rounded-3xl bg-green-400 blur-xl opacity-60 lg:opacity-95 lg:block hidden">
                                </span>

                                <span
                                    className="absolute right-4 bottom-12 w-24 h-24 rounded-3xl bg-blue-600 blur-xl opacity-80">

                                </span>

                            </div>
                            <span
                                className="w-4/12 lg:w-2/12 aspect-square bg-gradient-to-tr from-blue-600 to-green-400 absolute -top-5 lg:left-0 rounded-full skew-y-12 blur-2xl opacity-40 skew-x-12 rotate-90">
                            </span>
                            <div className="relative flex flex-col items-center text-center lg:text-left lg:py-7 xl:py-8 
                                lg:items-start lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2">

                                <div className="mt-10  w-full flex max-w-md mx-auto lg:mx-0">
                                    <div className="flex sm:flex-row flex-col gap-5 w-full">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-2 w-80 min-h-full flex flex-col justify-between bg-base-200 text-base-content">
                    {/* admin nav links */}
                    <div className="flex flex-col gap-2">
                        {
                            isAdmin ? <>
                                <li>
                                    <NavLink className={({ isActive, isPending }) => isActive ? 'border-b-4 border-indigo' : 'hover:border-b-4 hover:border-indigo'} to="/dashboard/adminHome">
                                        <FaHome></FaHome>
                                        Admin Home</NavLink>
                                </li>
                                <li>
                                    <NavLink className={({ isActive, isPending }) => isActive ? 'border-b-4 border-indigo' : 'hover:border-b-4 hover:border-indigo'} to="/dashboard/addReviews">
                                        <MdAddBox></MdAddBox >
                                        Add Review</NavLink>
                                </li>
                                <li>
                                    <NavLink className={({ isActive, isPending }) => isActive ? 'border-b-4 border-indigo' : 'hover:border-b-4 hover:border-indigo'} to="/dashboard/customerSuport">
                                        <FaMailchimp></FaMailchimp >
                                        Customer Support</NavLink>
                                </li>
                                <li>
                                    <NavLink className={({ isActive, isPending }) => isActive ? 'border-b-4 border-indigo' : 'hover:border-b-4 hover:border-indigo'} to="/dashboard/manageReviews">
                                        <MdReviews></MdReviews>
                                        Manage Reviews</NavLink>
                                </li>
                                <li>
                                    <NavLink className={({ isActive, isPending }) => isActive ? 'border-b-4 border-indigo' : 'hover:border-b-4 hover:border-indigo'} to="/dashboard/userInfos">
                                        <FaRegUser></FaRegUser>
                                        Member Info</NavLink>
                                </li>
                                <li>
                                    <NavLink className={({ isActive, isPending }) => isActive ? 'border-b-4 border-indigo' : 'hover:border-b-4 hover:border-indigo'} to="/dashboard/allUsers">
                                        <FaUsers></FaUsers>
                                        All Members</NavLink>
                                </li>

                            </>
                                :
                                <>
                                    <li>
                                        <NavLink className={({ isActive, isPending }) => isActive ? 'border-b-4 border-indigo' : 'hover:border-b-4 hover:border-indigo'} to="/dashboard/userHome">
                                            <FaHome></FaHome>
                                            Home</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={({ isActive, isPending }) => isActive ? 'border-b-4 border-indigo' : 'hover:border-b-4 hover:border-indigo'} to="/dashboard/credit-score">
                                            <FaCalendar></FaCalendar>
                                            Check Score</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={({ isActive, isPending }) => isActive ? 'border-b-4 border-indigo' : 'hover:border-b-4 hover:border-indigo'} to="/dashboard/score-monitor">
                                            <FaShoppingCart></FaShoppingCart>
                                            Score Monitor</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={({ isActive, isPending }) => isActive ? 'border-b-4 border-indigo' : 'hover:border-b-4 hover:border-indigo'} to="/dashboard/paymentHistory">
                                            <FaAd></FaAd>
                                            Payment History</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={({ isActive, isPending }) => isActive ? 'border-b-4 border-indigo' : 'hover:border-b-4 hover:border-indigo'} to="/dashboard/scoretHistory">
                                            <FaList></FaList>
                                            Report History</NavLink>
                                    </li>
                                </>
                        }
                    </div>
                    {/* shared nav links */}
                    <div className="grid grid-cols-1 justify-between">
                        <div className="">
                            <li>
                                <NavLink to="/">
                                    <FaHome></FaHome>
                                    Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/service">
                                    <FaSearch></FaSearch>
                                    Services</NavLink>
                            </li>
                            <li>
                                <NavLink to="/customerSupport">
                                    <FaEnvelope></FaEnvelope>
                                    Contact</NavLink>
                            </li>
                        </div>

                        <div className="flex flex-col gap-2">
                            <li>
                                <NavLink to="/dashboard/profile">
                                    <CiSettings></CiSettings>
                                    Profile</NavLink>
                            </li>
                            <li>
                                <Link className="bg-red-300" onClick={handleLogOut}>
                                    <IoIosLogOut></IoIosLogOut>
                                    Logout
                                </Link>

                            </li>
                        </div>
                    </div>

                </ul>

            </div>
        </div>
    );
};

export default Dashboard;