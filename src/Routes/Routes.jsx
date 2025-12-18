import React from 'react';
import { createBrowserRouter } from 'react-router';
import ErrorPage from '../Pages/ErrorPage404/ErrorPage404';
import MainLayouts from '../Layouts/MainLayout/MainLayouts';
import Home from '../Pages/Home/Home';
import AuthLayout from '../Layouts/AuthLayouts/AuthLayout';
import LogIn from "../Pages/Auth/LogIn/LogIn";
import Register from "../Pages/Auth/Register/Register";
import Coverage from '../Pages/Coverage/Coverage';
import AboutUs from '../Pages/AboutUs/AboutUs';
import Contract from '../Pages/Contract/Contract';
import Services from '../Pages/Services/Services';

const router = createBrowserRouter([
    {
        path: '/',
        errorElement:<ErrorPage/>,
        element: <MainLayouts/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path:'coverage',
                element: <Coverage/>
            },
            {
                path:'about-us',
                element: <AboutUs/>
            },
            {
                path:'contract',
                element: <Contract/>
            },
            {
                path:'services',
                element: <Services/>
            },
        ]
    },
      {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        element: <LogIn></LogIn>
      },
      {
        path: 'register',
        element: <Register></Register>
      }
    ]
  }, 
])

export default router;