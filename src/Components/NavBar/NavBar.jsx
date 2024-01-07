import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { FaRegUserCircle } from "react-icons/fa";
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import useAdmin from '../../hooks/useAdmin';
const NavBar = () => {
    const { user } = useAuth();
    const [isAdmin] = useAdmin();

    const links = <>
        <li>
            <NavLink className={({ isActive, isPending }) => isActive ? 'border-b-4 border-indigo' : 'hover:border-b-4 hover:border-indigo'} to={'/'}>Home</NavLink>
        </li>


        <li>
            <NavLink className={({ isActive }) => isActive ? 'border-b-4 border-indigo' : 'hover:border-b-4 hover:border-indigo'} to={'/product'}>Product</NavLink>
        </li>


        <li>
            <NavLink className={({ isActive }) => isActive ? 'border-b-4 border-indigo' : 'hover:border-b-4 hover:border-indigo'} to={'/resourse'}>Resources</NavLink>
        </li>
        <li>
            <NavLink className={({ isActive, isPending }) => isActive ? 'border-b-4 border-indigo' : 'hover:border-b-4 hover:border-indigo'} to={'/service'}>Services</NavLink>
        </li>
        {/* <li>
            <NavLink className={({ isActive, isPending }) => isActive ? 'border-b-4 border-indigo' : 'hover:border-b-4 hover:border-indigo'} to={'/insights'}>Insights</NavLink>
        </li> */}
        <li>
            <NavLink className={({ isActive, isPending }) => isActive ? 'border-b-4 border-indigo' : 'hover:border-b-4 hover:border-indigo'} to={'/customerSupport'}>Consumer Support</NavLink>
        </li>
        <li>
            <NavLink className={({ isActive, isPending }) => isActive ? 'border-b-4 border-indigo' : 'hover:border-b-4 hover:border-indigo'} to={'/about'}>About</NavLink>
        </li>
        <li>
            {user?.emailVerified ? <NavLink className={({ isActive, isPending }) => isActive ? 'border-b-4 border-indigo' : 'hover:border-b-4 hover:border-indigo'} to={
                isAdmin ? '/dashboard/adminHome' : '/dashboard/userHome'
            }><FaRegUserCircle /> Dashboard</NavLink> : <NavLink to={'/login'}><FaRegUserCircle /> Member Login</NavLink>}
        </li>
    </>
    return (
        <div className="navbar shadow-xl py-4 px-6">
            <div className="navbar-start">
                <div className="dropdown">
                    <div className="drawer lg:hidden" style={{ zIndex: 10 }}>
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            <label htmlFor="my-drawer" className=" drawer-button"> <svg xmlns="http://www.w3.org/2000/svg" className="h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg></label>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                                <div className="">
                                    <NavLink><img className='h-[50px] visible lg:invisible' src={logo} alt="" /></NavLink>
                                </div>
                                <div className="bg-opacity-0">
                                    {
                                        links
                                    }
                                </div>
                            </ul>
                        </div>
                    </div>

                </div>
                <NavLink><img className='h-8 invisible lg:visible' src={logo} alt="" /></NavLink>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        links
                    }
                </ul>
            </div>
            <div className="navbar-end" style={{ zIndex: 1 }}>
                {
                    user ? <></> :
                        <button className="relative overflow-hidden btn  border-indigo group btn-sm">
                            <Link to={'/register'} className="relative z-10 transition-colors group-hover:text-white px-6 ">Get Credit Monitoring</Link>

                            <span className="absolute inset-0 bg-indigo transition-all duration-500 transform scale-x-0 origin-right group-hover:scale-x-100"></span>
                        </button>
                }
            </div>
        </div>
    );
};

export default NavBar;