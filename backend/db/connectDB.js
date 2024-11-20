import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Database connected successfully ✅");
  } catch (e) {
    console.error(`Error connecting to database: ${e.message} ❌`);
    process.exit(1);
  }
};
