import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Components/Footer/Footer';

const MainLayouts = () => {
    return (
        <>
            <Navbar></Navbar>
            <Outlet/>
            <Footer></Footer>
        </>
    );
};

export default MainLayouts;