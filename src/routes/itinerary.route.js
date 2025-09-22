import express from 'express';
import Itinerary from '../models/itinerary.model.js';
import mongoose from 'mongoose'
const router = express.Router();

// Route lấy toàn bộ lịch trình (giữ nguyên)
router.get('/', async (req, res) => {
  try {
    const itinerary = await Itinerary.findOne({});
    if (!itinerary) {
      return res.status(404).json({ message: 'Không tìm thấy lịch trình.' });
    }
    res.json(itinerary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params; // id của itinerary
    const updateData = req.body; // dữ liệu gửi từ FE
    console.log("id: ", id)
    // Tìm và cập nhật, trả về document mới
    const updatedItinerary = await Itinerary.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    console.log(JSON.stringify(updatedItinerary, null, 2));
    if (!updatedItinerary) {
      return res.status(404).json({ message: 'Không tìm thấy itinerary để cập nhật.' });
    }

    res.json({
      message: 'Cập nhật itinerary thành công.',
      itinerary: updatedItinerary
    });
  } catch (err) {
    console.error('Lỗi update itinerary:', err);
    res.status(500).json({ message: err.message });
  }
});
export default router;