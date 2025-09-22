import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
    _id: String,   // 👈 thêm dòng này
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
    _id: String,   // 👈 thêm dòng này
  stt: String,
  start_date: String,
  end_date: String,
  location: String,
  days: [daySchema] // Thay thế 'activities' bằng 'days'
});

// Dòng này đã được sửa
// Tên model là 'schedule'
// Tên collection cũng là 'schedule'
const Itinerary = mongoose.model('schedule', itinerarySchema, 'schedule'); 

export default Itinerary;