import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt ,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaPinterest,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 md:py-10">
      <div className="container mx-auto px-2 sm:px-6 lg:px-2">
        <div className="flex flex-col lg:flex-row justify-between space-y-10 lg:space-y-0">
          
          {/* Contact Us Section */}
          <div className="w-full lg:w-1/3">
            <div className="footer_contact">
              <h4 className="text-2xl md:text-3xl font-bold text-center lg:text-left mb-6 dancing-script hover:text-yellow-400 transition-colors duration-300 cursor-pointer">
                Contact Us
              </h4>
              <div className="md:space-y-2 lg:space-y-3">
                <a
                  href="#"
                  className=" flex items-center justify-center lg:justify-start space-x-3 hover:text-yellow-400 transition-colors duration-300"
                >
                  <FaMapMarkerAlt className="text-lg md:text-xl" />
                  <span className="text-sm md:text-base">Bhavnagar</span>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center lg:justify-start space-x-3 hover:text-yellow-400 transition-colors duration-300"
                >
                  <FaPhoneAlt  className="text-lg md:text-xl" />
                  <span className="text-sm md:text-base">Call +91 1234567890</span>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center lg:justify-start space-x-3 hover:text-yellow-400 transition-colors duration-300"
                >
                  <FaEnvelope className="text-lg md:text-xl" />
                  <span className="text-sm md:text-base">efood@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Logo & Social Section - Center aligned for mobile/tablet */}
          <div className="w-full lg:w-1/3">
            <div className="footer_detail flex flex-col items-center lg:items-start">
              <a
                href="/"
                className="lg:mx-36 text-3xl md:text-4xl font-bold dancing-script hover:text-yellow-300 transition-colors duration-300 mb-4"
              >
                E-food
              </a>
              <p className="text-gray-300 leading-relaxed lg:text-center text-center mb-2 max-w-md text-sm md:text-base px-4 lg:px-0">
                Good food is the foundation of genuine happiness. We bring joy
                to your doorstep with delicious meals made with love and the
                freshest ingredients.
              </p>
              <div className="footer_social flex justify-center lg:space-x-2 md:space-x-5 space-x-2 lg:mx-30">
                <a
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                >
                  <FaFacebook className="text-2xl md:text-2xl" />
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                >
                  <FaTwitter className="text-2xl md:text-2xl" />
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                >
                  <FaLinkedin className="text-2xl md:text-2xl" />
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                >
                  <FaInstagram className="text-2xl md:text-2xl" />
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                >
                  <FaPinterest className="text-2xl md:text-2xl" />
                </a>
              </div>
            </div>
          </div>

          {/* Opening Hours Section */}
          <div className="w-full lg:w-1/3 md:mx-4">
            <div className="flex flex-col items-center lg:items-end">
              <h4 className="lg:mr-2 text-2xl md:text-3xl font-bold dancing-script hover:text-yellow-400 transition-colors duration-300 cursor-pointer mb-6 text-center lg:text-right">
                Opening Hours
              </h4>
              <div className="lg:mt-4 text-center">
                <p className="text-gray-300 text-lg md:text-xl font-medium">Everyday</p>
                <p className="text-gray-300 text-base md:text-lg mt-2">
                  10.00 AM - 10.00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="mt-8 pt-4 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm md:text-base text-center">
              {'\u00A9'} {new Date().getFullYear()} E-food. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm md:text-base transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm md:text-base transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm md:text-base transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;