@echo off
setlocal
title AWS Hackathon Portfolio - Local Server

echo ========================================================
echo   AWS Hackathon Portfolio - Minimal ^& Techy
echo ========================================================
echo.

set "PORT=3000"
set "PY_EXE=%LOCALAPPDATA%\Programs\Python\Python314\python.exe"

:: Check if Python is installed in AppData
if exist "%PY_EXE%" (
    echo [OK] Found Python at %PY_EXE%
    echo [*] Starting local HTTP server at http://localhost:%PORT%
    echo [*] Press Ctrl+C in this window to stop the server.
    echo.
    start http://localhost:%PORT%
    "%PY_EXE%" -m http.server %PORT%
    goto :eof
)

:: Check if python is in PATH
where python >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo [OK] Found python in system PATH
    echo [*] Starting local HTTP server at http://localhost:%PORT%
    echo.
    start http://localhost:%PORT%
    python -m http.server %PORT%
    goto :eof
)

:: Check if npx is available
where npx >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo [OK] Found Node / npx in system PATH
    echo [*] Starting server with npx serve at http://localhost:%PORT%
    echo.
    npx serve . -l %PORT%
    goto :eof
)

echo [!] Notice: Neither Python nor Node.js was found in standard PATH.
echo [*] Opening index.html directly in your default browser...
start index.html

pause
