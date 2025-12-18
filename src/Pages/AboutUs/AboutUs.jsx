import React from 'react';
import { motion } from 'framer-motion';
import Logo from '../../Components/Logo/Logo';

const About = () => {
  return (
    <section className="py-16 md:py-24 bg-[#FFFAEC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl  tracking-tight text-primary"
            
          >
            About DecorNest
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-4 text-xl md:text-2xl font-light"
            style={{ color: '#213943' }}
          >
            Transforming Spaces & Celebrating Moments
          </motion.p>
        </div>

        {/* Content and Gallery */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <p className="text-lg  leading-relaxed " >
              At <Logo/> we turn ordinary spaces into extraordinary experiences with our passion for creative design and meticulous attention to detail. Whether it's transforming your house into a dream home or crafting unforgettable setups for special events, we blend modern trends with personalized charm to reflect your unique vision.
            </p>
            <p className="text-lg leading-relaxed" >
              From elegant home interiors and cozy living spaces to vibrant birthday celebrations, luxurious wedding ceremonies, joyful anniversaries, and sophisticated corporate events – our expert team uses premium materials and innovative ideas to bring every occasion to life. We prioritize your preferences, ensuring each decoration is functional, beautiful, and perfectly tailored to you.
            </p>
            <p className="text-lg leading-relaxed">
              Join us at DocorNest to reimagine your moments. Let’s create spaces and events where memories are made, comfort meets celebration, and every detail tells your story.
            </p>
            <div className="pt-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/services"
                className="inline-block main-btn2 font-normal"
                
              >
                Explore Our Services
              </motion.a>
            </div>
          </motion.div>

          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="grid grid-cols-2 gap-4"
          >
            <motion.img
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.4 }}
              src="https://hips.hearstapps.com/hmg-prod/images/edc080123reddkaihoi-009-645aba4daf6e1.jpg?crop=0.919749189917098xw:1xh;center,top&resize=1200:*"
              alt="Luxury Living Room"
              className="w-full h-48 md:h-64 object-cover rounded-lg shadow-md"
            />
            <motion.img
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.4 }}
              src="https://www.andacademy.com/resources/wp-content/uploads/2024/09/feature-4.webp"
              alt="Modern Living Room"
              className="w-full h-48 md:h-64 object-cover rounded-lg shadow-md"
            />
            <motion.img
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.4 }}
              src="https://www.essentialhome.eu/blog/wp-content/uploads/2023/09/113-1.png"
              alt="Cozy Bedroom"
              className="w-full h-48 md:h-64 object-cover rounded-lg shadow-md"
            />
            <motion.img
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.4 }}
              src="https://media.architecturaldigest.com/photos/5eac5fa22105f13b72dede45/4:3/w_1420,h_1065,c_limit/111LexowAve_Aug18-1074.jpg"
              alt="Elegant Bedroom"
              className="w-full h-48 md:h-64 object-cover rounded-lg shadow-md"
            />
          
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;