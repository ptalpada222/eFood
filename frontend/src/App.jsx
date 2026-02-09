import React from "react";
import Footer from "./Components/footer.jsx";
// import About from "./Components/about.jsx";
import Navbar from "./Components/navbar.jsx";
import Testimonial from "./Components/Testimonial.jsx";
import TeamSection from "./Components/TeamSection.jsx";

function App() {
  return (
    <>
      <div className="">
        <Navbar />
        <TeamSection />
        <Testimonial />
        <Footer />
      </div>
    </>
  );
}

export default App;
