import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center md:w-screen text-text dark:text-text flex-wrap p-4 gap-10 ">
      <p className="flex flex-col gap-6 text-center text-5xl font-bold font-kaisei">
        Simple & Functional <br />
        <p>
          <span className="text-accent-contrast font-bold font-sawer font-outline-4 text-8xl italic">
            MERN
          </span>
          <span> Auth Demo</span>
        </p>
      </p>
      <div className="flex flex-col md:flex-row gap-4 sm:flex-wrap justify-center items-center ">
        <button className="w-max p-3 bg-secondary hover:bg-secondary-contrast text-text-contrast dark:text-text rounded-xl">
          Already have an Account?
        </button>
        <button className="w-max p-3 bg-accent-contrast hover:bg-accent text-text-contrast dark:text-text-contrast rounded-xl">
          Sign Up!
        </button>
      </div>
    </div>
  );
};

export default Home;
