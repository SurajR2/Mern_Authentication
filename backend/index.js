import express from "express";
import { configDotenv } from "dotenv";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
configDotenv();
const port = 3000 || process.env.PORT;

app.get("/", (req, res) => res.send(`Hello World!`));
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  connectDB();
  console.log(`The server is listening on http://localhost:${port} ⏳`);
});
