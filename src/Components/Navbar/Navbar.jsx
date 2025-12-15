import React from "react";
import { NavLink } from "react-router";

const Navbar = () => {
  const items = (
    <>
      <li>
        {" "}
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        {" "}
        <NavLink to="/all_products">All Products</NavLink>
      </li>
      <li>
        {" "}
        <NavLink to="/my_import">My Import</NavLink>
      </li>
      <li>
        {" "}
        <NavLink to="/my_products">My Product</NavLink>
      </li>
      <li>
        {" "}
        <NavLink to="/about-us">About Us</NavLink>
      </li>

      <li>
        {" "}
        <NavLink to="/login">Logins</NavLink>
      </li>
      <li>
        {" "}
        <NavLink to="/register">Register</NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {items}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{items}</ul>
        </div>
        <div className="navbar-end">
          <a
            className="group flex items-center gap-2 px-6 py-1 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 dark:border-gray-400 dark:text-gray-300 dark:hover:bg-gray-100 dark:hover:text-gray-900 whitespace-nowrap"
            href="#"
          >
            <span className="font-medium text-lg font-display">Login</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
