import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import Astra from "../assets/Astra.png";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import ParticlesBackground from "../component/ParticlesBackground";

const Contact = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Animation variants
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const imageVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 10,
        delay: 0.3,
      },
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast.success("Message sent successfully! We'll get back to you soon.");

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen relative bg-black  flex items-center justify-center p-10"
    >
      <ParticlesBackground />
      <Toaster position="top-right" />

      <div className="max-w-7xl w-full">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div
            variants={imageVariants}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative">
              {/* Decorative background blob */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 blur-3xl rounded-full" />

              {/* Replace with your actual image */}
              <motion.img
                src={Astra}
                alt="astra image"
                className="relative z-10 w-full max-w-lg h-auto  pointer-events-none"
                animate={{
                  y: [0, -6, 0, 6, 0], // make movement visible
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                onError={(e) => {
                  // Fallback to placeholder if image doesn't load
                  e.target.src =
                    "https://via.placeholder.com/500x500/1a1a2e/16213e?text=Contact+Us";
                }}
              />
              {/* Left Side - Contact Form */}
              {/* Optional: Floating elements for decoration */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-50 blur-xl"
              />
              <motion.div
                animate={{
                  y: [0, 20, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-pink-500 to-orange-500 rounded-full opacity-50 blur-xl"
              />
            </div>
          </motion.div>
          {/* Right Side - Image (Hidden on mobile) */}
          <motion.div
            variants={itemVariants}
            className=" rounded-2xl p-3 lg:p-10 border border-neutral-800"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-4xl font-bold text-white mb-3">
                Get in Touch
              </h2>
              <p className="text-neutral-400 text-lg">
                Have a question or want to work together? Send us a message!
              </p>
            </motion.div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-neutral-300 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="John Doe"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-neutral-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="john@example.com"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-neutral-300 mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Tell us about your project..."
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg
                          className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </button>
              </motion.div>
            </form>

            {/* Optional: Add social links or additional contact info */}
            <motion.div
              variants={itemVariants}
              className="mt-8 pt-8 border-t border-neutral-800"
            >
              <p className="text-neutral-400 text-sm text-center">
                Or reach us directly at{" "}
                <a
                  href="mailto:ssumit10kr@gmale.com"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  ssumit10kr@gmail.com
                </a>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
