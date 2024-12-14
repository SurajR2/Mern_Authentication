import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContex";

const Dashboard = () => {
  const { isLoading, user } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="min-h-screen relative overflow-hidden bg-background">
      {/* Animated Background */}
      <div className="absolute inset-0 flex justify-center items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0.8, 1.2, 1], opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-slate-950">
            🎉 Welcome, {user?.name || "User"}! 🎉
          </h1>
          <p className="text-lg mt-2 text-slate-950">
            You have successfully logged in to the demo website.
          </p>
        </motion.div>
      </div>

      {[...Array(10)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full shadow-md bg-primary"
          style={{
            width: `${Math.random() * 50 + 20}px`,
            height: `${Math.random() * 50 + 20}px`,
            top: "100%",
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -window.innerHeight],
            x: [0, Math.random() * 50 - 25],
            opacity: [1, 0],
          }}
          transition={{ duration: Math.random() * 5 + 3, repeat: Infinity }}
        />
      ))}
    </section>
  );
};

export default Dashboard;
