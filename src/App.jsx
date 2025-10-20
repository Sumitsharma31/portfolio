import { useState } from "react";
import CustomCursor from "./component/CustomCursor";
import Navbar from "./component/Navbar";

import About from "./section/About";
import Contact from "./section/Contact";
import Experience from "./section/Experience";
import Footer from "./section/Footer";
import Home from "./section/Home";
import Projects from "./section/Projects";
import Skills from "./section/Skills";
import Testimonials from "./section/testimonials";
import IntroAnimation from "./component/IntroAnimation";

function App() {
  const [introDone, setIntroDone] = useState(false);
  return (
    <>
      {!introDone && <IntroAnimation onFinish={() => setIntroDone(true)} />}
      {introDone && (
        <div div className="relative gradient text-white">
          <CustomCursor />

          <Navbar />
          <Home />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Testimonials />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
