import React from 'react';

import { Link, Outlet } from 'react-router';
import authImage from '../../assets/image2.jpg'
import imagelogin from '../../assets/register.json'
import Logo from "../../Components/Logo/Logo";
import Navbar from '../../Components/Navbar/Navbar';
// import imagelogin from '../../assets/login.json'
// import Lottie from 'lottie-react';
const AuthLayout = () => {
    return (
        <div className=''>
            <Navbar/>
           
           
            <div className=''>
                <div className=''>
                    <Outlet></Outlet>
                </div>
                {/* <div className='flex-1'>
                    <Lottie animationData={imagelogin} loop={true} />
                </div> */}
            </div>
        </div>
    );
};

export default AuthLayout;