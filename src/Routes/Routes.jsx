import React from "react";
import { createBrowserRouter } from "react-router";
import ErrorPage from "../Pages/ErrorPage404/ErrorPage404";
import MainLayouts from "../Layouts/MainLayout/MainLayouts";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayouts/AuthLayout";
import LogIn from "../Pages/Auth/LogIn/LogIn";
import Register from "../Pages/Auth/Register/Register";
import Coverage from "../Pages/Coverage/Coverage";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Contract from "../Pages/Contract/Contract";
import Services from "../Pages/Services/Services";
// import Dashboard from "../Pages/Dashboard/dashboard";
import ServiceDetails from "../Pages/ServiceDetails/ServiceDetails";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import MyProfile from "../Pages/Dashboard/MyProfile/Myprofile";
import MyBookings from "../Pages/Dashboard/MyBookings/MyBookings";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import ManageDecorators from "../Pages/Dashboard/ManageDecorators/ManageDecorators";
import ManageServices from "../Pages/Dashboard/ManageServices/ManageServices";
import ManageBookings from "../Pages/Dashboard/ManageBookings/ManageBookings";
import AssignDecorator from "../Pages/Dashboard/AssignDecorator/AssignDecorator";
import Analytics from "../Pages/Dashboard/Analytics/Analytics";
import PaymentSuccess from "../Pages/Dashboard/MyBookings/PaymentSuccess";
import PaymentCancelled from "../Pages/Dashboard/MyBookings/PaymentCancelled";
import BeADecorator from "../Pages/BeADecorator/BeADecorator";
import UsersManagement from "../Pages/Dashboard/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute";
import AssignedTasks from "../Pages/Dashboard/AssignedTasks/AssignedTasks";
import TodayTasks from "../Pages/Dashboard/TodayTasks/TodayTasks";
import EarningsSummary from "../Pages/Dashboard/EarningsSummary/EarningsSummary";
import RevenueMonitoring from "../Pages/Dashboard/RevenueMonitoring/RevenueMonitoring";
import ServicesHistory from "../Pages/Dashboard/ServicesHistory/ServicesHistory";
import Loading from "../Components/Loading/Loading";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <MainLayouts />,
    hydrateFallbackElement: <Loading/>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "coverage",
        element: <Coverage />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "contract",
        element: <Contract />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: `/services/:id`,
        element: <ServiceDetails />,
      },
      {
        path: "be-a-decorator",
        element: <BeADecorator />,
      },
      // {
      //   path: "dashboard",
      //   element: <Dashboard />,
      // },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        element: <LogIn></LogIn>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardHome/>,
      },
      {
        path: "my_profile",
        element: <MyProfile />,
      },
      {
        path: "my_booking",
        element: <MyBookings />,
      },
      {
        path: "payment_history",
        element: <PaymentHistory />,
      },
      {
        path: "services-history",
        element: <ServicesHistory />,
      },
      {
        path: "manage_decorators",
        element: <ManageDecorators />,
      },
      {
        path: "manage_services",
        element: <AdminRoute>
          <ManageServices />
          </AdminRoute>
         ,
      },
      {
        path: "manage_bookings",
        element: <ManageBookings />,
      },
      {
        path: "assign_decorator",
        element: <AssignDecorator />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "users-management",
        element: <UsersManagement />,
      },
      {
        path: "revenue-monitoring",
        element: <RevenueMonitoring />,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "payment-cancelled",
        element: <PaymentCancelled />,
      },
      {
        path: "assigned-tasks",
        element: <AssignedTasks />,
      },
      {
        path: "today-tasks",
        element: <TodayTasks />,
      },
      {
        path: "earnings-summary",
        element: <EarningsSummary />,
      },
    ],
  },
]);

export default router;
