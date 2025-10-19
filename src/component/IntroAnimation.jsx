import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { useMemo, useEffect, useState } from "react";

export default function IntroAnimation({ onFinish }) {
  const greetings = useMemo(
    () => [
      "नमस्ते",
      "নমস্কার",
      "નમસ્તે",
      "नमस्कार",
      "हरे कृष्ण",
      "प्रणाम",
      "राम राम",
      "नमस्कारम",
      "वंदे मातरम्",
    ],
    []
  );
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (index < greetings.length - 1) {
      const id = setInterval(() => setIndex((i) => i + 1), 180);
      return () => clearInterval(id);
    } else {
      const t = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(t);
    }
  }, [index, greetings.length]);

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black text-white overflow-hidden "
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 1.05,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
        >
          <motion.h1
            key={index}
            className="text-5xl md:text-7xl lg:text-8xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.12 }}
          >
            {greetings[index]}
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
