import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FiFilter, FiX } from "react-icons/fi";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import useAuth from "../../Hooks/useAuth";

const Services = () => {
  const axiosSecure = useAxiosSecure();
  const { loading } = useAuth();
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");

  const { data: services = [], isLoading } = useQuery({
    queryKey: ["services", search, selectedCategory, minBudget, maxBudget],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `services?search=${search}&type=${selectedCategory}&min=${minBudget}&max=${maxBudget}`
      );
      return res.data;
    },
  });
  console.log(services);
  // Categories (your 6 home decor categories)

  // if (loading) {
  //   return <Loading></Loading>;
  // }
  const categories = [
    "Home",
    "Wedding",
    "Party",
    "Seminar",
    "Office",
    "Meeting",
  ];

  const handleApply = () => {
    setIsOpen(false); // Close modal after apply
  };

  const handleReset = () => {
    setSearch("");
    setSelectedCategory("");
    setMinBudget("");
    setMaxBudget("");
    setIsOpen(false);
  };
  return (
    <div>
      <div className="max-w-7xl mx-auto px-6 mb-20 lg:px-8 mt-14">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 border-b border-primary/50 dark:border-white/10 pb-8">
          <div className="max-w-2xl">
            <span className="text-secondary font-medium tracking-widest text-sm uppercase block">
              Explore
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-primary dark:text-gray-100 leading-tight">
              Our Services
            </h1>
          </div>
          <div>
            {/* search */}
            <div
              data-aos="flip-up"
              className="flex items-center w-96 bg-gray-50 border border-gray-200 rounded-lg p-1"
            >
              <input
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                type="search"
                required
                className="flex-1 bg-transparent border-none outline-none px-3 py-2 text-gray-700 placeholder-gray-400"
              />
              <button className="bg-primary hover:bg-transparent hover:border hover:border-primary hover:text-primary text-white p-2 rounded-md transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-4.35-4.35m1.85-5.4a7.25 7.25 0 11-14.5 0 7.25 7.25 0 0114.5 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div>
          {/* filtering */}
          <>
            {/* 3-Dots Button  */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className=" fixed bottom-6 right-6 z-50 p-4 bg-primary text-white rounded-full shadow-2xl hover:bg-primary-dark transition-all duration-300 transform hover:scale-110"
              aria-label="Open Filters"
            >
              {isOpen ? <FiX size={28} /> : <FiFilter size={28} />}
            </button>

            {/* Filter Modal (slide-up from bottom on mobile) */}
            <div
              className={` fixed inset-0 bg-[#fffaec] bg-opacity-50 z-40 transition-opacity duration-500 ${
                isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <div
                className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl p-6 transition-transform duration-500 transform ${
                  isOpen ? "translate-y-0" : "translate-y-full"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <FiX size={28} />
                  </button>
                </div>

                {/* Category Dropdown */}
                <div className="mb-6">
                  <label className="block text-lg font-semibold text-gray-800 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat, idx) => (
                      <option key={idx} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Budget Range */}
                <div className="mb-8">
                  <label className="block text-lg font-semibold text-gray-800 mb-2">
                    Budget Range ($)
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="number"
                      value={minBudget}
                      onChange={(e) => setMinBudget(parseInt(e.target.value))}
                      placeholder="Min"
                      className="flex-1 p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                    />
                    <input
                      type="number"
                      value={maxBudget}
                      onChange={(e) => setMaxBudget(parseInt(e.target.value))}
                      placeholder="Max"
                      className="flex-1 p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={handleReset}
                    className="flex-1 py-4 bg-gray-200 text-gray-800 font-bold rounded-xl hover:bg-gray-300 transition-all duration-300"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleApply}
                    className="flex-1 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all duration-300"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </>
        </div>

        
        {/* card */}
        {isLoading ? (
          <Loading></Loading>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
            {services.map((top) => (
              <div key={top._id} className="flex gap-4">
                <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
                  {/* Card Image */}
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={top.image}
                      alt={top.service_name}
                      className="transition-transform w-full h-full object-cover duration-500 group-hover:scale-105"
                    />

                    {/* Category Badge */}
                    <span className="absolute top-3 left-2 px-3 py-1 text-white rounded-full bg-secondary/90 backdrop-blur-xl  shadow-2xl backdrop-saturate-150 uppercase tracking-wide">
                      {top.service_category}
                    </span>
                  </div>
                  {/* Card Content */}
                  <div className="p-5 flex flex-col grow">
                    <div className="grow">
                      {/* Title */}
                      <Link className="text-xl h-1/2 font-md text-secondary mb-2 group-hover:text-primary transition-colors">
                        {top.service_name}
                      </Link>

                      {/* Short Description */}
                      <p className="text-gray-500 text-base line-clamp-2 mb-4">
                        {top.description}
                      </p>
                      <div className="flex text-xl font-md text-secondary">
                        $
                        <span>
                          {" "}
                          {top.costs[0]} - {top.costs[2]}/{" "}
                        </span>{" "}
                        <span className="text-sm mt-2 font-normal">
                          {top.unit}
                        </span>
                      </div>
                    </div>
                    {/* Price & Action */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        Rating:{" "}
                        <span className="text-yellow-600">{top.rating}</span>
                      </div>

                      {/* Details Button */}
                      <Link
                        to={`/services/${top._id}`}
                        className="inline-flex items-center px-3 py-2 rounded-full bg-primary  text-white  border border-primary hover:bg-transparent  hover:text-primary transition-all duration-300"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

          {/* No data */}
      {services.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No services found 😕<br />
          Try again
        </div>
      )}
      </div>
    </div>
  );
};

export default Services;
