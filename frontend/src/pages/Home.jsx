import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/axios.instance";
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center md:w-screen flex-wrap p-6 gap-10 bg-background dark:bg-dark-background text-black dark:text-dark-text-contrast">
      <p className="flex flex-col gap-6 text-center text-4xl font-bold font-sans">
        Simple & Functional <br />
        <span>
          <span className="text-primary dark:text-secondary font-extrabold text-7xl italic">
            MERN
          </span>
          <span> Auth Demo</span>
        </span>
      </p>
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
        <button
          className="w-max px-6 py-3 bg-secondary hover:bg-secondary-hover text-text-contrast rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
          onClick={() => navigate("/login")}
        >
          Already have an Account?
        </button>
        <button
          className="w-max px-6 py-3 bg-primary hover:bg-primary-hover text-text-contrast rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
          onClick={() => navigate("/signup")}
        >
          Sign Up!
        </button>
      </div>
    </div>
  );
};

export default Home;
