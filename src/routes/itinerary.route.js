import express from 'express';
import Itinerary from '../models/itinerary.model.js';
import { connectDB } from '../db.js'; // import hàm connectDB

const router = express.Router();

// Route lấy toàn bộ lịch trình
router.get('/', async (req, res) => {
  try {
    await connectDB(); // đảm bảo connect trước khi query
    const itinerary = await Itinerary.findOne({});
    if (!itinerary) {
      return res.status(404).json({ message: 'Không tìm thấy lịch trình.' });
    }
    res.json(itinerary);
  } catch (err) {
    console.error("❌ Lỗi get itinerary:", err);
    res.status(500).json({ message: err.message });
  }
});

// Route update itinerary
router.put('/:id', async (req, res) => {
  try {
    await connectDB(); // đảm bảo connect trước khi query
    const { id } = req.params; // id itinerary
    const updateData = req.body;

    console.log("🆔 id: ", id);

    const updatedItinerary = await Itinerary.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    console.log("✅ Updated itinerary:", JSON.stringify(updatedItinerary, null, 2));

    if (!updatedItinerary) {
      return res.status(404).json({ message: 'Không tìm thấy itinerary để cập nhật.' });
    }

    res.json({
      message: 'Cập nhật itinerary thành công.',
      itinerary: updatedItinerary
    });
  } catch (err) {
    console.error('❌ Lỗi update itinerary:', err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
