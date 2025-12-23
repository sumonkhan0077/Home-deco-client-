import React from "react";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineEmail, MdOutlineLocalPhone } from "react-icons/md";
import AnimatedSection from "../../Utility/AnimatedSection";

const Contract = () => {
  return (
    <div>
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center ">
        <div
          className={` max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16`}
        >
          <AnimatedSection variant="fadeLeft">

          {/* --- LEFT SIDE: Info & Context --- */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <AnimatedSection variant="fadeLeft">

              <span className="text-secondary font-normal uppercase tracking-wider text-sm mb-2 block">
                Contact Support
              </span>
              <h1 className="text-4xl md:text-5xl font-normal text-primary  leading-none">
                Let’s build something <br /> amazing together.
              </h1>
      </AnimatedSection>
            </div>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="bg-[#507662]/10 p-3 rounded-full text-secondary text-2xl">
                  <MdOutlineEmail />
                </div>
                <div>
                  <h3 className="text-xl font-normal text-gray-900">
                    Email Us
                  </h3>
                  <p className="text-gray-500">decornest@deco.com</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="bg-[#507662]/10 p-3 rounded-full text-secondary text-2xl">
                  <MdOutlineLocalPhone />
                </div>
                <div>
                  <h3 className="text-xl font-normal text-gray-900">Call Us</h3>
                  <p className="text-gray-500">+880123456-7890</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="bg-[#507662]/10 p-3 rounded-full text-secondary text-3xl">
                  <FiMapPin />
                </div>
                <div>
                  <h3 className="text-xl font-normal text-gray-900">
                    Visit Head Quarter
                  </h3>
                  <p className="text-gray-500">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>
      </AnimatedSection>

  <AnimatedSection variants="fadeRight">

          {/* --- RIGHT SIDE: Contact Form --- */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10">
            <form className="space-y-6">
              <div className="">
                {/* Name */}
                <div className="mb-6">
                  <label className="block text-lg font-normal text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Donald Trump"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-lg font-normal text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="trump@example.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-lg font-normal text-gray-700 mb-1">
                  Subject
                </label>
                <select
                  name="subject"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                >
                  <option value="">Select a topic</option>
                  <option value="Order Status">Order Status</option>
                  <option value="Custom Order">Decorator Request</option>
                  <option value="Returns">Cancel & Refunds</option>
                  <option value="Other">Other Inquiry</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-lg font-normal text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="How can we help you today?"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 bg-primary text-white py-4 rounded-lg font-normal text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <span>Send Message</span>
              </button>
            </form>
          </div>
      </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default Contract;
