import React, { useState, useRef, useEffect } from "react";
import { MdVerifiedUser, MdRefresh } from "react-icons/md";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import api from "../axios/axios.instance";

const VerifyTokenForm = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [userName, setUserName] = useState(""); // For storing user's name
  const inputRefs = useRef([]);

  // Focus management for inputs
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  const handleChange = (e, index) => {
    const newToken = [...token];
    const inputValue = e.target.value;

    // Validate input to only allow numbers
    if (/^\d?$/.test(inputValue)) {
      newToken[index] = inputValue;
      setToken(newToken);

      // Automatically move focus to next input if a digit is entered
      if (inputValue !== "" && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace to move to previous input and clear
    if (e.key === "Backspace") {
      if (token[index] === "" && index > 0) {
        inputRefs.current[index - 1].focus();
      } else {
        const newToken = [...token];
        newToken[index] = "";
        setToken(newToken);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");

    // Validate pasted content
    if (/^\d{6}$/.test(pastedText)) {
      const newToken = pastedText.split("");
      setToken(newToken);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tokenString = token.join("");
    if (tokenString.length === 6) {
      setIsVerifying(true);
      api
        .post("/auth/verify-email", { token: tokenString })
        .then((response) => {
          if (response.status === 200) {
            setIsVerified(true);
            setUserName(response.data.name); // Assuming the response contains the user's name
            setIsVerifying(false);
            setTimeout(() => {
              navigate("/dashboard");
            }, 5000); // Navigate after 5 seconds
          } else {
            console.error(response.data);
            setIsVerifying(false);
          }
        })
        .catch((error) => {
          console.error(error);
          setIsVerifying(false);
        });
    }
  };

  const handleResendToken = () => {
    alert("Token resent. Please check your email.");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background dark:bg-dark-background">
      <motion.div
        className="md:w-1/3 w-full max-w-md bg-background-secondary dark:bg-dark-background rounded-xl p-8 shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {isVerified && (
          <motion.div
            className="text-center text-green-500 font-semibold mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-xl">You are verified, {userName}!</h2>
          </motion.div>
        )}

        <MdVerifiedUser className="mx-auto text-5xl text-primary dark:text-secondary mb-4" />

        <h1 className="text-2xl md:text-3xl text-center font-bold text-primary dark:text-secondary mb-6">
          Verify Your Account
        </h1>

        <p className="text-center text-text-secondary dark:text-dark-text-contrast mb-8">
          Enter the 6-digit verification code sent to your email
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center items-center space-x-2">
            {token.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                maxLength={1}
                className="w-12 h-12 text-xl text-center border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secondary"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            ))}
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={token.some((digit) => digit === "") || isVerifying}
            className={`w-full h-12 rounded-lg font-semibold shadow-md dark:shadow-lg transition-all flex items-center justify-center ${
              token.some((digit) => digit === "") || isVerifying
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-primary hover:bg-primary-hover text-text-contrast"
            }`}
          >
            {isVerifying ? (
              <span className="animate-pulse">Verifying...</span>
            ) : (
              "Verify Code"
            )}
          </motion.button>

          <div className="text-center text-sm text-text-secondary dark:text-dark-text-contrast mt-4">
            Didn't receive the code?
            <button
              type="button"
              onClick={handleResendToken}
              className="text-primary dark:text-secondary hover:underline flex items-center justify-center mx-auto mt-2"
            >
              <MdRefresh className="mr-1" /> Resend Code
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default VerifyTokenForm;
