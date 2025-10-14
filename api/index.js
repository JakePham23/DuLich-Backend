import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import  "../src/db.js";   // file connect MongoDB
import itineraryRoutes from "../src/routes/itinerary.route.js";

dotenv.config();

const app = express();

// ⚡ CORS
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://scheduletravel.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "ngrok-skip-browser-warning"],
  })
);

// ⚡ Middleware
app.use(express.json());
app.use(cookieParser());

// ⚡ Bỏ cảnh báo ngrok
app.use((req, res, next) => {
  res.setHeader("ngrok-skip-browser-warning", "true");
  next();
});

// ⚡ Routes
app.use("/api/itinerary", itineraryRoutes);

// ⚡ Kết nối MongoDB (chỉ cần gọi connect, không listen)
// connectDB().catch((err) => {
//   console.error("❌ Failed to connect to MongoDB:", err);
// });

// ⚡ Export app cho Vercel dùng
export default app;
