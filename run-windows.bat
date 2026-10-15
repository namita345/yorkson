@echo off
cd /d "%~dp0"
if not exist node_modules (
  echo Installing React and Vite packages...
  call npm install
  if errorlevel 1 (echo Installation failed. Check internet connection and Node.js version. & pause & exit /b 1)
)
echo Starting Yorkson website preview...
call npm run dev
pause
