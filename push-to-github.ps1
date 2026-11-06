# ========================================================
# Push Portfolio Project to GitHub (PowerShell Script)
# ========================================================

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  Push Portfolio Project to GitHub" -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Verify Git
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] Git is not installed on this system." -ForegroundColor Red
    exit 1
}

# 2. Check Git User Config
$gitName = git config user.name
$gitEmail = git config user.email

if (-not $gitName) {
    Write-Host "[Setup] One-time setup: Configure Git identity" -ForegroundColor Yellow
    $name = Read-Host "Enter your name (e.g. Jane Doe)"
    $email = Read-Host "Enter your email (used for GitHub)"
    git config --global user.name $name
    git config --global user.email $email
    Write-Host "[✓] Git identity configured!" -ForegroundColor Green
    Write-Host ""
}

# 3. Initialize Git Repository
if (-not (Test-Path ".git")) {
    Write-Host "[*] Initializing local Git repository..." -ForegroundColor Cyan
    git init
    git branch -M main
}

# 4. Stage and Commit
Write-Host "[*] Staging files and creating commit..." -ForegroundColor Cyan
git add .
git commit -m "Initial commit: AWS Hackathon Portfolio with Interactive Cloud Terminal" 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "[✓] Initial commit created!" -ForegroundColor Green
} else {
    Write-Host "[INFO] Files already staged or committed." -ForegroundColor DarkGray
}

# 5. Get GitHub URL from user
Write-Host ""
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "Create a new empty repo at: https://github.com/new" -ForegroundColor Yellow
Write-Host "Paste the repository URL below (HTTPS):" -ForegroundColor White
Write-Host "Example: https://github.com/your-username/my-portfolio.git" -ForegroundColor DarkGray
Write-Host "========================================================" -ForegroundColor Cyan

$repoUrl = Read-Host "GitHub Repository URL"

if (-not $repoUrl) {
    Write-Host "[ERROR] No URL entered. Aborted." -ForegroundColor Red
    exit 1
}

# 6. Configure Remote and Push
git remote remove origin 2>$null
git remote add origin $repoUrl

Write-Host "`n[*] Pushing code to GitHub ($repoUrl)..." -ForegroundColor Cyan
Write-Host "[!] If prompted, choose 'Sign in with your browser' to authorize." -ForegroundColor Yellow

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================================" -ForegroundColor Green
    Write-Host "🎉 SUCCESS! Your code is now live on GitHub!" -ForegroundColor Green
    Write-Host "Refresh your GitHub repo page to see your files." -ForegroundColor Cyan
    Write-Host "========================================================" -ForegroundColor Green
} else {
    Write-Host "`n[ERROR] Push failed. Make sure your GitHub URL is correct and you have permission." -ForegroundColor Red
}
