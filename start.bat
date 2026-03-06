@echo off
echo.
echo ========================================
echo    CMS Quan ly Tin tuc
echo ========================================
echo.

REM Cau hinh port (co the thay doi)
if not defined BACKEND_PORT set BACKEND_PORT=5002
if not defined FRONTEND_PORT set FRONTEND_PORT=3002

REM Kiem tra node_modules
if not exist "backend\node_modules" (
    echo Dang cai dat dependencies...
    call npm run install-all
    echo.
)

REM Kiem tra file .env
if not exist "backend\.env" (
    echo Tao file .env...
    copy backend\.env.example backend\.env
    echo.
)

if not exist "frontend\.env" (
    echo Tao file frontend\.env...
    copy frontend\.env.example frontend\.env
    echo.
)

echo Backend: http://localhost:%BACKEND_PORT%
echo Frontend: http://localhost:%FRONTEND_PORT%
echo.
echo Thong tin dang nhap:
echo Email: admin@example.com
echo Password: 123456
echo.
echo Nhan Ctrl+C de dung server
echo ========================================
echo.

REM Chay backend va frontend
start "Backend Server" cmd /k "cd backend && set PORT=%BACKEND_PORT% && npm start"
timeout /t 3 /nobreak > nul
start "Frontend Server" cmd /k "cd frontend && set PORT=%FRONTEND_PORT% && npm start"

echo.
echo Servers dang chay...
pause
