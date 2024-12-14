import React from "react";
import ThemeToggleButton from "./ThemeToggleButton";
import { motion } from "framer-motion"; // Corrected motion import
import { useAuth } from "../context/AuthContex";

const TopBar = () => {
  const { isAuthenticated, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <motion.div
      className="flex justify-between items-center p-4 bg-background dark:bg-dark-background shadow-md dark:shadow-lg rounded-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.span
        className="text-2xl md:text-5xl font-sawer font-outline-1 text-primary dark:text-secondary italic drop-shadow-md dark:drop-shadow-[0_1px_3px_rgba(255,255,255,0.5)]"
        whileHover={{ scale: 1.1, rotate: 3 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        MERN Authentication
      </motion.span>
      {isAuthenticated && (
        <div className="absolute bottom-8 right-8 z-40">
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-primary text-slate-950 rounded-md shadow-lg hover:bg-primary-hover transition-transform transform hover:scale-105"
          >
            Logout
          </button>
        </div>
      )}
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <ThemeToggleButton />
      </motion.div>
    </motion.div>
  );
};

export default TopBar;
