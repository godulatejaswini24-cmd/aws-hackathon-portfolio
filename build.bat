@echo off
setlocal
title Build Production Static Site for AWS

set "PY_EXE=%LOCALAPPDATA%\Programs\Python\Python314\python.exe"

if exist "%PY_EXE%" (
    "%PY_EXE%" build.py
    goto :done
)

where python >nul 2>&1
if %ERRORLEVEL% equ 0 (
    python build.py
    goto :done
)

echo [ERROR] Python not found. Please install Python or run build with Node.
pause
exit /b 1

:done
echo.
echo [INFO] Build completed. You can preview with:
echo        start-server.bat
pause
