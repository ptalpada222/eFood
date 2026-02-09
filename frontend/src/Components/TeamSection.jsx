import React, { useState } from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";

// Import images
import team1 from "../assets/images/team-1.jpg";
import team2 from "../assets/images/team-2.jpg";
import team3 from "../assets/images/team-3.jpg";
import team4 from "../assets/images/team-4.jpg";

const TeamSection = () => {
  const [hoveredId, setHoveredId] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: "Jamie Oliver",
      role: "Executive chef",
      image: team1,
    },
    {
      id: 2,
      name: "Gordan Ramsay",
      role: "Fry chef",
      image: team2,
    },
    {
      id: 3,
      name: "Sanjay Thumma",
      role: "Sous chef",
      image: team3,
    },
    {
      id: 4,
      name: "Rick Stein",
      role: "Vegetable chef",
      image: team4,
    },
  ];

  return (
    <div className="bg-[#222222] font-efood">
      <div className="container mx-auto px-4 py-12 md:py-10 lg:py-10">
        <div className="text-center mb-10 md:mb-10">
          <h5
            className="dancing-script text-3xl md:text-4xl lg:text-6xl text-center font-normal mb-4"
            style={{ color: "#ffbe33" }}
          >
            <b>Team Members</b>
          </h5>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8">
            Our Master Chefs
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="team-item text-center bg-[#252525] rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 block"
              onMouseEnter={() => setHoveredId(member.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="rounded-full overflow-hidden mx-auto w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 my-6">
                <img
                  className="w-full h-full object-cover"
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                />
              </div>
              <h5 className="text-xl md:text-2xl font-bold text-white mb-1">
                {member.name}
              </h5>
              <p className="text-yellow-400 mb-4">{member.role}</p>
              
              <div className={`flex justify-center space-x-3 mt-4 transition-all duration-300 ${
                hoveredId === member.id 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4 h-0 overflow-hidden'
              }`}>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center transition-colors duration-300 transform hover:scale-110"
                  aria-label={`${member.name} Facebook`}
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center transition-colors duration-300 transform hover:scale-110"
                  aria-label={`${member.name} Twitter`}
                >
                  <Twitter className="w-5 h-5 text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center transition-colors duration-300 transform hover:scale-110"
                  aria-label={`${member.name} Instagram`}
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;