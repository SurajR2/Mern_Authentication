import express from "express";
import { configDotenv } from "dotenv";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://auth.surajrasaili.com.np", // Frontend URL
    credentials: true, // Allow credentials (cookies)
    allowedHeaders: [
      "set-cookie",
      "Content-Type",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Credentials",
    ],
  })
);
configDotenv();
const port = 3000 || process.env.PORT;

app.get("/", (req, res) => res.send(`Hello World!`));
app.get("/api", (req, res) => res.send(`The api is available`));

app.use("/api/auth", authRoutes);

app.listen(port, () => {
  connectDB();
  console.log(`The server is listening on http://localhost:${port} ⏳`);
});
