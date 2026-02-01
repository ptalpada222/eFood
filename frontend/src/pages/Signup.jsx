import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
const Signup = () => {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Background Gradient */}
      <div className="bg-purple-900 absolute top-0 left-0 bg-gradient-to-b from-yellow-200 via-yellow-700 to-yellow-800 bottom-0 h-full w-full"></div>

      <div className="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent z-10">

        {/* Left Section */}
        <div className="flex-col flex self-center lg:px-14 sm:max-w-4xl xl:max-w-md">
          <div className="self-start hidden lg:flex flex-col text-gray-300">
            <h1 className="my-3 font-semibold text-4xl">Create Account</h1>
            <p className="pr-3 text-xl opacity-75">
              Join us today and enjoy delicious food delivered at your doorstep.
            </p>
          </div>
        </div>

        {/* Signup Card */}
        <div className="flex justify-center self-center">
          <div className="p-12 bg-white mx-auto rounded-3xl w-[450px] border border-gray-200">

            <div className="mb-7">
              <h3 className="font-semibold text-3xl  text-gray-800">Sign Up</h3>
              <p className="text-gray-400">
                Already have an account?
                <span className="font-bold  text-[#ffbe33] cursor-pointer ml-1">
                  Sign In
                </span>
              </p>
            </div>

            <div className="space-y-6">

              {/* Full Name */}
              <input
                className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                type="text"
                placeholder="Full Name"
              />

              {/* Email */}
              <input
                className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                type="email"
                placeholder="Email"
              />

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "password" : "text"}
                  placeholder="Password"
                  className="text-sm px-4 py-3 rounded-lg w-full bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-purple-400"
                />

                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-[#ffbe33]"
                >
                  {showPassword ? "👁" : "🙈"}
                </div>
              </div>

              {/* Confirm Password */}
              <input
                className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                type="password"
                placeholder="Confirm Password"
              />

              {/* Signup Button */}
              <button
                className="w-full flex justify-center bg-yellow-400 hover:bg-[#ffbe33] text-gray-100 p-3 rounded-lg tracking-wide font-semibold transition duration-500"
              >
                Create Account
              </button>

              {/* Divider */}
              <div className="flex items-center justify-center space-x-2 my-5">
                <span className="h-px w-16 bg-gray-200"></span>
                <span className="text-gray-400">or</span>
                <span className="h-px w-16 bg-gray-200"></span>
              </div>

              {/* Social Signup */}
              <div className="flex gap-4">
   <div className="flex flex-row  w-full border rounded-lg transition p-3 border-gray-300 hover:bg-[#ffbe33] hover:text-white">
                <FcGoogle size={30} className="ml-12"  /> 
                 <button className="mx-20">
         Google
                </button>
              
               

              </div>

              </div>

            </div>

            {/* Footer Text */}
            <div className="mt-7 text-center text-gray-400 text-xs">
              Copyright © 2025-2026 e-food
            </div>

          </div>
        </div>

      </div>

      {/* Bottom SVG Wave */}
      <svg
        className="absolute bottom-0 left-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#fff"
          fillOpacity="1"
          d="M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96L1440,320L0,320Z"
        />
      </svg>

    </div>
  );
};

export default Signup;
