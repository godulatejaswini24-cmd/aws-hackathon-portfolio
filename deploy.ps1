# ==============================================================================
# AWS S3 + CloudFront Deployment Script (PowerShell for Windows)
# ==============================================================================

param (
    [string]$BucketName = $env:AWS_BUCKET_NAME,
    [string]$DistributionId = $env:AWS_DISTRIBUTION_ID,
    [string]$Region = $(if ($env:AWS_REGION) { $env:AWS_REGION } else { "us-east-1" })
)

$ErrorActionPreference = "Stop"

Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "  🚀 Deploying AWS Portfolio to S3 + CloudFront" -ForegroundColor Yellow
Write-Host "================================================================" -ForegroundColor Cyan

if (-not $BucketName) {
    Write-Host "[ERROR] BucketName parameter is required!" -ForegroundColor Red
    Write-Host "Usage: .\deploy.ps1 -BucketName 'my-bucket-name' -DistributionId 'EDISTID123'" -ForegroundColor White
    exit 1
}

# 1. Run Production Build
Write-Host "`n[Step 1/4] Running production static build..." -ForegroundColor Yellow
$py = "$env:LOCALAPPDATA\Programs\Python\Python314\python.exe"
if (Test-Path $py) {
    & $py build.py
} elseif (Get-Command python -ErrorAction SilentlyContinue) {
    python build.py
} else {
    Write-Host "[ERROR] Python is required to run build.py." -ForegroundColor Red
    exit 1
}

if (-not (Test-Path "dist")) {
    Write-Host "[ERROR] dist/ folder not found after build!" -ForegroundColor Red
    exit 1
}

# 2. Sync to S3
Write-Host "`n[Step 2/4] Syncing assets to s3://$BucketName/..." -ForegroundColor Yellow
aws s3 sync dist/ "s3://$BucketName/" `
    --region $Region `
    --exclude "index.html" `
    --exclude "*.html" `
    --cache-control "public, max-age=31536000, immutable" `
    --delete

aws s3 cp dist/index.html "s3://$BucketName/index.html" `
    --region $Region `
    --cache-control "public, max-age=0, must-revalidate" `
    --content-type "text/html"

Write-Host "[✓] S3 sync completed successfully." -ForegroundColor Green

# 3. Invalidate CloudFront Cache
if ($DistributionId) {
    Write-Host "`n[Step 3/4] Creating CloudFront cache invalidation..." -ForegroundColor Yellow
    $invalidationId = aws cloudfront create-invalidation `
        --distribution-id $DistributionId `
        --paths "/*" `
        --query "Invalidation.Id" `
        --output text

    Write-Host "[✓] Invalidation created with ID: $invalidationId" -ForegroundColor Green

    $domainName = aws cloudfront get-distribution `
        --id $DistributionId `
        --query "Distribution.DomainName" `
        --output text

    Write-Host "`n[Step 4/4] Verifying endpoint..." -ForegroundColor Yellow
    if ($domainName) {
        Write-Host "================================================================" -ForegroundColor Green
        Write-Host "🎉 Deployment Complete! Your site is live globally at:" -ForegroundColor Green
        Write-Host "👉 https://$domainName" -ForegroundColor Cyan
        Write-Host "================================================================" -ForegroundColor Green
    }
} else {
    Write-Host "`n[Notice] DistributionId was not provided. Skipped cache invalidation." -ForegroundColor Yellow
}
