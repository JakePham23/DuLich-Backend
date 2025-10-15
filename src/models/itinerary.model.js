import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  // REMOVED: _id: String, // Mongoose handles _id automatically
  start_time: String,
  end_time: String,
  activity_name: String,
  location_name: String,
  description: String,
  maps_url: String,
  image_urls: [String],
  tiktok_urls: [String]
});

// Định nghĩa schema cho mỗi ngày trong lịch trình
const daySchema = new mongoose.Schema({
  day: String,
  activities: [activitySchema]
});

const itinerarySchema = new mongoose.Schema({
  // REMOVED: _id: String, // Mongoose handles _id automatically
  stt: { type: String, required: true }, // Added required for basic fields
  start_date: { type: String, required: true },
  end_date: { type: String, required: true },
  location: { type: String, required: true },
  days: [daySchema] 
}, {
    // This setting is optional, as _id is true by default, 
    // but ensures Mongoose uses its default ObjectId generation.
    _id: true, 
});

// Tên model là 'schedule'
// Tên collection cũng là 'schedule'
const Itinerary = mongoose.model('schedule', itinerarySchema, 'schedule'); 

export default Itinerary;