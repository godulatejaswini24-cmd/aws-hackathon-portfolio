# AWS Hackathon Portfolio - PowerShell Server Launcher
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  AWS Hackathon Portfolio - Local Server Launcher" -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

$port = 3000
$pyPath = "$env:LOCALAPPDATA\Programs\Python\Python314\python.exe"

if (Test-Path $pyPath) {
    Write-Host "[OK] Using Python from $pyPath" -ForegroundColor Green
    Write-Host "[*] Launching browser at http://localhost:$port" -ForegroundColor Cyan
    Start-Process "http://localhost:$port"
    Write-Host "[*] Server running... Press Ctrl+C to stop." -ForegroundColor White
    & $pyPath -m http.server $port
} elseif (Get-Command python -ErrorAction SilentlyContinue) {
    Write-Host "[OK] Using system python" -ForegroundColor Green
    Start-Process "http://localhost:$port"
    python -m http.server $port
} elseif (Get-Command npx -ErrorAction SilentlyContinue) {
    Write-Host "[OK] Using npx serve" -ForegroundColor Green
    npx serve . -l $port
} else {
    Write-Host "[!] Neither Python nor Node.js found. Opening index.html directly..." -ForegroundColor Yellow
    Start-Process "index.html"
}
