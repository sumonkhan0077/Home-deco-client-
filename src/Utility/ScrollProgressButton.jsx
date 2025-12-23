import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = ({ color = "#E8D5C4", bgColor = "bg-secondary" }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrollPercent);

      // Show button only if scrolled more than 100px
      setShowButton(scrollTop > 100);
    };

    window.addEventListener("scroll", calculateScrollProgress);
    calculateScrollProgress();

    return () => window.removeEventListener("scroll", calculateScrollProgress);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Circle settings
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  if (!showButton) return null; // hide button at top

  return (
    <div className="fixed bottom-8 right-8 z-500">
      <button
        onClick={scrollToTop}
        className={`relative w-10 h-10 flex items-center justify-center ${bgColor} backdrop-blur-xl rounded-full border border-white/20 group overflow-hidden shadow-2xl hover:shadow-[0_0_20px_rgba(232,213,196,0.4)] transition-all duration-500`}
        aria-label="Scroll to top"
      >
        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* SVG Circle Progress */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Background Circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-white/10"
          />
          {/* Progress Circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={color} // Dynamic color
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="drop-shadow-[0_0_8px_rgba(232,213,196,0.5)] transition-all duration-700 ease-out"
          />
        </svg>

        {/* Up Arrow Icon */}
        <FaArrowUp
          size={15}
          className={`text-white/80 group-hover:text-[${color}] transition-colors duration-300 relative z-10`}
        />
      </button>
    </div>
  );
};

export default ScrollToTopButton;
