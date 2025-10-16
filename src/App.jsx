import CustomCursor from "./component/CustomCursor";
import Navbar from "./component/Navbar";
import ParticlesBackground from "./component/ParticlesBackground";
import About from "./section/About";
import Contact from "./section/Contact";
import Experience from "./section/Experience";
import Footer from "./section/Footer";
import Home from "./section/Home";
import Projects from "./section/Projects";
import Skills from "./section/skills";
import Testimonials from "./section/testimonials";

function App() {
  return (
    <div div className="relative gradient text-white">
      <CustomCursor />
      {/* <ParticlesBackground /> */}
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
  );
}

export default App;
