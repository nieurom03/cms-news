require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Middleware CORS - cho phép frontend kết nối
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:4000'],
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Kết nối database
connectDB();

// Public Routes (không cần auth)
app.use('/api/public/articles', require('./routes/public/articles'));
app.use('/api/public/categories', require('./routes/public/categories'));
app.use('/api/public/ads', require('./routes/public/ads'));
app.use('/api/public/menus', require('./routes/public/menus'));
app.use('/api/public/pages', require('./routes/public/pages'));

// Auth Routes
app.use('/api/auth', require('./routes/auth'));

// Admin Routes (cần auth)
app.use('/api/admin/articles', require('./routes/admin/articles'));
app.use('/api/admin/categories', require('./routes/admin/categories'));
app.use('/api/admin/ads', require('./routes/admin/ads'));
app.use('/api/admin/users', require('./routes/admin/users'));
app.use('/api/admin/menus', require('./routes/admin/menus'));
app.use('/api/admin/pages', require('./routes/admin/pages'));
app.use('/api/admin/upload', require('./routes/upload'));

// Legacy routes (backward compatibility) - sẽ xóa sau
app.use('/api/articles', require('./routes/articles'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/ads', require('./routes/ads'));
app.use('/api/upload', require('./routes/upload'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên port ${PORT}`);
});
