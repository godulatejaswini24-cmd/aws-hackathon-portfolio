@echo off
setlocal
title Push Portfolio to GitHub

echo ========================================================
echo   Pushing Portfolio to GitHub...
echo   Repository: https://github.com/godulatejaswini24-cmd/aws-hackathon-portfolio.git
echo ========================================================
echo.

cd /d "%~dp0"

:: 1. Check Git
where git >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Git is not installed or not in PATH.
    pause
    exit /b 1
)

:: 2. Configure Git user if not set
git config user.name "Priyanka"
git config user.email "priyanka@users.noreply.github.com"

:: 3. Ensure Remote is correctly set
git remote remove origin >nul 2>&1
git remote add origin https://github.com/godulatejaswini24-cmd/aws-hackathon-portfolio.git

:: 4. Stage and commit any latest changes
git add .
git commit -m "Deploy: Complete AWS Hackathon Portfolio" >nul 2>&1

:: 5. Push to GitHub
echo [*] Uploading code to GitHub...
echo [!] A browser window will open asking you to sign in to GitHub.
echo     Please click "Sign in with your browser" to allow the upload.
echo.

git push -u origin main

if %ERRORLEVEL% equ 0 (
    echo.
    echo ========================================================
    echo [SUCCESS] Your code is now live on GitHub!
    echo Visit: https://github.com/godulatejaswini24-cmd/aws-hackathon-portfolio
    echo ========================================================
) else (
    echo.
    echo [!] If push failed, please make sure you approved the sign-in prompt.
)

echo.
pause
