# 🔧 Xử lý sự cố

## Port đã bị chiếm

### Lỗi: "Something is already running on port 3000"

**Giải pháp 1: Đổi port (Nhanh nhất)**

Chỉnh sửa `frontend/.env`:
```env
PORT=3001  # Hoặc port khác: 3002, 4000, 8080...
REACT_APP_API_URL=http://localhost:5000/api
```

Sau đó chạy lại frontend.

**Giải pháp 2: Tắt ứng dụng đang chiếm port**

macOS/Linux:
```bash
# Tìm process đang dùng port 3000
lsof -i :3000

# Tắt process (thay PID bằng số hiển thị)
kill -9 PID
```

Windows:
```cmd
# Tìm process đang dùng port 3000
netstat -ano | findstr :3000

# Tắt process (thay PID bằng số hiển thị)
taskkill /PID PID /F
```

**Giải pháp 3: Chạy với port khác ngay lập tức**

```bash
# macOS/Linux
cd frontend
PORT=3001 npm start

# Windows
cd frontend
set PORT=3001 && npm start
```

## Lỗi Network Error / CORS

### Lỗi: "AxiosError: Network Error"

**Kiểm tra:**
1. Backend có đang chạy không?
   ```bash
   curl http://localhost:5000/api/articles
   ```

2. Port backend đúng chưa?
   - Kiểm tra `backend/.env` → PORT=5000
   - Kiểm tra `frontend/.env` → REACT_APP_API_URL=http://localhost:5000/api

3. CORS đã được cấu hình trong `backend/server.js`

**Sửa lỗi:**
```bash
# Restart cả backend và frontend
# Terminal 1
cd backend
npm start

# Terminal 2
cd frontend
npm start
```

## Lỗi khi đăng nhập

### Lỗi: "Email hoặc mật khẩu không đúng"

**Kiểm tra:**
1. Đã chạy seed data chưa?
   ```bash
   cd backend
   npm run seed
   ```

2. Thông tin đăng nhập:
   - Email: `admin@example.com`
   - Password: `123456`

## Lỗi dependencies

### Lỗi: "Cannot find module..."

**Sửa lỗi:**
```bash
# Cài lại tất cả dependencies
npm run install-all

# Hoặc cài từng phần
cd backend && npm install
cd ../frontend && npm install
```

## Backend không kết nối MongoDB

### Lỗi: "Error connecting to MongoDB"

**Giải pháp:**
Dùng JSON storage thay vì MongoDB (mặc định):

Chỉnh sửa `backend/.env`:
```env
USE_JSON_STORAGE=true
```

Nếu muốn dùng MongoDB:
```env
USE_JSON_STORAGE=false
MONGODB_URI=mongodb://localhost:27017/news-cms
```

## Không thấy dữ liệu

### Trang chủ trống

**Kiểm tra:**
1. Có dữ liệu trong `backend/storage/articles.json` không?
2. Backend có chạy không?
3. Console có lỗi không? (F12 → Console)

**Sửa lỗi:**
```bash
# Tạo lại dữ liệu mẫu
cd backend
npm run seed
```

## Upload ảnh lỗi

### Lỗi: "Cannot POST /api/upload"

**Kiểm tra:**
Thư mục `backend/uploads` có tồn tại không?

```bash
mkdir -p backend/uploads
```

## Tips hữu ích

### Xóa cache và restart

```bash
# Xóa node_modules và cài lại
rm -rf node_modules backend/node_modules frontend/node_modules
npm run install-all

# Xóa cache React
cd frontend
rm -rf node_modules/.cache
```

### Kiểm tra log

```bash
# Backend log
cd backend
npm start

# Frontend log
cd frontend
npm start
```

### Reset dữ liệu

```bash
# Xóa tất cả dữ liệu JSON
cd backend/storage
echo "[]" > articles.json
echo "[]" > categories.json
echo "[]" > ads.json
echo "[]" > users.json

# Tạo lại dữ liệu mẫu
cd ..
npm run seed
```
