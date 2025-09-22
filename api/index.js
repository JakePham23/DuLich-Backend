import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import itineraryRoutes from '../src/routes/itinerary.route.js';

dotenv.config();

const app = express();

// ⚡ CORS
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://dulichphanthiet.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "ngrok-skip-browser-warning",
    ],
  })
);

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Bỏ cảnh báo ngrok
app.use((req, res, next) => {
  res.setHeader("ngrok-skip-browser-warning", "true");
  next();
});

// Kết nối MongoDB (chỉ nên connect 1 lần)
if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ Kết nối MongoDB thành công!"))
    .catch(err => console.error("❌ Lỗi kết nối MongoDB:", err));
}

// Routes
app.use("/api/itinerary", itineraryRoutes);

// Xuất Express app cho Vercel
export default app;
