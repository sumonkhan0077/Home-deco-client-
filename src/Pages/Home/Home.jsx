import React from "react";
import './home.css'
import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";
import image4 from "../../assets/image4.jpg";
import imagepng from "../../assets/pngimage.png";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Link } from "react-router";
import CategoryHome from "./Shared/CategoryHome/CategoryHome.jsx";
import NewsLetters from "./Shared/NewsLetters/NewsLetters.jsx";
import TopCard from "./Shared/TopCard/TopCard.jsx";
import QuestionAnswer from "./Shared/QuestionAnswer/QuestionAnswer.jsx";
import TopEventer from "./Shared/TopEventer/TopEventer.jsx";


const Home = () => {
  return (
    <div className="">
      
      <header className=" bg-[#213943] dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-300  flex flex-col">
        {/* MAIN */}
        <main className="flex-1 ">
          {/* HERO */}
          <section className="relative overflow-hidden py-20 lg:py-24">
            <div
              className="absolute hidden lg:block inset-0 opacity-10 dark:opacity-10 left-60 top-30 "
              style={{
                backgroundImage:
                  `url(${imagepng})`,
                backgroundSize: "800px 800px",
                 backgroundRepeat: "no-repeat"
              }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-6 md:-mb-16  z-50">
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mb-6 dark:text-white">
                  “I’m Eliza..
                  <span className="text-primary italic">Flavory</span> 
                </h1>
                <p className="text-lg md:text-xl  mb-10">
                  Our blog brings together certified instructors, wellness
                  lovers and soulful living.
                </p>
                <Link
                 
                  className="inline-flex items-center text-xl gap-2 main-btn2"
                >
                  About Us
                  <span className="text-2xl  ">
        
                    <MdOutlineArrowOutward />
                  </span>
                </Link>
              </div>

              {/* IMAGES */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end relative -z-10">
                <div className="group relative -mb-24 md:-mb-28 transition duration-500 hover:-translate-y-2">
                  <div className="aspect-[3/4] w-full rounded-t-full overflow-hidden shadow-2xl relative z-10 bg-gray-200 dark:bg-gray-700">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                      <span className="text-white font-display text-xl">
                        Cooking With Passion
                      </span>
                    </div>
                    <img
                      alt="Woman cooking in a bright kitchen"
                      className="w-full h-full object-cover"
                      src={image1}
                    />
                  </div>
                </div>
                <div className="group relative hidden md:block  z-20 md:-mb-28 transition duration-500 hover:-translate-y-2">
                  <div className="aspect-square w-full rounded-t-full overflow-hidden shadow-2xl border-4 border-white dark:border-background-dark relative bg-gray-200 dark:bg-gray-700">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                      <span className="text-white font-display text-xl">
                        Fresh Ingredients
                      </span>
                    </div>
                    <img
                      alt="Delicious fresh papaya salad plate"
                      className="w-full h-full object-cover"
                      src={image4}
                    />
                  </div>
                </div>
                <div className="group relative hidden md:block md:-mb-28 transition duration-500 hover:-translate-y-2">
                  <div className="aspect-[3/4] w-full rounded-t-full overflow-hidden shadow-2xl relative z-10 bg-gray-200 dark:bg-gray-700">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                      <span className="text-white font-display text-xl">
                        Tasteful Choices
                      </span>
                    </div>
                    <img
                      alt="Woman chef thinking about recipes"
                      className="w-full h-full object-cover"
                      src={image3}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </header>
      
      <CategoryHome/>
      <TopCard/>
      <TopEventer/>
      <QuestionAnswer/>
      <NewsLetters/>
    </div>
  );
};

export default Home;
