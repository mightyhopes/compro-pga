@echo off
echo ===================================================
echo  PT. PGA Company Profile - Startup & Asset Copy
echo ===================================================
echo.
echo [1/2] Re-organizing and copying assets...
python rename_assets.py
if %errorlevel% neq 0 (
    echo Error: Failed to copy assets. Please make sure Python is installed.
)
echo.
echo [2/2] Starting local web server...
npm run dev
pause
