import React from 'react';
import heroImage from '../assets/images/hero.png';

const HeroSectionSpinner = () => {
  return (
    <div className="bg-[#000000e7] py-14 px-4 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-20">
          {/* Text and button on the left side */}
          <div className="lg:w-1/2 text-white md:text-center">
            <h2 className="text-3xl dancing-script md:text-4xl lg:text-6xl mb-6 md:mb-8">
              Enjoy Our Delicious Meal
            </h2>
            <p className="text-gray-300 mb-8 md:mb-10 text-base font-efood md:text-lg leading-relaxed">
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
              Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
              sed stet lorem sit clita duo justo magna dolore erat amet
            </p>
            <a 
              href="/menu" 
              className="inline-block bg-[#ffbe33] hover:bg-[#e6a72a] text-white font-semibold px-6 py-3 md:px-8 md:py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Order Now
            </a>
          </div>

          {/* Rotating image on the right side */}
          <div className="lg:w-1/2 flex justify-center mt-8 lg:mt-0 ">
            <div className="animate-[spin_30s_linear_infinite] w-full max-w-sm md:max-w-md lg:max-w-full">
              <img
                src={heroImage}
                alt="Delicious Meal"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionSpinner;