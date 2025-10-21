import React, { useState, useEffect, useRef } from "react";
import {
  SiReact,
  SiJavascript,
  SiNodedotjs,
  SiTailwindcss,
  SiFramer,
  SiGit,
  SiNextdotjs,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiMongodb,
  SiExpress,
} from "react-icons/si";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const skills = [
  { name: "React", icon: <SiReact size={50} /> },
  { name: "Next.js", icon: <SiNextdotjs size={50} /> },
  { name: "JavaScript", icon: <SiJavascript size={50} /> },
  { name: "TypeScript", icon: <SiTypescript size={50} /> },
  { name: "Node.js", icon: <SiNodedotjs size={50} /> },
  { name: "Express", icon: <SiExpress size={50} /> },
  { name: "MongoDB", icon: <SiMongodb size={50} /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss size={50} /> },
  { name: "Framer Motion", icon: <SiFramer size={50} /> },
  { name: "HTML5", icon: <SiHtml5 size={50} /> },
  { name: "CSS3", icon: <SiCss3 size={50} /> },
  { name: "Git", icon: <SiGit size={50} /> },
];

const Skills = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(1);
  const marqueeRef = useRef(null);
  const animationFrameRef = useRef();
  const positionRef = useRef(0);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > lastScrollY.current) {
      setScrollDirection(1);
    } else {
      setScrollDirection(-1);
    }
    lastScrollY.current = latest;
  });

  useEffect(() => {
    const animateMarquee = () => {
      if (marqueeRef.current && !isHovered) {
        const speed = 2;
        positionRef.current -= speed * scrollDirection;
        const marqueeWidth = marqueeRef.current.scrollWidth / 2;
        if (
          scrollDirection === 1 &&
          Math.abs(positionRef.current) >= marqueeWidth
        ) {
          positionRef.current = 0;
        } else if (scrollDirection === -1 && positionRef.current >= 0) {
          positionRef.current = -marqueeWidth;
        }
        marqueeRef.current.style.transform = `translateX(${positionRef.current}px)`;
      }
      animationFrameRef.current = requestAnimationFrame(animateMarquee);
    };

    animationFrameRef.current = requestAnimationFrame(animateMarquee);
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isHovered, scrollDirection]);

  return (
    <section
      id="skills"
      className="relative bg-black text-white py-16 md:py-24 overflow-hidden "
      aria-labelledby="skills-heading"
    >
      {/* Background gradient blobs - place them behind the content with z-0 */}
      <div className="absolute inset-0 z-0 ">
        <div
          className="absolute top-2 left-0
          w-[30vw] md:w-[20vw]
          h-[30vw] md:h-[20vw]
          max-w-[300px] max-h-[350px]
          rounded-full 
          bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
          opacity-15 md:opacity-10
          blur-[60px] md:blur-[100px]
          animate-pulse"
        ></div>

        <div
          className="absolute -bottom-2 -right-0
          w-[30vw] md:w-[20vw]
          h-[30vw] md:h-[20vw]
          max-w-[500px] max-h-[350px]
          rounded-full 
          bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
         opacity-15 md:opacity-10
          blur-[60px] md:blur-[100px]
          animate-pulse [animation-delay:500ms]"
        ></div>
      </div>

      <div className="relative z-10 container mx-auto  px-4">
        <motion.h1
          id="skills-heading"
          className="text-4xl text-center md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f] mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.2 }}
        >
          My Skills
        </motion.h1>
        <motion.p
          className="text-gray-300 leading-relaxed text-sm md:text-base text-center
        "
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          Modern Applications | Modern Technologies
        </motion.p>

        <div
          className="relative w-full overflow-hidden cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div ref={marqueeRef} className="flex flex-nowrap">
            {[...skills, ...skills].map((skill, index) => (
              <SkillCard key={index} name={skill.name} icon={skill.icon} />
            ))}
          </div>

          {/* CHANGED: Re-added the gradients for a smooth fade-out effect on the edges */}
          <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r"></div>
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l"></div>
        </div>
      </div>
    </section>
  );
};

const SkillCard = ({ name, icon }) => (
  <div className="flex-shrink-0 w-50 md:w-58 h-50 flex flex-col items-center justify-center gap-3 text-[#1cd8d2]">
    {icon}
    <span className="text-lg font-semibold text-center">{name}</span>
  </div>
);

export default Skills;
