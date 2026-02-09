import React from "react";
import {
  FaUserTie,
  FaUtensils,
  FaCartPlus,
  FaHeadset,
} from "react-icons/fa";

const services = [
  {
    icon: <FaUserTie />,
    title: "Master Chefs",
    text: "Expert chefs preparing delicious meals with care.",
  },
  {
    icon: <FaUtensils />,
    title: "Quality Food",
    text: "Fresh ingredients and premium-quality dishes.",
  },
  {
    icon: <FaCartPlus />,
    title: "Online Order",
    text: "Quick and easy online food ordering.",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Service",
    text: "Always available to serve you better.",
  },
];

export default function Services() {
  return (
    <section className="py-16 bg-[#0f0f0f] text-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <h1
          className="text-center text-6xl mb-12 text-[#ffbe33]"
          style={{ fontFamily: "Dancing Script, cursive" }}
        >
          Services
        </h1>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#2f37458f] rounded-xl p-6 text-center
                         transition-all duration-300
                         hover:bg-[#ffbe33] hover:-translate-y-3
                         cursor-pointer group"
            >
              <div className="text-4xl mb-4 text-[#ffbe33]
                              transition-all duration-300
                              group-hover:text-black
                              group-hover:scale-110">
                {service.icon}
              </div>

              <h5 className="text-lg font-semibold mb-2
                             group-hover:text-black">
                {service.title}
              </h5>

              <p className="text-sm text-gray-400
                            group-hover:text-black">
                {service.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
