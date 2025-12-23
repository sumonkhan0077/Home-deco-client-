import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import Loading from "../../../../Components/Loading/Loading";

const TopCard = () => {
  const {loading} = useAuth();
  
  const axiosSecure = useAxiosSecure();
  const { data: top_rating = [] } = useQuery({
    queryKey: ["top_rating"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/top_rating`);
      return res.data;
    },
  });
  console.log(top_rating);
  if(loading){
    return <Loading></Loading>
  }
  return (
    <div className="max-w-7xl mx-auto px-6 mb-20 lg:px-8 ">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 border-b border-primary/50 dark:border-white/10 pb-8">
        <div className="max-w-2xl">
          <span className="text-secondary font-medium tracking-widest text-sm uppercase block">
            Explore
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-primary dark:text-gray-100 leading-tight">
            Most Popular Services
          </h1>
        </div>
        <Link 
        to='/services'
          className="group flex items-center gap-2 px-6 py-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 dark:border-gray-400 dark:text-gray-300 dark:hover:bg-gray-100 dark:hover:text-gray-900 whitespace-nowrap"
          
        >
          <span className="font-medium text-lg font-display">Show More</span>
          <span className="text-2xl">
            <MdOutlineArrowOutward />
          </span>
        </Link>
      </div>
      {/* card */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {top_rating.map((top) => (
          <div key={top._id} className="flex gap-4">
            <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
              {/* Card Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={top.image}
                  alt={top.service_name}
                 
                  className="transition-transform duration-500 group-hover:scale-105 w-full h-full object-cover"
                />

                {/* Category Badge */}
                <span className="absolute top-3 left-2 px-3 py-1 rounded-full text-white bg-secondary/90 backdrop-blur-xl  shadow-2xl backdrop-saturate-150 uppercase tracking-wide">
                  {top.service_category}
                </span>
              </div>
              {/* Card Content */}
              <div className="p-5 flex flex-col grow">
                <div className="grow">
                  {/* Title */}
                  <Link className="text-xl h-1/2 font-medium text-secondary mb-2 group-hover:text-primary transition-colors">
                    {top.service_name}
                  </Link>

                  {/* Short Description */}
                  <p className="text-gray-500 text-base line-clamp-2 mb-4"></p>
                  <div className="flex text-xl font-md text-secondary">
                    $
                    <span>
                      {" "}
                      {top.costs[0]} - {top.costs[2]}/{" "}
                    </span>{" "}
                    <span className="text-sm mt-2 font-normal">{top.unit}</span>
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
                  className="inline-flex items-center px-3 py-2 rounded-full bg-primary  text-white  border border-primary hover:bg-transparent  hover:text-primary transition-all duration-300">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCard;
