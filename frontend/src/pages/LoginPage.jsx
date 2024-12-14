import React, { useState } from "react";
import { MdEmail, MdLock } from "react-icons/md";
import { motion } from "framer-motion"; // Correct import for motion
import { useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useAuth } from "../context/AuthContex";
const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");
  const { isLoading, login } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setApiError(""); // Clear any previous errors
    const data = new FormData(e.currentTarget);
    const loginData = Object.fromEntries(data.entries());
    let response = await login(loginData);
    setApiError(response.data.message); // Clear any previous errors
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background dark:bg-dark-background">
      <motion.div
        className="md:w-1/3 w-full max-w-md bg-background-secondary dark:bg-dark-background-secondary rounded-xl p-8 shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl text-center font-bold text-primary dark:text-secondary mb-6">
          Welcome Back!
        </h1>
        <p className="text-center text-text-secondary dark:text-dark-text-secondary mb-8">
          Please log in to continue.
        </p>
        <form className="space-y-6" onSubmit={onSubmit}>
          {/* Email Input */}
          <div className="relative">
            <MdEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary dark:text-secondary text-xl" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full h-12 px-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-background dark:bg-dark-background text-black dark:text-white focus:ring-2 focus:ring-primary dark:focus:ring-secondary transition-all"
              required
            />
          </div>
          {/* Password Input */}
          <div className="relative">
            <MdLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary dark:text-secondary text-xl" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full h-12 px-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-background dark:bg-dark-background text-black dark:text-white focus:ring-2 focus:ring-primary dark:focus:ring-secondary transition-all"
              required
            />
            <div
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary dark:text-secondary text-xl cursor-pointer transition duration-100"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
            </div>
          </div>
          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full h-12 rounded-lg bg-primary hover:bg-primary-hover text-text-contrast font-semibold shadow-md dark:shadow-lg transition-all"
          >
            {isLoading ? "Logging in..." : "Login"}
          </motion.button>
          {apiError && <p className="text-red-500 mt-2">{apiError}</p>}
        </form>
        <div className="text-center text-sm text-text-secondary dark:text-dark-text-secondary mt-6">
          Don't have an account?{" "}
          <span
            className="text-primary dark:text-secondary hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
