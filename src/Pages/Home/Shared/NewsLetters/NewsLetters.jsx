import React from "react";
import { GiSelfLove } from "react-icons/gi";
import { GrProjects } from "react-icons/gr";
import { IoHammerOutline } from "react-icons/io5";
import { MdOutlineArrowOutward } from "react-icons/md";
import "./index.css";

const NewsLetters = () => {
  return (
    <div>
      <div className="bg-background-light dark:bg-background-dark antialiased flex flex-col">
        <main
          className="flex-grow  flex flex-col lg:flex-row relative bg-gradient-to-br from-[#1b2f38] via-[#213943] to-[#2c4f5d]"
        >
          {/* ================= LEFT HERO ================= */}
          <div
            className="relative w-full lg:w-3/5 xl:w-2/3 min-h-[600px] px-6 flex items-center justify-center overflow-hidden"
          >
            {/* Soft Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/25 to-black/10" />

            {/* CONTENT */}
            <div className="relative z-10 max-w-2xl w-full">
              <span className="inline-block main-btn2 tracking-widest uppercase mb-6">
                Premium Home Decor
              </span>

              <h1
                className=" text-3xl md:text-5xl lg:text-6xl font-medium text-white mb-8 leading-tight drop-shadow-sm"
              >
                Designing Homes <br />
                With <i className=" italic text-orange-400">Elegance</i> <br />&
                Comfort
              </h1>

              <p
                className="text-lg text-gray-200 mb-10 font-light max-w-lg leading-relaxed"
              >
                Transform your living space with modern, stylish, and timeless
                home decoration solutions crafted to reflect your lifestyle.
              </p>

              {/* FORM */}
              <form className="w-full max-w-md md:max-w-lg mb-6">
                <div
                  className="relative flex flex-col md:flex-row items-center bg-white rounded-full p-1.5 shadow-xl transition-transform duration-300 focus-within:scale-[1.02]"
                >
                  <input
                    type="email"
                    placeholder="Enter your email for free consultation"
                    required
                    className="flex-grow bg-transparent border-none text-gray-800 placeholder-gray-500 focus:ring-0 text-base py-3 px-5 outline-none"
                  />

                  <button
                    type="submit"
                    className="main-btn2 cursor-pointer flex gap-1"
                  >
                    Get Started{" "}
                    <span className="text-xl">
                      <MdOutlineArrowOutward />
                    </span>
                  </button>
                </div>
              </form>

              {/* CHECKBOX */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 w-4 h-4 rounded 
            border-white/30 bg-white/10 
            text-orange-500 focus:ring-orange-500"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-300 cursor-pointer"
                >
                  I agree to receive updates about home décor ideas and offers.{" "}
                  <a
                    href="#"
                    className="underline decoration-orange-400 
              underline-offset-4 hover:text-white"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div>
          </div>

          {/* ================= RIGHT STATS PANEL ================= */}
          <div
            className="w-full lg:w-2/5 xl:w-1/3 
    bg-gradient-to-br from-white via-gray-50 to-gray-100
    dark:from-[#1f2933] dark:via-[#1b2530] dark:to-[#111827]
    flex flex-col justify-center p-8 lg:p-16 
    relative z-10 shadow-2xl lg:shadow-none"
          >
            <div className="max-w-md mx-auto w-full space-y-12">
              {/* HEADER */}
              <div className="text-center lg:text-left">
                <h3
                  className="text-sm font-bold uppercase tracking-widest 
          text-gray-500 dark:text-gray-400 mb-2"
                >
                  Why Choose Us
                </h3>
                <div className="h-1 w-12 bg-orange-500 rounded-full mx-auto lg:mx-0" />
              </div>

              {/* STAT ITEM */}
              {[
                {
                  value: "5000+",
                  title: "Happy Client",
                  desc: "Designing spaces our clients truly love.",
                  icon: <GiSelfLove />,
                },
                {
                  value: "1500+",
                  title: "Interior Projects",
                  desc: "Completed with premium quality",
                  icon: <GrProjects />,
                },
                {
                  value: "10+",
                  title: "Years Experience",
                  desc: "Trusted home décor expertise",
                  icon: <IoHammerOutline />,
                },
              ].map((item, i) => (
                <div key={i} className="flex  items-center gap-6 group">
                  <div
                    className="w-16 h-16 rounded-2xl bg-white 
            dark:bg-gray-700 shadow-lg flex items-center justify-center text-2xl
            text-orange-500 group-hover:bg-orange-500 
            group-hover:text-white transition-all duration-300"
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      className=" text-4xl number  
              text-gray-900 dark:text-white font-semibold mb-1"
                    >
                      {item.value}
                    </div>
                    <div
                      className="text-sm font-medium text-gray-500 
              dark:text-gray-300 uppercase tracking-wide"
                    >
                      {item.title}
                    </div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}

              {/* QUOTE */}
              <div className="pt-8 border-t border-gray-200 dark:border-gray-600">
                <p className="text-sm italic text-gray-500 dark:text-gray-400">
                  "A well-designed home is not just a place to live, it’s a
                  place to feel."
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewsLetters;
