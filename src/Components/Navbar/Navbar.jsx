import React from "react";
import { Link, NavLink } from "react-router";
import Logo from "../Logo/Logo";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  console.log(user)

  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => {
        console.log(error);
      });
  };

  const items = (
    <>
      <li>
        {" "}
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        {" "}
        <NavLink to="/services">Services</NavLink>
      </li>
      <li>
        {" "}
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
      <li>
        {" "}
        <NavLink to="/be-a-decorator">Be A Decorator</NavLink>
      </li>
      <li>
        {" "}
        <NavLink to="/contract">Contract</NavLink>
      </li>
      <li>
        {" "}
        <NavLink to="/about-us">About Us</NavLink>
      </li>

      <li>
        {" "}
        <NavLink to="/login">Login</NavLink>
      </li>
      {
        user && <> 
         <li>
        {" "}
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
        </>
      }
      
    </>
  );
  return (
    <>
      <div className="navbar  sticky top-0 z-500 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-xl  shadow-xl backdrop-saturate-150">
        <div className="navbar-start">
          <div className="dropdown ">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className=" menu-sm dropdown-content bg-primary rounded-box z-100 mt-3 w-50 p-2 pl-4 shadow"
            >
              {items}
            </ul>
          </div>
          <Logo></Logo>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{items}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <a onClick={handleLogOut} className=" text-sm px-4 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300">
              Log Out
            </a>
          ) : (
            <Link className="text-sm px-4 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300" to="/login">
              LogIn
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
