import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Components/Footer/Footer';
import ScrollToTopButton from '../../Utility/ScrollProgressButton';

const MainLayouts = () => {
    return (
        <>
            
            <Navbar></Navbar>
            <Outlet/>
            <Footer></Footer>
            <ScrollToTopButton/>
        </>
    );
};

export default MainLayouts;