import React, { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ChevronUp,
} from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      {/* Contact Us Section */}
      <section className="text-center border-t-56 font-efood py-10 px-4 md:py-12 bg-white my-8 md:my-12 mx-auto w-[85%] max-w-7xl shadow-lg rounded-lg">
        <h2 className="text-[#ffb03b] mb-3 text-10xl font-bold md:text-3xl tracking-wide ">
          Contact Us
        </h2>
        <h3 className="text-[#2c3e50] mb-8 text-lg md:text-xl font-normal">
          Contact For Any Query
        </h3>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row justify-evenly mb-8 md:mb-12 gap-6">
          {[
            { title: "Booking", email: "book@efood.com" },
            { title: "General", email: "info@efood.com" },
            { title: "Technical", email: "tech@efood.com" },
          ].map((item, index) => (
            <div key={index} className="text-center w-full md:w-[30%]">
              <h4 className="text-[#ffb03b] mb-3 text-lg font-medium">
                {item.title}
              </h4>
              <p className="text-[#2c3e50] flex items-center justify-center">
                <Mail className="w-4 h-4 text-[#ffb03b] mr-2" />
                <a
                  href={`mailto:${item.email}`}
                  className="hover:text-[#ffb03b] transition-colors"
                >
                  {item.email}
                </a>
              </p>
            </div>
          ))}
        </div>

        {/* Map and Form */}
        <div className="flex flex-col lg:flex-row justify-evenly items-center mt-8 gap-8 lg:gap-10">
          {/* Map */}
          <div className="w-full lg:w-auto">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3354.6234811290324!2d72.12141277473268!3d21.703516164262755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395f57414289983b%3A0xf295d6b8d9e2fa2c!2sShantilal%20Shah%20Engineering%20College!5e1!3m2!1sen!2sin!4v1727971351257!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full max-w-[600px]"
                title="Restaurant Location"
              />
            </div>
          </div>

          {/* Form */}
          <div className="w-full max-w-[300px] md:max-w-[400px]">
            <form onSubmit={handleSubmit} className="flex flex-col">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="px-3 py-3 mb-4 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#ffb03b] focus:ring-1 focus:ring-[#ffb03b]"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="px-3 py-3 mb-4 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#ffb03b] focus:ring-1 focus:ring-[#ffb03b]"
              />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                className="px-3 py-3 mb-4 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#ffb03b] focus:ring-1 focus:ring-[#ffb03b]"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                required
                rows="5"
                className="px-3 py-3 mb-4 border border-gray-300 rounded text-sm resize-none focus:outline-none focus:border-[#ffb03b] focus:ring-1 focus:ring-[#ffb03b]"
              />
              <button
                type="submit"
                className="py-3 bg-[#ffb03b] text-white rounded text-base cursor-pointer transition-colors hover:bg-[#e69500]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
