import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiX } from "react-icons/fi";

export default function OverlayMenu({ isOpen, onClose }) {
  const [activeLink, setActiveLink] = useState("home");

  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const origin = isMobile ? "95% 8%" : "50% 8%";

  // Detect current section in viewport
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"];
      let current = "home";

      sections.forEach((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
          }
        }
      });

      setActiveLink(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ clipPath: `circle(0% at ${origin})` }}
          animate={{ clipPath: `circle(150% at ${origin})` }}
          exit={{ clipPath: `circle(0% at ${origin})` }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{ backgroundColor: "rgba(0,0,0,0.95)" }}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white text-3xl"
            aria-label="close menu"
          >
            <FiX className="cursor-pointer" />
          </button>

          <ul className="space-y-6 text-center">
            {["Home", "About", "Skills", "Projects", "Contact"].map(
              (item, index) => {
                const lowerItem = item.toLowerCase();
                const isActive = activeLink === lowerItem;

                return (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <a
                      href={`#${lowerItem}`}
                      onClick={() => {
                        setActiveLink(lowerItem);
                        onClose();
                      }}
                      className={`text-4xl font-semibold transition-colors duration-300 ${
                        isActive
                          ? "text-[#1cd8d2]"
                          : "text-white hover:text-pink-400"
                      }`}
                    >
                      {item}
                    </a>
                  </motion.li>
                );
              }
            )}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
