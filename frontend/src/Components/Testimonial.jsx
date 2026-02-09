import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Import images
import testimonial1 from '../assets/images/testimonial-1.jpg';
import testimonial2 from '../assets/images/testimonial-2.jpg';
import testimonial3 from '../assets/images/testimonial-3.jpg';
import testimonial4 from '../assets/images/testimonial-4.jpg';

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      quote: "Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam",
      name: "Priya",
      role: "Student",
      image: testimonial1
    },
    {
      id: 2,
      quote: "Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam",
      name: "Rahul",
      role: "Bank Employee",
      image: testimonial2
    },
    {
      id: 3,
      quote: "Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam",
      name: "Riyan",
      role: "Engineer",
      image: testimonial3
    },
    {
      id: 4,
      quote: "Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam",
      name: "Nancy",
      role: "Manager",
      image: testimonial4
    }
  ];

  return (
    <div className="py-16 md:py-20 lg:py-8 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
      <div className="container  mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading Section */}
        <div className="text-center mb-12 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          <h5 
            className="text-3xl md:text-4xl font-normal text-center mb-4" 
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            <span className="text-[#ffbe33] font-bold">Testimonial</span>
          </h5>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-8">
            Our Clients Say!!!
          </h1>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true} // Infinite loop
          autoplay={{ 
            delay: 3000, 
            disableOnInteraction: false,
            pauseOnMouseEnter: true // Optional: pause on hover
          }}
          pagination={{ 
            clickable: true,
            dynamicBullets: true, // Dots expand/shrink based on active slide
            el: '.testimonial-pagination' // Custom pagination container
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="testimonial-swiper pb-12" // Added padding for dots
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-transparent border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 h-full mx-2">
                <FaQuoteLeft className="text-yellow-500 text-2xl mb-4" />
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {testimonial.quote}
                </p>
                <div className="flex items-center">
                  <img
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    src={testimonial.image}
                    alt={testimonial.name}
                    loading="lazy"
                  />
                  <div className="ml-4">
                    <h5 className="font-semibold text-gray-800 mb-1">
                      {testimonial.name}
                    </h5>
                    <small className="text-gray-500 text-sm">
                      {testimonial.role}
                    </small>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          
          {/* Custom Pagination Container - Positioned properly under carousel */}
          <div className="testimonial-pagination mt-6 !relative !bottom-0 flex justify-center items-center"></div>
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;