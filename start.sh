#!/bin/bash

# Cấu hình port (có thể thay đổi)
BACKEND_PORT=${BACKEND_PORT:-5002}
FRONTEND_PORT=${FRONTEND_PORT:-3002}

echo "🚀 Khởi động CMS Quản lý Tin tức..."
echo ""

# Kiểm tra node_modules
if [ ! -d "backend/node_modules" ] || [ ! -d "frontend/node_modules" ]; then
    echo "📦 Đang cài đặt dependencies..."
    npm run install-all
    echo ""
fi

# Kiểm tra file .env
if [ ! -f "backend/.env" ]; then
    echo "⚙️  Tạo file .env..."
    cp backend/.env.example backend/.env
    echo ""
fi

if [ ! -f "frontend/.env" ]; then
    echo "⚙️  Tạo file frontend/.env..."
    cp frontend/.env.example frontend/.env
    echo ""
fi

echo "🔧 Backend đang khởi động trên http://localhost:$BACKEND_PORT"
echo "🎨 Frontend đang khởi động trên http://localhost:$FRONTEND_PORT"
echo ""
echo "Thông tin đăng nhập:"
echo "Email: admin@example.com"
echo "Password: 123456"
echo ""
echo "Nhấn Ctrl+C để dừng server"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Chạy backend và frontend
cd backend && PORT=$BACKEND_PORT npm start &
BACKEND_PID=$!

cd ../frontend && PORT=$FRONTEND_PORT npm start &
FRONTEND_PID=$!

# Xử lý khi nhấn Ctrl+C
trap "echo ''; echo '🛑 Đang dừng server...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT

# Chờ các process
wait
