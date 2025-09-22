import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
const app = express();
const PORT = process.env.PORT || 3001;
import dotenv from "dotenv";
dotenv.config()
import itineraryRoutes from './src/routes/itinerary.route.js'
// ⚡ CORS để cho phép gửi cookie từ frontend (port 3000)
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "dulichphanthiet.vercel.app"
    ],
    credentials: true, // ⚡ quan trọng để gửi cookie
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "ngrok-skip-browser-warning",
    ],
  })
);

// ⚡ Đọc JSON và Cookie
app.use(express.json());
app.use(cookieParser());

// Bỏ cảnh báo ngrok
app.use((req, res, next) => {
  res.setHeader("ngrok-skip-browser-warning", "true");
  next();
});

// Kết nối tới MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Kết nối MongoDB thành công!'))
  .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));

// Định nghĩa Routes
app.use('/api/itinerary', itineraryRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Backend server đang chạy tại http://localhost:${PORT}`);
});
