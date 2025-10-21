import React from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaDribbble,
  FaCodepen,
} from "react-icons/fa";

const FooterGlass = () => {
  const socialLinks = [
    {
      icon: FaGithub,
      href: "https://github.com/Sumitsharma31",
      label: "GitHub",
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/sumit-sharma-1906762a2/",
      label: "LinkedIn",
    },
    { icon: FaTwitter, href: "https://x.com/C_SUMI_020", label: "Twitter" },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/sumit.sharma31/",
      label: "Instagram",
    },
  ];

  return (
    <footer className="relative bg-slate-950 pt-20 pb-10 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Glassmorphism Card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 mb-8"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Building digital experiences with passion and precision. Follow my
              journey as I create beautiful, functional web applications.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-4 mb-12">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center text-white hover:bg-emerald-500/20 hover:border-emerald-400/50 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="text-xl" />
              </motion.a>
            ))}
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-8 text-gray-300">
            {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-emerald-400 transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>
        </motion.div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} Sumit Sharma. Crafted with ❤️ and ☕
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterGlass;
