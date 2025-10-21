import { motion } from "framer-motion";

import profilePhoto from "../assets/p.jpg";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div
      id="about"
      className=" min-h-screen bg-gradient-to-br from-[#2c3336] via-[#0d1c2b] to-[#07181e] p-6 md:p-20 "
    >
      {/* Main Profile Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <div
          className=" relative w-full h-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2
        "
        >
          {/* Profile Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="flex justify-center lg:justify-center  "
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative w-64 h-64"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-3xl object-cover  ">
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="w-full h-full rounded-3xl object-cover  "
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            variants={containerVariants}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Name and Title */}
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl text-center md:text-left mt-8 md:mt-0 md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] mb-2 ">
                Sumit Sharma
              </h1>
              <p className="text-xl text-gray-400 text-center  md:text-left">
                Full Stack Developer
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-gray-300 leading-relaxed text-sm md:text-base "
            >
              As a final-year CSE student and aspiring front-end developer, I
              aim to contribute to innovative web projects that combine clean
              code, responsive design, and engaging user experiences. I am eager
              to apply my skills in React and modern web technologies to solve
              real-world problems and grow as a developer.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4"
            >
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 text-center">
                <p className="text-gray-500 text-xs md:text-sm">Experience</p>
                <p className="text-white font-bold text-lg md:text-xl">
                  Fresher
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 text-center">
                <p className="text-gray-500 text-xs md:text-sm">Specialty</p>
                <p className="text-white font-bold text-lg md:text-xl">
                  MERN Stack
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 text-center">
                <p className="text-gray-500 text-xs md:text-sm">Focus</p>
                <p className="text-white font-bold text-sm md:text-base leading-tight">
                  Software Developer
                </p>
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div variants={itemVariants} className="flex gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-black font-semibold px-8 py-3 rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
              >
                <a href="#projects">View Projects</a>
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(16, 185, 129, 0.5)",
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-transparent border border-white/30 text-white font-semibold px-8 py-3 rounded-lg hover:border-emerald-400 transition-colors cursor-pointer"
              >
                Get in Touch
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* About Me Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16  p-8 "
        >
          <h2 className=" text-3xl md:text-4xl font-bold text-white mb-6">
            About Me
          </h2>
          <p className="text-gray-300 leading-relaxed text-base md:text-lg max-w-full ">
            I'm a Software Developer,I enjoy turning ideas into code,
            experimenting with new technologies, and constantly learning to
            improve my craft. Whether it’s creating dynamic web apps,
            animations, or small utility projects, I strive to write efficient
            code while delivering engaging user experiences.
          </p>
          <p className="text-gray-300 leading-relaxed text-base md:text-lg max-w-full mt-4">
            I love turning ideas into scalable, user-friendly products that make
            an impact.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
