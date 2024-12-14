import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { motion } from "motion/react";
import { useMediaQuery } from "@uidotdev/usehooks";
const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();
  const [isActive, setIsActive] = useState(false);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  const toggleSwitch = () => {
    setIsActive((prevTheme) => (prevTheme === "light" ? isActive : !isActive));
    toggleTheme();
  };

  const renderThemeIcon = () => {
    if (isSmallDevice) {
      return theme === "light" ? (
        <MdOutlineLightMode
          className="absolute  opacity-100 dark:opacity-0 transition-opacity duration-300"
          size={20}
        />
      ) : (
        <MdOutlineDarkMode
          className="absolute  opacity-0 dark:opacity-100 transition-opacity duration-300"
          size={20}
        />
      );
    }

    return (
      <>
        <MdOutlineLightMode
          className="absolute left-2  opacity-100 dark:opacity-0 transition-opacity duration-300"
          size={20}
        />
        <MdOutlineDarkMode
          className="absolute right-2 opacity-0 dark:opacity-100 transition-opacity duration-300"
          size={20}
        />
        <motion.div
          layoutId="theme-toggle-switch"
          className="w-6 h-6 p-1 rounded-full shadow-md z-10 dark:bg-yellow-400 bg-slate-700"
          transition={{
            type: "tween",
            ease: [0.68, -0.6, 0.32, 1.6],
            duration: 0.3,
          }}
        />
      </>
    );
  };

  return (
    <div
      className="relative flex items-center justify-center md:dark:justify-start md:justify-end cursor-pointer w-6 h-6 md:w-16 md:h-8 p-1 rounded-full bg-yellow-400 dark:bg-slate-400"
      onClick={toggleSwitch}
    >
      {renderThemeIcon()}
    </div>
  );
};

export default ThemeToggleButton;
