import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Link } from "react-router";
import useAuth from "../../../../Hooks/useAuth";
import Loading from "../../../../Components/Loading/Loading";

const cards = [
  {
    title: "Full Home Decoration",
    category: "Home",
    image:
      "https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    lgSpan: 5,
  },
  {
    title: "Wedding Decoration",
    category: "Wedding",
    image:
      "https://images.unsplash.com/photo-1745573674471-e057af420757?q=80&w=1634&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    lgSpan: 7,
  },
  {
    title: "Office Setup",
    category: "Office Interior Decoration",
    image:
      "https://plus.unsplash.com/premium_photo-1661931749081-23d69ddb62d1?q=80&w=1883&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    lgSpan: 7,
  },
  {
    title: "Conference Decoration",
    category: "Seminar",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1412&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    lgSpan: 5,
  },
  {
    title: "Small Event Decoration",
    category: "Meeting ",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    lgSpan: 6,
  },
  {
    title: "Ceremony Decoration",
    category: "Party ",
    image:
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    lgSpan: 6,
  },
];
const CategoryHome = () => {
  const {loading} = useAuth();
  if(loading){
    return <Loading></Loading>
  }

  const spanClasses = {
    5: "lg:col-span-5",
    6: "lg:col-span-6",
    7: "lg:col-span-7",
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark transition-colors duration-300 antialiased ">
      <main className="max-w-7xl mx-auto px-6 py-16 lg:px-8">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6 border-b border-primary/50 dark:border-white/10 pb-6">
          <div className="max-w-2xl">
            <span className="text-secondary font-medium tracking-widest text-sm uppercase block">
              Stylish & Affordable
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-primary dark:text-gray-100 leading-tight">
              Holistic Interior Services
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

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`group relative h-[320px] overflow-hidden rounded-2xl cursor-pointer shadow-soft hover:shadow-hover transition-all duration-500
                ${spanClasses[card.lgSpan]}
              `}
            >
              <img
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                src={card.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white/80 text-sm font-light tracking-wider uppercase">
                      {card.category}
                    </span>
                  </div>
                  <h2 className="text-3xl font-display text-white">
                    {card.title}
                  </h2>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#fffaec] backdrop-blur-md flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                  <MdOutlineArrowOutward className="text-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CategoryHome;
