import React from "react";
import image1 from "../../../../assets/image1.jpg";
import image2 from "../../../../assets/image2.jpg";
import image3 from "../../../../assets/image3.jpg";
import image4 from "../../../../assets/image4.jpg";
import imagepng from "../../../../assets/pngimage.png";
import { Link } from "react-router";
import { MdOutlineArrowOutward } from "react-icons/md";

const Header = () => {
  return (
    <div>
      <header className="bg-[#213943] dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-300 flex flex-col">
        <main className="flex-1">
          <section className="relative overflow-hidden py-20 lg:py-24">
            <div
              className="absolute hidden lg:block inset-0 opacity-10 dark:opacity-10 left-[220px] top-[120px]"
              style={{
                backgroundImage: `url(${imagepng})`,
                backgroundSize: "800px 800px",
                backgroundRepeat: "no-repeat",
              }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-6 md:-mb-16 z-50">
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 text-white/85">
                  Beautiful Spaces.. Thoughtfully
                  <span className="text-primary italic"> Designed</span>
                </h1>
                <p className="text-lg font-normal md:text-xl text-white/50 mb-10">
                  Our DocorNest brings together expert designers, creative
                  craftsmanship, and soulful living.
                </p>
                <Link
                  to="/about" // Fixed: Add path
                  className="inline-flex items-center text-xl gap-2 main-btn2"
                >
                  About Us
                  <span className="text-2xl">
                    <MdOutlineArrowOutward />
                  </span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end relative -z-10">
                <div className="group relative -mb-24 md:-mb-28 transition duration-500 hover:-translate-y-2">
                  <div className="aspect-[3/4] w-full rounded-t-full overflow-hidden shadow-2xl relative z-10 bg-gray-200 dark:bg-gray-700">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                      <span className="text-white font-display text-xl">
                        Thoughtful Design
                      </span>
                    </div>
                    <img
                      alt="Woman cooking in a bright kitchen"
                      className="w-full h-full object-cover"
                      src={image1}
                      loading="lazy" // Added for performance
                    />
                  </div>
                </div>
                <div className="group relative hidden md:block z-20 md:-mb-28 transition duration-500 hover:-translate-y-2">
                  <div className="aspect-square w-full rounded-t-full overflow-hidden shadow-2xl border-4 border-white dark:border-background-dark relative bg-gray-200 dark:bg-gray-700">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                      <span className="text-white font-display text-xl">
                        Elegant Details
                      </span>
                    </div>
                    <img
                      alt="Delicious fresh papaya salad plate"
                      className="w-full h-full object-cover"
                      src={image4}
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="group relative hidden md:block md:-mb-28 transition duration-500 hover:-translate-y-2">
                  <div className="aspect-[3/4] w-full rounded-t-full overflow-hidden shadow-2xl relative z-10 bg-gray-200 dark:bg-gray-700">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                      <span className="text-white font-display text-xl">
                       Modern Aesthetics
                      </span>
                    </div>
                    <img
                      alt="Woman chef thinking about recipes"
                      className="w-full h-full object-cover"
                      src={image3}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </header>
    </div>
  );
};

export default Header;
