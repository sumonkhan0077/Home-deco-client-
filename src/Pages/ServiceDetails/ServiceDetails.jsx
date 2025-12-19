import React from "react";
import { Link, useParams } from "react-router";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaArrowLeftLong, FaRegHeart, FaStar,  } from "react-icons/fa6";
import { LuShapes } from "react-icons/lu";
import { FiShoppingCart } from "react-icons/fi";
import { IoHammerOutline, IoLeafOutline } from "react-icons/io5";

const ServiceDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: services = {} } = useQuery({
    queryKey: ["services", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/services/${id}`);
      return res.data;
    },
  });
  console.log(services);

  // const paragraphs = services.description
  //   ? services.description.split("\n\n")
  //   : [];

  // const mid = Math.ceil(paragraphs.length / 2);
  // const left = paragraphs.slice(0, mid);
  // const right = paragraphs.slice(mid);
  return (
    <div>
      <div className=" ">
          <Link to="/services" className="flex  items-center mt-4 ml-12 gap-2 text-xl text-primary">
            <span>
              <FaArrowLeftLong />
            </span>
            Back to Services
          </Link>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            <div className="lg:col-span-7 flex flex-col gap-16">
              <div className="relative w-full aspect-[4/5] lg:aspect-square overflow-hidden rounded-[2rem] bg-secondary/30 group shadow-soft">
                <img
                  alt={services.service_name}
                  className="h-full w-full object-cover object-center transition duration-700 ease-out group-hover:scale-105"
                  src={services.image}
                />
                <div className="absolute top-6 left-6">
                  <span className="rounded-full bg-white/5 backdrop-blur-xl  shadow-2xl backdrop-saturate-150 uppercase tracking-wide px-4 py-2 ">
                    {services.service_category}
                  </span>
                </div>
              </div>
              
              <div className="hidden lg:block border-t border-gray-100 pt-12">
                <h2 className="text-3xl text-secondary mb-8">
                  The Product Details
                </h2>
                {services.description ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* LEFT */}
                    <div className="prose prose-sm text-text-muted leading-relaxed font-serif">
                      {(() => {
                        const paragraphs =
                          services.description?.split("\n\n") || [];
                        const mid = Math.ceil(paragraphs.length / 2);
                        const left = paragraphs.slice(0, mid);

                        return left.map((p, i) => (
                          <p
                            key={i}
                            className={
                              i === 0
                                ? "mb-4 first-letter:text-4xl first-letter:font-display first-letter:text-primary first-letter:mr-2 first-letter:float-left"
                                : "mb-4"
                            }
                          >
                            {" "}
                            {p.includes("-") ? (
                              <ul className=" list-inside">
                                {" "}
                                {p.split("\n").map((line, i) => (
                                  <li className="" key={i}>
                                    {line.replace("-", "").trim()}
                                  </li>
                                ))}{" "}
                              </ul>
                            ) : (
                              <p>{p}</p>
                            )}{" "}
                          </p>
                        ));
                      })()}
                    </div>

                    {/* RIGHT */}
                    <div className="prose prose-sm text-text-muted leading-relaxed font-serif">
                      {(() => {
                        const paragraphs =
                          services.description?.split("\n\n") || [];
                        const mid = Math.ceil(paragraphs.length / 2);
                        const right = paragraphs.slice(mid);

                        return right.map((p, i) => (
                          <p key={i} className="mb-4 ">
                            {" "}
                            {p.includes("-") ? (
                              <ul className=" list-inside">
                                {" "}
                                {p.split("\n").map((line, i) => (
                                  <li className="" key={i}>
                                    {line.replace("-", "").trim()}
                                  </li>
                                ))}{" "}
                              </ul>
                            ) : (
                              <p>{p}</p>
                            )}{" "}
                          </p>
                        ));
                      })()}
                    </div>
                  </div>
                ) : (
                  <p>Loading product details...</p>
                )}
              </div>

            </div>
            <div className="lg:col-span-5 relative">
              <div className="lg:sticky lg:top-32 space-y-10">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
                      <span className=" text-[16px] text-yellow-500">
                        <FaStar />
                      </span>
                      <span className="text-sm font-bold text-yellow-500 pt-0.5">
                        {services.rating} / 5.0
                      </span>
                    </div>
                    <button className="text-text-muted hover:text-red-500 transition-colors">
                      <span className="text-xl">
                        <FaRegHeart />
                      </span>
                    </button>
                  </div>
                  <h1 className="text-4xl  lg:text-5xl text-secondary leading-[1.15] mb-4">
                    {services.service_name}
                  </h1>

                  <div className="flex flex-col gap-1">
                    {/* Main Price - Starting From (সবচেয়ে ছোট প্রাইসটা হাইলাইট) */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-normal text-primary">
                        ${services.costs?.[0]}
                      </span>
                      <span className="text-lg text-gray-600">
                        starting from
                      </span>
                    </div>

                    {/* Full Range + Optional Old Price for Discount Feel */}
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-gray-500">
                        Range: ${services.costs?.[0]} - ${services.costs?.[2]}{" "}
                        {services.unit && `/ ${services.unit}`}
                      </span>

                      {/* যদি ডিসকাউন্ট দেখাতে চাও (অপশনাল) */}
                      {services.original_price && (
                        <span className="text-text-muted line-through">
                          ${services.original_price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div class="space-y-4 pt-4">
                  <button class="w-full bg-primary hover:bg-transparent hover:border border-primary hover:text-primary text-white text-lg font-medium py-4 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group">
                    <span>Place Order Now</span>
                    <span className="text-2xl group-hover:translate-x-1 transition-transform">
                      <FiShoppingCart />
                    </span>
                  </button>
                </div>
                <div className="bg-secondary py-6 px-5 rounded-2xl">
                  <h3 className=" text-lg mb-4 text-primary">
                    Specifications
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-600">
                      <div className="flex text-white  items-center gap-1  text-text-muted">
                       <span className="text-primary"><IoLeafOutline /></span> Theme
                      </div>
                      <span className="text-sm text-white font-medium text-text-main">
                      Customized Themes,<br /> Elegant &amp; Modern Styling.
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-600">
                      <div className="flex text-white items-center gap-1 text-text-muted">
                       <span className="text-primary"><IoHammerOutline /></span> Services
                      </div>
                      <span className="text-sm text-white font-medium text-text-main">
                        Full Setup, <br />Fresh Flowers, Lighting &amp; Effects
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-600">
                      <div className="flex text-white items-center gap-1 text-text-muted">
                       <span className="text-primary"><LuShapes /></span>Guarantee
                      </div>
                      <span className="text-sm text-white font-medium text-text-main">
                        On-time Setup, <br />Quality & Customer Satisfaction
                      </span>
                    </div>
                  </div>
                </div>

                <div className="block lg:hidden border-t border-gray-100 pt-12">
                <h2 className="text-3xl text-secondary mb-8">
                  The Product Details
                </h2>
                {services.description ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* LEFT */}
                    <div className="prose prose-sm text-text-muted leading-relaxed font-serif">
                      {(() => {
                        const paragraphs =
                          services.description?.split("\n\n") || [];
                        const mid = Math.ceil(paragraphs.length / 2);
                        const left = paragraphs.slice(0, mid);

                        return left.map((p, i) => (
                          <p
                            key={i}
                            className={
                              i === 0
                                ? "mb-4 first-letter:text-4xl first-letter:font-display first-letter:text-primary first-letter:mr-2 first-letter:float-left"
                                : "mb-4"
                            }
                          >
                            {" "}
                            {p.includes("-") ? (
                              <ul className=" list-inside">
                                {" "}
                                {p.split("\n").map((line, i) => (
                                  <li className="" key={i}>
                                    {line.replace("-", "").trim()}
                                  </li>
                                ))}{" "}
                              </ul>
                            ) : (
                              <p>{p}</p>
                            )}{" "}
                          </p>
                        ));
                      })()}
                    </div>

                    {/* RIGHT */}
                    <div className="prose prose-sm text-text-muted leading-relaxed font-serif">
                      {(() => {
                        const paragraphs =
                          services.description?.split("\n\n") || [];
                        const mid = Math.ceil(paragraphs.length / 2);
                        const right = paragraphs.slice(mid);

                        return right.map((p, i) => (
                          <p key={i} className="mb-4 ">
                            {" "}
                            {p.includes("-") ? (
                              <ul className=" list-inside">
                                {" "}
                                {p.split("\n").map((line, i) => (
                                  <li className="" key={i}>
                                    {line.replace("-", "").trim()}
                                  </li>
                                ))}{" "}
                              </ul>
                            ) : (
                              <p>{p}</p>
                            )}{" "}
                          </p>
                        ));
                      })()}
                    </div>
                  </div>
                ) : (
                  <p>Loading product details...</p>
                )}
              </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ServiceDetails;
