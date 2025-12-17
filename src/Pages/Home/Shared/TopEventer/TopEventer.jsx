import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import "swiper/css/navigation";

// import required modules
import { Navigation} from "swiper/modules";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const teamMembers = [
  {
    name: "Eliza Rahman",
    role: "Lead Interior Designer",
    desc: "Designing elegant and functional living spaces",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Arif Hossain",
    role: "Senior Architect",
    desc: "Expert in architectural planning and space design",
    img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Sumon Khan",
    role: "Project Manager",
    desc: "Managing projects with quality and precision",
    img: "https://images.unsplash.com/photo-1728516687052-9e9ebee72f08?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Tanvir Ahmed",
    role: "3D Visual Designer",
    desc: "Creating realistic interior visualizations",
    img: "https://images.unsplash.com/photo-1731341711390-a721b4e31b6a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Sadia Islam",
    role: "Designer Specialist",
    desc: "Curating premium furniture and décor",
    img: "https://images.unsplash.com/photo-1663550910325-a3a19b6b96c4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Mehedi Hasan",
    role: "Client Manager",
    desc: "Ensuring smooth client communication",
    img: "https://images.unsplash.com/photo-1734434570358-21badf4ba1c6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const TopEventer = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);
  return (
    <div className="bg-[#213943] py-16 lg:py-20  px-6 lg:px-8">
      <div className=" mb-16 max-w-7xl mx-auto flex flex-col md:flex-row justify-between  md:items-center  gap-6 border-b border-primary/50 dark:border-white/10 pb-6">
       <div>
         <span className="text-primary font-medium tracking-widest text-sm uppercase block">
              Meet Us
            </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-primary dark:text-gray-100 leading-tight ">Our Experienced Team</h1>
        
        </div>
        <div>
          <h1 className="text-lg text-[#a0a0a0]">Our team of experienced designers brings   creativity  <br /> and style to  every project,  making your space truly unique.</h1>
        </div>
        {/* <hr /> */}
      </div>
    <div className=" text-center font-bold text-4xl max-w-7xl mx-auto ">
      <Swiper
        onSwiper={setSwiperInstance}
        slidesPerView={1}
        spaceBetween={10}
        modules={[ Navigation]}
        breakpoints={{
          240: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 40 },
          1024: { slidesPerView: 4, spaceBetween: 50 },
        }}
        className="mySwiper"
      >
        {teamMembers.map((teamMember, i) => (
          <SwiperSlide key={i}>
  <div className="group cursor-pointer">
    {/* Image Container with Overlay on Hover */}
    <div className="relative overflow-hidden rounded-xl">
      <img
        src={teamMember.img}
        alt={teamMember.name}
        className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
      />

      {/* Hover Overlay: Name & Role on Image */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pb-6 px-6 text-center transition-transform duration-500 ease-in-out group-hover:translate-y-[-1%]">
      <h1 className="text-2xl font-medium text-white translate-y-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        {teamMember.name}
      </h1>
      <h3 className="text-lg font-normal text-gray-300 mt-1 translate-y-8 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
        {teamMember.role}
      </h3>
    </div>

      {/* Dark overlay on hover */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pb-6 px-6 text-center transition-transform duration-500 ease-in-out group-hover:translate-y-[20%]" />
    </div>

    {/* Name & Role BELOW the Image (Outside) - Normal State */}
   {/* Name & Role BELOW the Image (Outside) - Normal State */}
<div className="mt-6 text-center transition-all duration-400 ease-out group-hover:-translate-y-8 group-hover:opacity-0">
  <h1 className="text-2xl font-medium text-white">
    {teamMember.name}
  </h1>
  <p className="text-lg font-normal text-gray-400 mt-1">
    {teamMember.role}
  </p>
</div>
  </div>
</SwiperSlide>

        ))}
      </Swiper>

      <div className="flex justify-center gap-8 mt-12">
        <button
          ref={prevRef}
          className="bg-white text-primary px-1 py-1 rounded-full hover:bg-primary hover:text-white"
        >
          <GrFormPrevious />
        </button>
        <button
          ref={nextRef}
          className="bg-white text-primary px-1 py-1 rounded-full hover:bg-primary hover:text-white"
        >
          <GrFormNext />
        </button>
      </div>
    </div>
    
    </div>
  );
};

export default TopEventer;
