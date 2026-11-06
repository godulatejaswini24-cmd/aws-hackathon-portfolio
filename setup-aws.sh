#!/usr/bin/env bash
# ==============================================================================
# Automated AWS S3 + CloudFront Infrastructure Provisioner
# Creates:
# 1. Private S3 Bucket with Block Public Access
# 2. CloudFront Origin Access Control (OAC)
# 3. CloudFront Distribution (OAC, HTTPS redirect, SPA 403/404 error responses)
# 4. S3 Bucket Policy granting CloudFront read permissions
# 5. Production build upload and final CloudFront URL output
# ==============================================================================

set -e

# Default settings (customize as needed)
UNIQUE_ID=$(date +%s | cut -c6-10)
BUCKET_NAME="${1:-portfolio-hackathon-${UNIQUE_ID}}"
REGION="${AWS_REGION:-us-east-1}"

echo "=================================================================="
echo "⚡ Provisioning AWS Infrastructure for: ${BUCKET_NAME}"
echo "   Region: ${REGION}"
echo "=================================================================="

# Check AWS CLI
if ! command -v aws &> /dev/null; then
  echo "[ERROR] AWS CLI not found in PATH. Please install it and run 'aws configure'."
  exit 1
fi

ACCOUNT_ID=$(aws sts get-caller-identity --query "Account" --output text)
echo "[✓] Authenticated AWS Account: ${ACCOUNT_ID}"

# Step 1: Create Private S3 Bucket
echo -e "\n[1/5] Creating private S3 bucket: ${BUCKET_NAME}..."
if [ "$REGION" = "us-east-1" ]; then
  aws s3api create-bucket --bucket "${BUCKET_NAME}" --region "${REGION}"
else
  aws s3api create-bucket \
    --bucket "${BUCKET_NAME}" \
    --region "${REGION}" \
    --create-bucket-configuration LocationConstraint="${REGION}"
fi

# Enable S3 Block Public Access (ensures bucket is 100% private)
aws s3api put-public-access-block \
  --bucket "${BUCKET_NAME}" \
  --public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"
echo "[✓] S3 bucket created and locked to private."

# Step 2: Create Origin Access Control (OAC)
echo -e "\n[2/5] Creating CloudFront Origin Access Control (OAC)..."
OAC_CONFIG='{
  "Name": "'"${BUCKET_NAME}"'-oac",
  "Description": "OAC for '"${BUCKET_NAME}"'",
  "SigningProtocol": "sigv4",
  "SigningBehavior": "always",
  "OriginAccessControlOriginType": "s3"
}'

OAC_ID=$(aws cloudfront create-origin-access-control \
  --origin-access-control-config "${OAC_CONFIG}" \
  --query "OriginAccessControl.Id" \
  --output text)
echo "[✓] Created OAC with ID: ${OAC_ID}"

# Step 3: Create CloudFront Distribution with OAC & SPA Error Responses
echo -e "\n[3/5] Creating CloudFront Distribution with SPA 403/404 routing..."

S3_DOMAIN="${BUCKET_NAME}.s3.${REGION}.amazonaws.com"
CALLER_REF="portfolio-cf-$(date +%s)"

DIST_CONFIG='{
  "CallerReference": "'"${CALLER_REF}"'",
  "Comment": "CloudFront distribution for '"${BUCKET_NAME}"'",
  "DefaultRootObject": "index.html",
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "S3-'"${BUCKET_NAME}"'",
        "DomainName": "'"${S3_DOMAIN}"'",
        "OriginAccessControlId": "'"${OAC_ID}"'",
        "S3OriginConfig": {
          "OriginAccessIdentity": ""
        }
      }
    ]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-'"${BUCKET_NAME}"'",
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
}'

DIST_OUTPUT=$(aws cloudfront create-distribution --distribution-config "${DIST_CONFIG}")
DISTRIBUTION_ID=$(echo "${DIST_OUTPUT}" | grep -o '"Id": "[^"]*' | head -1 | cut -d'"' -f4)
CF_DOMAIN=$(echo "${DIST_OUTPUT}" | grep -o '"DomainName": "[^"]*' | head -1 | cut -d'"' -f4)

echo "[✓] CloudFront Distribution Created!"
echo "    Distribution ID: ${DISTRIBUTION_ID}"
echo "    Domain Name:     ${CF_DOMAIN}"

# Step 4: Attach S3 Bucket Policy for CloudFront OAC Read Access
echo -e "\n[4/5] Attaching S3 Bucket Policy to authorize CloudFront..."
BUCKET_POLICY='{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipalReadOnly",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::'"${BUCKET_NAME}"'/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::'${ACCOUNT_ID}':distribution/'${DISTRIBUTION_ID}'"
        }
      }
    }
  ]
}'

aws s3api put-bucket-policy --bucket "${BUCKET_NAME}" --policy "${BUCKET_POLICY}"
echo "[✓] S3 Bucket Policy successfully attached."

# Step 5: Build and Upload Initial Static Files
echo -e "\n[5/5] Building and syncing site files..."
AWS_BUCKET_NAME="${BUCKET_NAME}" AWS_DISTRIBUTION_ID="${DISTRIBUTION_ID}" ./deploy.sh

echo ""
echo "=================================================================="
echo "🎉 INFRASTRUCTURE SETUP COMPLETE!"
echo "=================================================================="
echo "Bucket Name:      ${BUCKET_NAME}"
echo "Distribution ID:  ${DISTRIBUTION_ID}"
echo "Live HTTPS URL:   https://${CF_DOMAIN}"
echo ""
echo "Save these environment variables for future deployments:"
echo "export AWS_BUCKET_NAME=\"${BUCKET_NAME}\""
echo "export AWS_DISTRIBUTION_ID=\"${DISTRIBUTION_ID}\""
echo "=================================================================="
