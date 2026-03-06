#!/bin/bash

echo "🚀 Starting Backend Server..."
echo ""

cd backend

# Kiểm tra node_modules
if [ ! -d "node_modules" ]; then
  echo "📦 Installing backend dependencies..."
  npm install
  echo ""
fi

# Kiểm tra file .env
if [ ! -f ".env" ]; then
  echo "⚙️  Creating .env file..."
  cp .env.example .env
  echo ""
fi

# Kiểm tra thư mục uploads
if [ ! -d "uploads" ]; then
  echo "📁 Creating uploads directory..."
  mkdir uploads
  echo ""
fi

echo "✅ Backend is ready!"
echo "🌐 Server will run on http://localhost:5000"
echo ""

npm run dev
