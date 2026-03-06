# ⚙️ Cấu hình Port

## Cách 1: Sử dụng file .env (Khuyên dùng)

### Backend
Chỉnh sửa `backend/.env`:
```env
PORT=5000
```

### Frontend
Chỉnh sửa `frontend/.env`:
```env
PORT=3000
REACT_APP_API_URL=http://localhost:5000/api
```

Sau đó restart server.

## Cách 2: Sử dụng biến môi trường

### macOS/Linux:
```bash
# Chạy với port tùy chỉnh
BACKEND_PORT=8000 FRONTEND_PORT=4000 ./start.sh

# Hoặc export trước
export BACKEND_PORT=8000
export FRONTEND_PORT=4000
./start.sh
```

### Windows:
```cmd
# Chạy với port tùy chỉnh
set BACKEND_PORT=8000
set FRONTEND_PORT=4000
start.bat
```

## Cách 3: Chạy thủ công với port tùy chỉnh

### Backend:
```bash
cd backend
PORT=8000 npm start
```

### Frontend:
```bash
cd frontend
PORT=4000 npm start
```

## Lưu ý quan trọng

1. Nếu đổi port backend, nhớ cập nhật `REACT_APP_API_URL` trong `frontend/.env`
2. Sau khi đổi port, cần restart cả backend và frontend
3. Đảm bảo port không bị chiếm bởi ứng dụng khác
4. CORS đã được cấu hình cho port 3000, 3001, 3002. Nếu dùng port khác, cần cập nhật `backend/server.js`

## Kiểm tra port đang sử dụng

### macOS/Linux:
```bash
# Kiểm tra port 5000
lsof -i :5000

# Kiểm tra port 3000
lsof -i :3000
```

### Windows:
```cmd
# Kiểm tra port 5000
netstat -ano | findstr :5000

# Kiểm tra port 3000
netstat -ano | findstr :3000
```
