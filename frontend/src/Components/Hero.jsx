import React from "react";
import { useEffect, useRef, useState } from "react";
import hero from "../assets/hero.jpg";

const contents = [
  {
    title: "Fresh Food, Fast Delivery",
    text: "Hot, fresh meals delivered straight to your door.",
    btnText: "Order Online",
    link: "/menu",
  },
  {
    title: "Flavors You’ll Love",
    text: "Discover delicious dishes made with premium ingredients.",
    btnText: "View Menu",
    link: "/menu",
  },
  {
    title: "Book Your Table Instantly",
    text: "Reserve your spot and enjoy a perfect dining experience.",
    btnText: "Book a Table",
    link: "/tableBooking",
  },
];


export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState("center"); // 👈 start visible
  const isAnimating = useRef(false);
  const isFirstLoad = useRef(true);

  const SLIDE_DURATION =800;
  const DISPLAY_TIME = 4000;

  const runSlide = (nextIndex) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    setPhase("exit");

    setTimeout(() => {
      setIndex(nextIndex);
      setPhase("enter");
    }, SLIDE_DURATION);

    setTimeout(() => {
      setPhase("center");
      isAnimating.current = false;
    }, SLIDE_DURATION * 2);
  };

  // AUTO SLIDE
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    const timer = setTimeout(() => {
      runSlide((index + 1) % contents.length);
    }, DISPLAY_TIME);

    return () => clearTimeout(timer);
  }, [index]);

  const next = () => runSlide((index + 1) % contents.length);
  const prev = () =>
    runSlide((index - 1 + contents.length) % contents.length);

  const animationClass = {
    enter: "translate-x-full opacity-0",
    center: "translate-x-0 opacity-100",
    exit: "-translate-x-full opacity-0",
  };

  const item = contents[index];

  return (
    <div
      className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh]
                 bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${hero})` }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 text-white overflow-hidden">
        <div
          className={`max-w-2xl text-center transform transition-all
            duration-[800ms] ease-in-out ${animationClass[phase]}`}
        >
          <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold dancing-script text-[#ffbe33]">
            {item.title}
          </h2>

          <p className="mt-4 text-2xl md:text-xl">
            {item.text}
          </p>

          <a
            href={item.link}
            className="inline-block mt-6 bg-[#ffbe33]
                       px-6 py-2 rounded-full text-white"
          >
            {item.btnText}
          </a>
        </div>
      </div>

      {/* LEFT */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20
                   bg-black/60 text-white p-3 rounded-full hover:bg-black"
      >
        ❮
      </button>

      {/* RIGHT */}
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20
                   bg-black/60 text-white p-3 rounded-full hover:bg-black"
      >
        ❯
      </button>
    </div>
  );
}
