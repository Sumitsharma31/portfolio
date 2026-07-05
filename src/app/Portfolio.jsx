"use client";

import { useState } from "react";
import CustomCursor from "../component/CustomCursor";
import Navbar from "../component/Navbar";
import About from "../section/About";
import Contact from "../section/Contact";
import Footer from "../section/Footer";
import Home from "../section/Home";
import Projects from "../section/Projects";
import Skills from "../section/Skills";
import IntroAnimation from "../component/IntroAnimation";
import WhatsAppButton from "../component/WhatsAppButton";

export default function Page() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {/* 1. Show Intro Animation if intro is NOT done */}
      {!introDone && <IntroAnimation onFinish={() => setIntroDone(true)} />}

      {/* 2. Show Main Website AND ChatBot only AFTER intro is done */}
      {introDone && (
        <>
          <div className="relative gradient text-white">
            <CustomCursor />
            <Navbar />
            <Home />
            <About />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
          </div>
          {/* The WhatsAppButton component fetches and displays the WhatsApp link dynamically */}
          <WhatsAppButton />
        </>
      )}
    </>
  );
}
