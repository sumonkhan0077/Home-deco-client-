import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Link } from "react-router";

const TopCard = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 lg:px-8 lg:py-24">
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-16 gap-6 border-b border-primary/50 dark:border-white/10 pb-8">
        <div className="max-w-2xl">
          <span className="text-secondary font-medium tracking-widest text-sm uppercase block">
            Explore 
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-primary dark:text-gray-100 leading-tight">
            Most Popular Services
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
 {/* card */}
      <div className="flex gap-4" >

       
         <div
               
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
              >
                {/* Card Image */}
                <div
                 
                  className="relative aspect-square overflow-hidden bg-gray-100"
                >
                  <img
                    src=""
                    alt=""
                    fill
                    objectFit="cover"
                    className="transition-transform duration-500 group-hover:scale-105"
                    
                  />
                 
                  {/* Category Badge */}
                  <span className="absolute top-3 left-2 px-3 py-1 rounded-full bg-white/5 backdrop-blur-xl  shadow-2xl backdrop-saturate-150 uppercase tracking-wide">
                    home
                  </span>
                </div>
                  {/* Card Content */}
                <div className="p-5 flex flex-col grow">
                  <div className="grow">
                    {/* Title */}
                    <Link
                      
                      className="text-2xl h-1/2 font-bold text-secondary mb-2 group-hover:text-primary transition-colors"
                    >
                      Flower
                    </Link>

                    {/* Short Description */}
                    <p className="text-gray-500 text-base line-clamp-2 mb-4">
                      
                        Handcrafted with care using sustainable materials. A perfect addition to your collection
                    </p>
                     <div className="flex text-xl font-md text-secondary">
                      <span className="mt-0.5 mr-0.5">$</span>
                      <span>999 - $1299</span> / <span className="text-sm mt-2 font-normal">per room</span>
                    </div>
                  </div>
                     {/* Price & Action */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                   <div>
                    reviwe 5 ⭐
                   </div>

                    {/* Details Button */}
                    <Link
                     
                      className="inline-flex items-center  main-btn2"
                    >
                      View Details 
                    </Link>
                  </div>
                </div>
              
      </div>
         
        
    </div>
    </div>
  );
};

export default TopCard;
