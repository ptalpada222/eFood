import React from "react";
import {
  Star,
  IndianRupee,
  Award,
  Clock,
  MapPin,
  Users,
  ChefHat,
  Leaf,
  Wine,
  Calendar,
  Phone,
  Mail,
  Utensils,
} from "lucide-react";

const AboutPage = () => {
  const signatureDishes = [
    {
      id: 1,
      name: "Black Truffle Risotto",
      description:
        "Carnaroli rice with seasonal black truffle, aged Parmigiano, and white wine reduction",
      image:
        "https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "34",
      rating: 4.9,
      tags: ["Seasonal", "Signature"],
    },
    {
      id: 2,
      name: "Herb-Crusted Lamb Rack",
      description:
        "New Zealand lamb with rosemary crust, mint jus, and roasted root vegetables",
      image:
        "https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "42",
      rating: 4.8,
      tags: ["Premium", "Chef's Special"],
    },
    {
      id: 3,
      name: "Chocolate Sphere",
      description:
        "Dark chocolate sphere with caramelized hazelnuts and gold leaf decoration",
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "18",
      rating: 5.0,
      tags: ["Artisan", "Award-winning"],
    },
  ];

  const features = [
    {
      icon: <Award />,
      title: "14+",
      description: "Years of Excellence",
    },
    {
      icon: <ChefHat />,
      title: "25+",
      description: "Expert Chefs",
    },
    {
      icon: <Users />,
      title: "10k+",
      description: "Happy Customers",
    },
    {
      icon: <Utensils />,
      title: "100+",
      description: "Signature Dishes    ",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section with Background Image */}
      <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/80 to-gray-900/90"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-6 py-3 mb-8 backdrop-blur-sm">
            <Award className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-300 font-medium">
              MICHELIN RECOMMENDED 2026
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            <span className="text-yellow-400 dancing-script text-9xl">
              Efood
            </span>{" "}
            The
            <span className="block text-white mt-2">Extraordinary</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Every dish tells a story of passion and perfection, Welcome to an
            unforgettable dining experience at{" "}
            <span className="text-yellow-300 font-semibold dancing-script">
              Efood
            </span>
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 border-2 border-yellow-500 text-yellow-400   font-bold rounded-lg hover:bg-yellow-500/10 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Reserve Your Table
            </button>
            <button className="px-8 py-4 border-2 border-yellow-500 text-yellow-400 font-bold rounded-lg hover:bg-yellow-500/10 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              View Menu
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-yellow-500/30 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-yellow-400">{feature.icon}</div>
                </div>
                <h3 className="text-4xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-xl">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900"></div>
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-16 h-px bg-yellow-500"></div>
                <span className="text-yellow-400 font-semibold tracking-widest text-2xl">
                  OUR JOURNEY
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">
                Crafting Memories Since{" "}
                <span className="text-yellow-400">2010</span>
              </h2>

              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  Born from a passion for exceptional cuisine and genuine
                  hospitality, Epicurean Haven has evolved from a humble
                  neighborhood gem into an award-winning culinary destination.
                  Our journey is rooted in Chef Marco's vision of creating a
                  space where food becomes an experience.
                </p>
                <p className="text-lg leading-relaxed">
                  We believe in the harmony of flavors, the artistry of
                  presentation, and the warmth of genuine service. Every
                  ingredient tells a story, every dish is a canvas, and every
                  guest becomes part of our extended family.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-6">
                <div>
                  <div className="text-4xl font-bold text-yellow-400">
                    14+
                  </div>
                  <div className="text-gray-400">Years of Excellence</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-yellow-400">
                    150+
                  </div>
                  <div className="text-gray-400">Local Partnerships</div>
                </div>
              </div>
            </div>

            <div className="relative lg:block md:hidden sm:hidden">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl text-lg">
                <img
                  src="https://images.unsplash.com/photo-1554679665-f5537f187268?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Restaurant ambiance"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
              </div>

              {/* Decorative Frame */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-t-2 border-r-2 border-yellow-500/30"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 border-b-2 border-l-2 border-yellow-500/30"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Signature Dishes */}
      <div className="py-20 px-4 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-12 h-px bg-yellow-500"></div>
              <span className="text-yellow-400 font-semibold tracking-widest">
                SIGNATURE CREATIONS
              </span>
              <div className="w-12 h-px bg-yellow-500"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Culinary <span className="text-yellow-400">Masterpieces</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Each dish is carefully crafted using seasonal ingredients and
              traditional techniques with a modern twist
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {signatureDishes.map((dish) => (
              <div
                key={dish.id}
                className="group bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-yellow-500/50 transition-all duration-500 hover:transform hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-yellow-500 text-black font-bold px-3 py-2 rounded-full">
                   <IndianRupee className="w-4 h-4 inline-block" />
                  {dish.price}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < dish.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-300">
                        {dish.rating}/5
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex gap-2 mb-3">
                    {dish.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-yellow-500/10 text-yellow-400 text-xs rounded-full border border-yellow-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {dish.name}
                  </h3>
                  <p className="text-gray-400 mb-4">{dish.description}</p>

                  <button className="w-full py-3 border border-yellow-500/30 text-yellow-400 rounded-lg hover:bg-yellow-500/10 transition-colors duration-300 font-medium">
                    Add to Reservation
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
