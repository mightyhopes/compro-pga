@echo off
echo ===================================================
echo  PT. PGA Company Profile - Git Initialization
echo ===================================================
echo.

:: Check if git is installed
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Git is not installed or not in your PATH.
    echo Please install Git from https://git-scm.com/ and try again.
    pause
    exit /b
)

:: Check if already a git repository
if exist .git (
    echo Git repository is already initialized.
) else (
    echo [1/3] Initializing Git repository...
    git init
)

echo.
echo [2/3] Staging files...
git add .

echo.
echo [3/3] Creating first commit...
git commit -m "feat: initial commit for PT. PGA company profile website"

echo.
echo ===================================================
echo  SUCCESS: Git repository prepared!
echo ===================================================
echo.
echo To push this to GitHub:
echo 1. Create a repository on GitHub (e.g., "pga-compro")
echo 2. Run the following commands in your terminal:
echo    git branch -M main
echo    git remote add origin https://github.com/YOUR_USERNAME/pga-compro.git
echo    git push -u origin main
echo.
pause
