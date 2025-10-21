import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowRight,
  FaArrowLeft,
  FaGithub,
  FaExternalLinkAlt,
  FaCloud,
  FaHotel,
} from "react-icons/fa";
import { SiCodechef } from "react-icons/si";

const Projects = () => {
  // Project data array (No changes)
  const projects = [
    {
      id: 1,
      title: "AI Recipe Generator",
      description:
        "Smart recipe suggestions powered by AI, creating personalized meal plans based on your preferences and dietary needs.",
      image:
        "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&q=80",
      gradient: "from-emerald-400 to-cyan-400",
      icon: <SiCodechef className="text-4xl" />,
      technologies: ["React", "OpenAI API", "Tailwind"],
      link: "https://sumitsharma31.github.io/AI-Recipe-Generator/",
      srcLink: "https://github.com/Sumitsharma31/AI-Recipe-Generator",
      color: "emerald",
    },
    {
      id: 2,
      title: "Weather App",
      description:
        "Real-time weather forecasting with beautiful visualizations and accurate predictions for locations worldwide.",
      image:
        "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&q=80",
      gradient: "from-cyan-400 to-blue-500",
      icon: <FaCloud className="text-4xl" />,
      technologies: ["React", "Tailwind", "Weather API"],
      link: "https://sumitsharma31.github.io/Wether-App/",
      srcLink: "https://github.com/Sumitsharma31/Wether-App",
      color: "cyan",
    },
    {
      id: 3,
      title: "Hotel Room Management System",
      description:
        "Comprehensive hotel management solution with booking, inventory, and customer relationship features.",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      gradient: "from-purple-400 to-pink-400",
      icon: <FaHotel className="text-4xl" />,
      technologies: ["React", "Firebase", "Tailwind"],
      link: "https://sumitsharma31.github.io/hotel-room-management/",
      srcLink:
        "https://github.com/Sumitsharma31/hotel-room-management/tree/main/hotel-management-system",
      color: "purple",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);

  // --- KEPT FIX for scroll jump ---
  useEffect(() => {
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // --- RE-ADDED Auto-play timer ---
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        // This is the auto-play logic
        setCurrentIndex((prevIndex) =>
          prevIndex === projects.length - 1 ? 0 : prevIndex + 1
        );
      }, 7000); // 7 seconds
    }
    // Cleanup function to clear the interval
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, projects.length]); // Re-run when auto-play is toggled

  // --- RE-ADDED Reset timer function ---
  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsAutoPlaying(false);
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 100);
  };

  // --- RENAMED to 'Manual' ---
  const handleManualNext = () => {
    resetTimer(); // Reset timer on manual click
    setCurrentIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleManualPrevious = () => {
    resetTimer(); // Reset timer on manual click
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index) => {
    resetTimer(); // Reset timer on manual click
    setCurrentIndex(index);
  };
  // ---

  // --- Fade Variants ---
  const fadeVariants = {
    enter: {
      opacity: 0,
    },
    center: {
      zIndex: 1,
      opacity: 1,
    },
    exit: {
      zIndex: 0,
      opacity: 0,
    },
  };

  const currentProject = projects[currentIndex];

  return (
    <div className="projects-section min-h-screen bg-gradient-to-br from-[#2c3336] via-[#0d1c2b] to-[#07181e] py-12 px-4">
      <div className="max-w-6xl mx-auto ">
        {/* Header (No changes) */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
          >
            Featured Projects
          </motion.h2>
          <motion.p
            className="text-gray-400 text-lg"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
          >
            Explore my recent work and innovations
          </motion.p>
        </motion.div>

        {/* Main Slider Container */}
        <div className="relative">
          {/* Previous Button (No changes) */}
          <motion.button
            onClick={handleManualPrevious}
            className="absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 z-30 bg-white/10 backdrop-blur-sm p-3 md:p-4 rounded-full text-white hover:bg-white/20 transition-all duration-300 group hidden lg:block"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaArrowLeft className="text-xl md:text-2xl group-hover:-translate-x-1 transition-transform" />
          </motion.button>

          {/* Next Button (No changes) */}
          <motion.button
            onClick={handleManualNext}
            className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 z-30 bg-white/10 backdrop-blur-sm p-3 md:p-4 rounded-full text-white hover:bg-white/20 transition-all duration-300 group hidden lg:block"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaArrowRight className="text-xl md:text-2xl group-hover:translate-x-1 transition-transform" />
          </motion.button>

          {/* ============================================================
            == RESPONSIVE FIX APPLIED HERE ==
            ============================================================
            
            This is now mobile-first. It sets a height for mobile,
            then a new height for 'sm' screens, and another for 'md'.
            
            - min-h-[780px] = Default for mobile (buttons are stacked)
            - sm:min-h-[650px] = For 'sm' screens and up
            - md:min-h-[600px] = For 'md' screens and up
            
            **ADJUST THESE VALUES** to fit your tallest card.
          */}
          <div className="relative min-h-[780px] sm:min-h-[650px] md:min-h-[600px]">
            <AnimatePresence>
              <motion.div
                key={currentIndex}
                variants={fadeVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  opacity: { duration: 0.4 },
                }}
                tabIndex="-1" // KEPT: Prevents focus jump
                className="w-full absolute top-0 left-0" // KEPT: Prevents layout shift
              >
                {/* Project Card (No changes below)
                  This card is already responsive with 'md:' and 'sm:' classes.
                */}
                <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50">
                  {/* Card Header with Gradient */}
                  <div
                    className={`h-48 md:h-56 bg-gradient-to-br ${currentProject.gradient} relative overflow-hidden`}
                  >
                    {/* ... (no changes inside card) ... */}
                    <motion.div
                      className="absolute inset-0 opacity-30 "
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: "60px 60px",
                      }}
                    />
                    <motion.div className="absolute top-6 right-6 text-white/80">
                      {currentProject.icon}
                    </motion.div>
                    {currentProject.image && (
                      <img
                        src={currentProject.image}
                        alt={currentProject.title}
                        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
                      />
                    )}
                  </div>

                  {/* Card Content - FULLY VISIBLE */}
                  <div className="p-6 md:p-8">
                    <motion.h3
                      className="text-2xl md:text-3xl font-bold text-white mb-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {currentProject.title}
                    </motion.h3>

                    <motion.p
                      className="text-gray-300 mb-6 text-base md:text-lg leading-relaxed"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {currentProject.description}
                    </motion.p>

                    {/* Technologies */}
                    <motion.div
                      className="flex flex-wrap gap-2 mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {currentProject.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium border border-emerald-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </motion.div>

                    {/* This 'div' is already responsive.
                      It stacks with 'flex-col' on mobile...
                      ...and goes side-by-side with 'sm:flex-row'
                    */}
                    <motion.div
                      className="flex flex-col sm:flex-row gap-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <motion.a
                        href={currentProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg font-semibold hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Project</span>
                        <FaExternalLinkAlt className="text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </motion.a>

                      <motion.a
                        href={currentProject.srcLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaGithub className="text-lg group-hover:rotate-12 transition-transform" />
                        <span>Source Code</span>
                      </motion.a>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider Indicators (No changes) */}
          <div className="flex justify-center gap-2 mt-6">
            {projects.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-emerald-400"
                    : "w-2 bg-gray-600 hover:bg-gray-500"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
