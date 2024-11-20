import React from "react";
import ThemeToggleButton from "./ThemeToggleButton";
import { motion } from "motion/react";

const TopBar = () => {
  return (
    <div className="flex justify-between items-center p-4">
      <span className=" text-2xl md:text-5xl font-sawer font-outline-1 text-accent-contrast dark:text-accent italic drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] shadow-background-contrast">
        Suraj Rasaili B.K.
      </span>
      <ThemeToggleButton />
    </div>
  );
};

export default TopBar;
