# 🚀 Hướng dẫn khởi động CMS Tin tức

## Cách 1: Sử dụng script tự động (Khuyên dùng)

### Windows:
```bash
start.bat
```

### macOS/Linux:
```bash
./start.sh
```

## Cách 2: Chạy thủ công

### Bước 1: Cài đặt dependencies
```bash
npm run install-all
```

### Bước 2: Tạo dữ liệu mẫu (tùy chọn)
```bash
npm run seed
```

### Bước 3: Chạy backend và frontend

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

## Cách 3: Chạy cả 2 cùng lúc
```bash
npm run dev
```

## 📍 Địa chỉ truy cập

- **Frontend:** http://localhost:3002
- **Backend API:** http://localhost:5002
- **Admin Panel:** http://localhost:3002/admin

## 🔐 Thông tin đăng nhập

**Admin:**
- Email: `admin@example.com`
- Password: `123456`

**Editor:**
- Email: `editor@example.com`
- Password: `123456`

## 📝 Lưu ý

- Đảm bảo đã cài đặt Node.js (v14 trở lên)
- Port 3002 và 5002 phải trống
- File `.env` sẽ được tạo tự động từ `.env.example`

## 🛠️ Các lệnh hữu ích

```bash
npm run install-all  # Cài đặt tất cả dependencies
npm run seed         # Tạo dữ liệu mẫu
npm run server       # Chỉ chạy backend
npm run client       # Chỉ chạy frontend
npm run dev          # Chạy cả backend và frontend
```

## 🔄 Chuyển sang MongoDB

1. Cài đặt MongoDB
2. Mở file `backend/.env`
3. Đổi `USE_JSON_STORAGE=true` thành `USE_JSON_STORAGE=false`
4. Cập nhật `MONGODB_URI` nếu cần
5. Restart backend server
