# ==============================================================================
# Automated AWS S3 + CloudFront Infrastructure Provisioner (PowerShell)
# ==============================================================================

param(
    [string]$BucketName = "portfolio-hackathon-$((Get-Date -UFormat %s).Substring(5, 5))",
    [string]$Region = $(if ($env:AWS_REGION) { $env:AWS_REGION } else { "us-east-1" })
)

$ErrorActionPreference = "Stop"

Write-Host "==================================================================" -ForegroundColor Cyan
Write-Host "⚡ Provisioning AWS Infrastructure for: $BucketName" -ForegroundColor Yellow
Write-Host "   Region: $Region" -ForegroundColor Cyan
Write-Host "==================================================================" -ForegroundColor Cyan

# Check AWS CLI
if (-not (Get-Command aws -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] AWS CLI not found in PATH. Please install it and run 'aws configure'." -ForegroundColor Red
    exit 1
}

$accountId = aws sts get-caller-identity --query "Account" --output text
Write-Host "[✓] Authenticated AWS Account: $accountId" -ForegroundColor Green

# Step 1: Create Private S3 Bucket
Write-Host "`n[1/5] Creating private S3 bucket: $BucketName..." -ForegroundColor Yellow
if ($Region -eq "us-east-1") {
    aws s3api create-bucket --bucket $BucketName --region $Region
} else {
    aws s3api create-bucket --bucket $BucketName --region $Region --create-bucket-configuration LocationConstraint=$Region
}

# Block Public Access
aws s3api put-public-access-block `
    --bucket $BucketName `
    --public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"
Write-Host "[✓] S3 bucket created and locked to private." -ForegroundColor Green

# Step 2: Create Origin Access Control (OAC)
Write-Host "`n[2/5] Creating CloudFront Origin Access Control (OAC)..." -ForegroundColor Yellow
$oacConfig = @"
{
  "Name": "$BucketName-oac",
  "Description": "OAC for $BucketName",
  "SigningProtocol": "sigv4",
  "SigningBehavior": "always",
  "OriginAccessControlOriginType": "s3"
}
"@

$oacId = aws cloudfront create-origin-access-control `
    --origin-access-control-config $oacConfig `
    --query "OriginAccessControl.Id" `
    --output text
Write-Host "[✓] Created OAC with ID: $oacId" -ForegroundColor Green

# Step 3: Create CloudFront Distribution with OAC & SPA Error Responses
Write-Host "`n[3/5] Creating CloudFront Distribution with SPA 403/404 routing..." -ForegroundColor Yellow

$s3Domain = "$BucketName.s3.$Region.amazonaws.com"
$callerRef = "portfolio-cf-$((Get-Date -UFormat %s))"

$distConfig = @"
{
  "CallerReference": "$callerRef",
  "Comment": "CloudFront distribution for $BucketName",
  "DefaultRootObject": "index.html",
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "S3-$BucketName",
        "DomainName": "$s3Domain",
        "OriginAccessControlId": "$oacId",
        "S3OriginConfig": {
          "OriginAccessIdentity": ""
        }
      }
    ]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-$BucketName",
    "ViewerProtocolPolicy": "redirect-to-https",
    "AllowedMethods": {
      "Quantity": 2,
      "Items": ["GET", "HEAD"],
      "CachedMethods": {
        "Quantity": 2,
        "Items": ["GET", "HEAD"]
      }
    },
    "Compress": true,
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": { "Forward": "none" }
    },
    "MinTTL": 0,
    "DefaultTTL": 86400,
    "MaxTTL": 31536000
  },
  "CustomErrorResponses": {
    "Quantity": 2,
    "Items": [
      {
        "ErrorCode": 403,
        "ResponsePagePath": "/index.html",
        "ResponseCode": "200",
        "ErrorCachingMinTTL": 10
      },
      {
        "ErrorCode": 404,
        "ResponsePagePath": "/index.html",
        "ResponseCode": "200",
        "ErrorCachingMinTTL": 10
      }
    ]
  },
  "Enabled": true
}
"@

# Save temp config file for CLI
$tempConfigPath = "$env:TEMP\cf-dist-config.json"
$distConfig | Out-File -FilePath $tempConfigPath -Encoding utf8

$distOutput = aws cloudfront create-distribution --distribution-config file://$tempConfigPath | ConvertFrom-Json
$distributionId = $distOutput.Distribution.Id
$cfDomain = $distOutput.Distribution.DomainName

Write-Host "[✓] CloudFront Distribution Created!" -ForegroundColor Green
Write-Host "    Distribution ID: $distributionId"
Write-Host "    Domain Name:     $cfDomain"

# Step 4: Attach S3 Bucket Policy for CloudFront OAC Read Access
Write-Host "`n[4/5] Attaching S3 Bucket Policy to authorize CloudFront..." -ForegroundColor Yellow
$bucketPolicy = @"
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipalReadOnly",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::$BucketName/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::$accountId`:distribution/$distributionId"
        }
      }
    }
  ]
}
"@

$tempPolicyPath = "$env:TEMP\s3-bucket-policy.json"
$bucketPolicy | Out-File -FilePath $tempPolicyPath -Encoding utf8

aws s3api put-bucket-policy --bucket $BucketName --policy file://$tempPolicyPath
Write-Host "[✓] S3 Bucket Policy successfully attached." -ForegroundColor Green

# Step 5: Build and Upload Initial Static Files
Write-Host "`n[5/5] Building and syncing site files..." -ForegroundColor Yellow
.\deploy.ps1 -BucketName $BucketName -DistributionId $distributionId

Write-Host ""
Write-Host "==================================================================" -ForegroundColor Green
Write-Host "🎉 INFRASTRUCTURE SETUP COMPLETE!" -ForegroundColor Green
Write-Host "==================================================================" -ForegroundColor Green
Write-Host "Bucket Name:      $BucketName"
Write-Host "Distribution ID:  $distributionId"
Write-Host "Live HTTPS URL:   https://$cfDomain" -ForegroundColor Cyan
Write-Host ""
Write-Host "For quick future redeployments, run:" -ForegroundColor Yellow
Write-Host ".\deploy.ps1 -BucketName '$BucketName' -DistributionId '$distributionId'" -ForegroundColor White
Write-Host "==================================================================" -ForegroundColor Green
