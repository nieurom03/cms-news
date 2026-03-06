# 📚 Cấu trúc API

API được chia thành 2 level: **Public** (cho frontend page) và **Admin** (cho admin page).

## 🌐 Public API (Không cần authentication)

Base URL: `/api/public`

### Articles (Bài viết)

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/public/articles` | Lấy danh sách bài viết đã xuất bản |
| GET | `/api/public/articles/:slug` | Lấy chi tiết bài viết (tự động tăng views) |

**Response Example:**
```json
{
  "id": "1",
  "title": "Tiêu đề bài viết",
  "slug": "tieu-de-bai-viet",
  "content": "<p>Nội dung...</p>",
  "excerpt": "Tóm tắt",
  "featuredImage": "https://...",
  "category": "2",
  "status": "published",
  "views": 100,
  "createdAt": "2024-02-01T10:00:00.000Z"
}
```

### Categories (Danh mục)

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/public/categories` | Lấy danh sách danh mục |
| GET | `/api/public/categories/:slug/articles` | Lấy bài viết theo danh mục |

### Ads (Quảng cáo)

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/public/ads` | Lấy quảng cáo đang hoạt động |
| GET | `/api/public/ads/position/:position` | Lấy quảng cáo theo vị trí (header, sidebar, footer) |

---

## 🔐 Admin API (Cần authentication)

Base URL: `/api/admin`

**Headers required:**
```
Authorization: Bearer <token>
```

### Articles (Bài viết)

| Method | Endpoint | Mô tả | Permission |
|--------|----------|-------|------------|
| GET | `/api/admin/articles` | Lấy tất cả bài viết (kể cả draft) | Auth |
| GET | `/api/admin/articles/:id` | Lấy chi tiết bài viết | Auth |
| POST | `/api/admin/articles` | Tạo bài viết mới | Auth |
| PUT | `/api/admin/articles/:id` | Cập nhật bài viết | Auth |
| DELETE | `/api/admin/articles/:id` | Xóa bài viết | Auth |

**Create/Update Body:**
```json
{
  "title": "Tiêu đề",
  "slug": "tieu-de",
  "content": "<p>Nội dung HTML</p>",
  "excerpt": "Tóm tắt",
  "featuredImage": "https://...",
  "category": "category_id",
  "status": "draft" | "published"
}
```

### Categories (Danh mục)

| Method | Endpoint | Mô tả | Permission |
|--------|----------|-------|------------|
| GET | `/api/admin/categories` | Lấy tất cả danh mục | Auth |
| POST | `/api/admin/categories` | Tạo danh mục mới | Auth |
| PUT | `/api/admin/categories/:id` | Cập nhật danh mục | Auth |
| DELETE | `/api/admin/categories/:id` | Xóa danh mục | Auth |

**Create/Update Body:**
```json
{
  "name": "Tên danh mục",
  "slug": "ten-danh-muc",
  "description": "Mô tả"
}
```

### Ads (Quảng cáo)

| Method | Endpoint | Mô tả | Permission |
|--------|----------|-------|------------|
| GET | `/api/admin/ads` | Lấy tất cả quảng cáo | Auth |
| POST | `/api/admin/ads` | Tạo quảng cáo mới | Admin only |
| PUT | `/api/admin/ads/:id` | Cập nhật quảng cáo | Admin only |
| DELETE | `/api/admin/ads/:id` | Xóa quảng cáo | Admin only |

**Create/Update Body:**
```json
{
  "title": "Tiêu đề quảng cáo",
  "image": "https://...",
  "link": "https://...",
  "position": "header" | "sidebar" | "footer" | "content",
  "active": true | false
}
```

### Users (Người dùng)

| Method | Endpoint | Mô tả | Permission |
|--------|----------|-------|------------|
| GET | `/api/admin/users` | Lấy danh sách users | Admin only |
| POST | `/api/admin/users` | Tạo user mới | Admin only |
| PUT | `/api/admin/users/:id` | Cập nhật user | Admin only |
| DELETE | `/api/admin/users/:id` | Xóa user | Admin only |

**Create/Update Body:**
```json
{
  "username": "username",
  "email": "email@example.com",
  "password": "password",
  "role": "admin" | "editor"
}
```

### Upload (Tải lên)

| Method | Endpoint | Mô tả | Permission |
|--------|----------|-------|------------|
| POST | `/api/admin/upload` | Upload hình ảnh | Auth |

**Form Data:**
```
image: File
```

**Response:**
```json
{
  "url": "/uploads/1234567890.jpg"
}
```

---

## 🔑 Authentication API

Base URL: `/api/auth`

### Login

**POST** `/api/auth/login`

**Body:**
```json
{
  "email": "admin@example.com",
  "password": "123456"
}
```

**Response:**
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

### Register

**POST** `/api/auth/register`

**Body:**
```json
{
  "username": "newuser",
  "email": "user@example.com",
  "password": "password",
  "role": "editor"
}
```

---

## 🔒 Permission Levels

1. **Public** - Không cần authentication
2. **Auth** - Cần đăng nhập (admin hoặc editor)
3. **Admin only** - Chỉ admin mới có quyền

---

## 📝 Error Responses

### 400 Bad Request
```json
{
  "message": "Email đã tồn tại"
}
```

### 401 Unauthorized
```json
{
  "message": "Không có token xác thực"
}
```

### 403 Forbidden
```json
{
  "message": "Chỉ admin mới có quyền truy cập"
}
```

### 404 Not Found
```json
{
  "message": "Không tìm thấy bài viết"
}
```

### 500 Internal Server Error
```json
{
  "message": "Error message"
}
```

---

## 🧪 Testing API

### Với curl:

```bash
# Public API
curl http://localhost:5000/api/public/articles

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"123456"}'

# Admin API (với token)
curl http://localhost:5000/api/admin/articles \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Với Postman/Insomnia:

1. Import collection từ file này
2. Set environment variable `API_URL` = `http://localhost:5000`
3. Login để lấy token
4. Set token vào Authorization header

---

## 🔄 Migration từ API cũ

API cũ vẫn hoạt động để backward compatibility:
- `/api/articles` → `/api/public/articles` (public) hoặc `/api/admin/articles` (admin)
- `/api/categories` → `/api/public/categories` hoặc `/api/admin/categories`
- `/api/ads` → `/api/public/ads` hoặc `/api/admin/ads`

**Khuyến nghị:** Cập nhật frontend để sử dụng API mới.
