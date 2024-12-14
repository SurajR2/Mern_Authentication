import React, { useState } from "react";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

import api from "../axios/axios.instance";

const SignupPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const passwordCriteria = [
    { regex: /[A-Z]/, label: "Uppercase Letter" },
    { regex: /[a-z]/, label: "Lowercase Letter" },
    { regex: /[0-9]/, label: "Number" },
    { regex: /[@$!%*?&#]/, label: "Symbol" },
  ];

  const checkPasswordStrength = (password) => {
    let score = 0;
    passwordCriteria.forEach((criterion) => {
      if (criterion.regex.test(password)) score += 1;
    });
    if (password.length >= 8) score += 1; // Length condition
    setStrength(score);
  };

  const handlePasswordChange = (e) => {
    const input = e.target.value;
    setPassword(input);
    checkPasswordStrength(input);
  };

  const getStrengthLabel = () => {
    if (strength === 5) return "Strong Password";
    if (strength >= 3) return "Moderate Password";
    return "Weak Password";
  };

  const strengthClasses = [
    "bg-gray-300",
    "bg-red-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-300",
    "bg-green-500",
  ];

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(formData.entries);
    api.post("/auth/signup", data).then((response) => {
      if (response.status === 201) {
        navigate("/verify");
      } else {
        console.error(response.data);
      }
    });
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-background dark:bg-dark-background">
      <motion.div
        className="md:w-1/3 w-full max-w-md bg-background-secondary dark:bg-dark-background rounded-xl p-8 shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl text-center font-bold text-primary dark:text-secondary mb-6">
          Create Your Account
        </h1>
        <p className="text-center text-text-secondary dark:text-dark-text-contrast mb-8">
          Fill in the details below to sign up.
        </p>
        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="relative">
            <MdPerson className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary dark:text-secondary text-xl" />
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              className="w-full h-12 px-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-background dark:bg-dark-background text-black dark:text-white focus:ring-2 focus:ring-primary dark:focus:ring-secondary transition-all"
              required
            />
          </div>
          <div className="relative">
            <MdEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary dark:text-secondary text-xl" />
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              className="w-full h-12 px-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-background dark:bg-dark-background text-black dark:text-white focus:ring-2 focus:ring-primary dark:focus:ring-secondary transition-all"
              required
            />
          </div>
          <div className="relative">
            <MdLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary dark:text-secondary text-xl" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full h-12 px-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-background dark:bg-dark-background text-black dark:text-white focus:ring-2 focus:ring-primary dark:focus:ring-secondary transition-all"
              required
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />

            <div
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary dark:text-secondary text-xl cursor-pointer transition duration-100"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
            </div>
          </div>
          <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div
              className={`h-full ${strengthClasses[strength]} transition-all duration-300`}
              style={{ width: `${(strength / 5) * 100}%` }}
            ></div>
          </div>

          {isFocused && (
            <p
              className={`text-sm mt-1 ${
                strength >= 5
                  ? "text-green-500"
                  : strength >= 3
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              {getStrengthLabel()}
            </p>
          )}
          <ul className="space-y-1 mt-4">
            {passwordCriteria.map((criterion, index) => (
              <li
                key={index}
                className={`flex items-center space-x-2 text-sm ${
                  criterion.regex.test(password)
                    ? "text-green-500"
                    : "text-gray-500"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    criterion.regex.test(password)
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                >
                  {criterion.regex.test(password) ? "✔" : ""}
                </span>
                <span>{criterion.label}</span>
              </li>
            ))}
            <li
              className={`flex items-center space-x-2 text-sm ${
                password.length >= 8 ? "text-green-500" : "text-gray-500"
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  password.length >= 8 ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                {password.length >= 8 ? "✔" : ""}
              </span>
              <span>At least 8 characters</span>
            </li>
          </ul>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={strength < 4}
            className={`w-full h-12 rounded-lg font-semibold shadow-md dark:shadow-lg transition-all ${
              strength < 4
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-primary hover:bg-primary-hover text-text-contrast"
            }`}
          >
            Sign Up
          </motion.button>
        </form>
        <div className="text-center text-sm text-text-secondary dark:text-dark-text-contrast mt-6">
          Already have an account?
          <a
            onClick={() => navigate("/login")}
            className="text-primary dark:text-secondary hover:underline"
          >
            Log In
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
