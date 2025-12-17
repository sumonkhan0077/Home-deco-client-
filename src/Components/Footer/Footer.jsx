import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#213943] text-gray-300 py-12 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 bg-[#213943] shadow-xl ring-2 ring-black/30 pt-16 pb-16 pl-6 pr-6 rounded-2xl">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <h1 className="text-4xl font-bold text-white mb-4">JHANVI</h1>
            <p className="text-sm leading-relaxed mb-6">
              the majority have suffered alteration in some form, by injected
              humour, or randomised words
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-orange-500 transition"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-orange-500 transition"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-orange-500 transition"
              >
                <Mail size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-orange-500 transition"
              >
                <FaXTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-white text-2xl  mb-6">Address</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="text-orange-500 mt-1 flex-shrink-0"
                />
                <p>
                  1425 E 120th St. Los Angeles,
                  <br />
                  CA 90059, United States
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-orange-500 flex-shrink-0" />
                <div>
                  <p>+369 458 4739</p>
                  <p>+458 669 4568</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-orange-500 flex-shrink-0" />
                <p>jhanvi@blog.com</p>
              </div>
            </div>
          </div>

          {/* Blogs */}
          <div>
            <h3 className="text-white text-2xl mb-6">Blogs</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-orange-500 transition">
                  Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition">
                  Tourist
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition">
                  Newsletter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition">
                  Help
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition">
                  Tutorials Page
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white text-2xl mb-6">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-orange-500 transition">
                  Travel Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition">
                  Locations
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition">
                  News
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition">
                  Portfolio Detail
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-2xl mb-6">
              Newsletter
            </h3>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="youremail@gmail.com"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-white placeholder-gray-500"
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 main-btn2"
              >
                Subscribe
                <span className="text-xl">
                  <MdOutlineArrowOutward />
                </span>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© 2025 Wedesigntech Themes. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-orange-500 transition">
              Terms And Condition
            </a>
            <a href="#" className="hover:text-orange-500 transition">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
