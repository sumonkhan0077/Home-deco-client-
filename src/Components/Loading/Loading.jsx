import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 flex flex-col items-center justify-center px-6">
      {/* Logo & Name */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-12"
      >
        {/* Simple Nest Icon (using SVG) */}
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="inline-block mb-6"
        >
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Nest Shape */}
            <motion.path
              d="M60 20 C30 40, 20 70, 30 100 C50 90, 70 90, 90 100 C100 70, 90 40, 60 20"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            {/* Leaves/Decor Elements */}
            <motion.circle cx="40" cy="50" r="8" fill="#10b981" opacity="0.8"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
            />
            <motion.circle cx="80" cy="45" r="6" fill="#3b82f6" opacity="0.8"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2.8, delay: 1 }}
            />
            <motion.circle cx="60" cy="35" r="7" fill="#f59e0b" opacity="0.8"
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 3.2, delay: 0.2 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          DecorNest
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          Transforming Spaces with Elegance
        </motion.p>
      </motion.div>

      {/* Loading Dots */}
      <motion.div className="flex gap-3">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-4 h-4 bg-primary rounded-full"
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Subtle Text */}
      <motion.p
        className="absolute bottom-10 text-sm text-gray-500 dark:text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        Loading your beautiful home experience...
      </motion.p>
    </div>
  );
};

export default Loading;