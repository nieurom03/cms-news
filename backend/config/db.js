const mongoose = require('mongoose');

const connectDB = async () => {
  if (process.env.USE_JSON_STORAGE === 'true') {
    console.log('Sử dụng JSON file storage');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB đã kết nối thành công');
  } catch (error) {
    console.error('Lỗi kết nối MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
