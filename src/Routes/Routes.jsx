import React from 'react';
import { createBrowserRouter } from 'react-router';
import ErrorPage from '../Pages/ErrorPage404/ErrorPage404';
import MainLayouts from '../Layouts/MainLayout/MainLayouts';
import Home from '../Pages/Home/Home';

const router = createBrowserRouter([
    {
        path: '/',
        errorElement:<ErrorPage/>,
        element: <MainLayouts/>,
        children: [
            {
                index: true,
                element: <Home/>
            }
        ]
    }
])

export default router;