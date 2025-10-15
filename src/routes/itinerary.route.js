import express from 'express';
import Itinerary from '../models/itinerary.model.js';
import mongoose from 'mongoose'; // Cần cho việc bắt CastError và isValid

const router = express.Router();

// Route lấy toàn bộ lịch trình
router.get('/', async (req, res) => {
  try {
    const itineraries = await Itinerary.find({});
    // Vì find({}) trả về mảng rỗng nếu không có document, nên không cần check !itinerary
    res.json(itineraries); 
  } catch (err) {
    console.error("❌ Lỗi get itinerary:", err);
    res.status(500).json({ message: err.message });
  }
});

// Route lấy lịch trình theo ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params; 
    
    // Mongoose tự động cố gắng ép kiểu id thành ObjectId
    const itinerary = await Itinerary.findOne({ _id: id }); 

    if (!itinerary) {
      return res.status(404).json({ message: 'Không tìm thấy lịch trình.' });
    }
    
    res.json(itinerary);
  } catch (err) {
    console.error("❌ Lỗi get itinerary:", err);
    if (err.name === 'CastError') {
        // Bắt lỗi khi ID không phải là ObjectId hợp lệ
        return res.status(400).json({ message: 'ID lịch trình không hợp lệ.' });
    }
    res.status(500).json({ message: 'Lỗi máy chủ nội bộ.' });
  }
});

// Route update itinerary (Dùng để sửa inline, modal, thêm ngày, thêm/xóa hoạt động)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params; 
    const updateData = req.body;

    // findByIdAndUpdate với toàn bộ dữ liệu (đã bao gồm các mảng activities, days mới)
    // { new: true } trả về document đã cập nhật
    // { runValidators: true } đảm bảo các trường required (stt, location, etc.) vẫn hợp lệ
    const updatedItinerary = await Itinerary.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedItinerary) {
      return res.status(404).json({ message: 'Không tìm thấy itinerary để cập nhật.' });
    }

    // Trả về document đã cập nhật
    res.json(updatedItinerary); 
  } catch (err) {
    console.error('❌ Lỗi update itinerary:', err);
     if (err.name === 'CastError') {
       return res.status(400).json({ message: 'ID lịch trình hoặc dữ liệu không hợp lệ.' });
    }
    if (err.name === 'ValidationError') {
       return res.status(400).json({ message: 'Lỗi xác thực dữ liệu.' });
    }
    res.status(500).json({ message: 'Lỗi máy chủ nội bộ.' });
  }
});

// Route tạo lịch trình mới
router.post('/', async (req, res) => {
  try {
    const itineraryData = req.body;
    
    // Gán mảng days rỗng nếu client không gửi (đảm bảo cấu trúc schema)
    const dataWithDefaults = {
        ...itineraryData,
        days: itineraryData.days || [],
    };
    
    const savedItinerary = await Itinerary.create(dataWithDefaults);

    res.status(201).json(savedItinerary);
  } catch (err) {
    console.error('❌ Lỗi tạo lịch trình:', err);
    
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Lỗi xác thực dữ liệu.', errors: err.errors });
    }
    
    res.status(500).json({ message: 'Lỗi máy chủ nội bộ khi tạo lịch trình.' });
  }
});

export default router;