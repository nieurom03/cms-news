# 🧪 Test Đăng Nhập

## Thông tin đăng nhập

### Admin
- **Email:** `admin@example.com`
- **Password:** `123456`
- **Role:** admin

### Editor
- **Email:** `editor@example.com`
- **Password:** `123456`
- **Role:** editor

## Kiểm tra trước khi đăng nhập

### 1. Backend đang chạy
```bash
# Kiểm tra backend
curl http://localhost:5000/api/articles

# Hoặc mở trình duyệt
http://localhost:5000/api/articles
```

### 2. Dữ liệu users đã có
```bash
# Kiểm tra file users
cat backend/storage/users.json

# Hoặc chạy script test
cd backend
node test-login.js
```

### 3. Frontend cấu hình đúng
Kiểm tra `frontend/.env`:
```env
PORT=3001
REACT_APP_API_URL=http://localhost:5000/api
```

## Test API trực tiếp

### Test login với curl
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"123456"}'
```

Kết quả mong đợi:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "username": "admin",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

## Xử lý lỗi thường gặp

### Lỗi: "Email hoặc mật khẩu không đúng"

**Nguyên nhân:** Mật khẩu trong database không đúng

**Giải pháp:**
```bash
cd backend
npm run seed
```

### Lỗi: "Network Error"

**Nguyên nhân:** Backend chưa chạy hoặc URL sai

**Giải pháp:**
1. Chạy backend:
   ```bash
   cd backend
   npm start
   ```

2. Kiểm tra URL trong `frontend/.env`:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

3. Restart frontend sau khi đổi .env

### Lỗi: "Cannot POST /api/auth/login"

**Nguyên nhân:** Route không được đăng ký

**Giải pháp:** Kiểm tra `backend/server.js` có dòng:
```javascript
app.use('/api/auth', require('./routes/auth'));
```

## Debug trong trình duyệt

1. Mở DevTools (F12)
2. Tab Network
3. Thử đăng nhập
4. Xem request đến `/api/auth/login`
5. Kiểm tra:
   - Request URL có đúng không?
   - Status code là gì?
   - Response message là gì?

## Tạo lại user mới

Nếu muốn tạo user mới:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "123456",
    "role": "editor"
  }'
```

## Reset toàn bộ dữ liệu

```bash
cd backend
npm run seed
```

Lệnh này sẽ:
- Xóa tất cả users cũ
- Tạo lại admin và editor với mật khẩu "123456"
- Tạo lại dữ liệu mẫu (articles, categories, ads)
