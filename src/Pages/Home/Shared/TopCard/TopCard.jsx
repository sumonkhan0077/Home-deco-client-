import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";

const TopCard = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 lg:px-8 lg:py-24">
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-16 gap-6 border-b border-primary/50 dark:border-white/10 pb-8">
        <div className="max-w-2xl">
          <span className="text-secondary font-medium tracking-widest text-sm uppercase block">
            Stylish & Affordable
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-primary dark:text-gray-100 leading-tight">
            Holistic Interior Services
          </h1>
        </div>
        <a
          className="group flex items-center gap-2 px-6 py-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 dark:border-gray-400 dark:text-gray-300 dark:hover:bg-gray-100 dark:hover:text-gray-900 whitespace-nowrap"
          href="#"
        >
          <span className="font-medium text-lg font-display">Show More</span>
          <span className="text-2xl">
            <MdOutlineArrowOutward />
          </span>
        </a>
      </div>
      <div >
        card
      </div>
    </div>
  );
};

export default TopCard;
