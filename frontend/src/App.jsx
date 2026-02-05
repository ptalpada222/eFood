import React from "react";
import Footer from "./Components/footer.jsx";
import About from "./Components/about.jsx";
import Navbar from "./Components/navbar.jsx";
import HeroSlider from "./Components/Hero.jsx";
import Services from "./Components/Services.jsx";

function App() {
  return (
    <>
      <div className="">
        <Navbar />
        <HeroSlider/>
        <Services/>
        <About />
        <Footer />
      </div>
    </>
  );
}

export default App;
