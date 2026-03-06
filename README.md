# CMS Quản lý Tin tức

Hệ thống CMS quản lý tin tức với Node.js backend và React frontend.

## Cấu trúc dự án

```
├── backend/          # Node.js API server
│   ├── config/       # Cấu hình database
│   ├── models/       # MongoDB models (cho tương lai)
│   ├── routes/       # API routes
│   ├── middleware/   # Authentication middleware
│   ├── storage/      # JSON file storage
│   └── utils/        # Utilities
├── frontend/         # React application
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── App.js
└── package.json
```

## Cài đặt

1. Cài đặt dependencies:
```bash
npm run install-all
```

2. Tạo file `.env` trong thư mục backend:
```bash
cd backend
cp .env.example .env
```

3. Chỉnh sửa file `.env`:
- `USE_JSON_STORAGE=true` để dùng JSON files
- `USE_JSON_STORAGE=false` để dùng MongoDB

## Chạy ứng dụng

### Development mode

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm start
```

Backend: http://localhost:5002
Frontend: http://localhost:3002

## Chức năng

### Admin Panel (/admin)
- Quản lý bài viết
- Quản lý danh mục
- Quản lý người dùng
- Quản lý quảng cáo

### Frontend
- Hiển thị danh sách tin tức
- Xem chi tiết bài viết
- Hiển thị quảng cáo

## Chuyển sang MongoDB

Khi sẵn sàng chuyển sang MongoDB:

1. Cài đặt MongoDB
2. Cập nhật `.env`: `USE_JSON_STORAGE=false`
3. Cập nhật `MONGODB_URI` trong `.env`
4. Restart backend server

## API Endpoints

- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `GET /api/articles` - Lấy danh sách bài viết
- `POST /api/articles` - Tạo bài viết mới
- `PUT /api/articles/:id` - Cập nhật bài viết
- `DELETE /api/articles/:id` - Xóa bài viết
- `GET /api/categories` - Lấy danh mục
- `GET /api/ads` - Lấy quảng cáo
- `POST /api/upload` - Upload hình ảnh
