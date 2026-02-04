import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Menu', path: '/menu' },
    { name: 'Table Booking', path: '/tableBooking' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 ">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="text-2xl md:text-4xl font-bold text-yellow-400 hover:text-yellow-300 transition-colors duration-300 dancing-script">
            Efood
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <ul className="flex items-center space-x-6 uppercase text-base font-medium">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.path}
                    className="text-white hover:text-yellow-400 transition-colors duration-300 relative group"
                  >
                    {link.name}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 group-hover:transition-all duration-300"></span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Right Icons and Button */}
            <div className="flex items-center space-x-4 ml-6 ">
              <a
                href="/login"
                className="text-white hover:text-yellow-400 transition-colors duration-300 p-2 hover:bg-gray-800 rounded-full"
                aria-label="User login"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </a>
              {/* <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                <a href="/menu" className="text-gray-900">
                  Order Online
                </a>
              </button> */}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white focus:outline-none hover:text-yellow-400 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-gray-800 rounded-lg p-4 shadow-xl border border-gray-700">
            <ul className="space-y-3 uppercase text-sm font-medium">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.path}
                    className="block text-white hover:text-yellow-400 hover:bg-gray-700 transition-all duration-300 py-2 px-3 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-700 flex flex-col space-y-3">
              <a
                href="/login"
                className="flex items-center text-white hover:text-yellow-400 hover:bg-gray-700 transition-all duration-300 py-2 px-3 rounded-md"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Login
              </a>
             
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;