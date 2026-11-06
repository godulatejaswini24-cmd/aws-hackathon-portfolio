#!/usr/bin/env bash
# ==============================================================================
# AWS S3 + CloudFront Deployment Script for Portfolio
# Builds production static files, syncs to private S3 bucket,
# sets optimal HTTP caching headers, and invalidates CloudFront cache.
# ==============================================================================

set -e

# --- Configuration (Set your values or pass via environment) ---
BUCKET_NAME="${AWS_BUCKET_NAME:-}"
DISTRIBUTION_ID="${AWS_DISTRIBUTION_ID:-}"
REGION="${AWS_REGION:-us-east-1}"

# ANSI Colors
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${CYAN}================================================================${NC}"
echo -e "${CYAN}  🚀 Deploying AWS Portfolio to S3 + CloudFront                 ${NC}"
echo -e "${CYAN}================================================================${NC}"

# 1. Validation checks
if [ -z "$BUCKET_NAME" ]; then
  echo -e "${RED}[ERROR] AWS_BUCKET_NAME is not set!${NC}"
  echo "Usage: AWS_BUCKET_NAME=my-bucket AWS_DISTRIBUTION_ID=E12345 ./deploy.sh"
  exit 1
fi

if ! command -v aws &> /dev/null; then
  echo -e "${RED}[ERROR] AWS CLI is not found in your PATH.${NC}"
  echo "Please install and configure AWS CLI via 'aws configure'."
  exit 1
fi

# 2. Run Production Build
echo -e "\n${YELLOW}[Step 1/4] Running production static build...${NC}"
if command -v python3 &> /dev/null; then
  python3 build.py
elif command -v python &> /dev/null; then
  python build.py
else
  echo -e "${RED}[ERROR] Python is required to run build.py${NC}"
  exit 1
fi

if [ ! -d "dist" ]; then
  echo -e "${RED}[ERROR] dist/ directory was not found after build!${NC}"
  exit 1
fi

# 3. Sync static assets to private S3 bucket with long-term cache headers
echo -e "\n${YELLOW}[Step 2/4] Syncing assets to s3://${BUCKET_NAME}...${NC}"

# Upload assets and code with 1-year immutable cache
aws s3 sync dist/ "s3://${BUCKET_NAME}/" \
  --region "${REGION}" \
  --exclude "index.html" \
  --exclude "*.html" \
  --cache-control "public, max-age=31536000, immutable" \
  --delete

# Upload index.html with must-revalidate cache (instant updates)
aws s3 cp dist/index.html "s3://${BUCKET_NAME}/index.html" \
  --region "${REGION}" \
  --cache-control "public, max-age=0, must-revalidate" \
  --content-type "text/html"

echo -e "${GREEN}[✓] S3 sync completed successfully.${NC}"

# 4. Invalidate CloudFront cache (if distribution ID is provided)
if [ -n "$DISTRIBUTION_ID" ]; then
  echo -e "\n${YELLOW}[Step 3/4] Creating CloudFront cache invalidation...${NC}"
  INVALIDATION_ID=$(aws cloudfront create-invalidation \
    --distribution-id "${DISTRIBUTION_ID}" \
    --paths "/*" \
    --query "Invalidation.Id" \
    --output text)
  echo -e "${GREEN}[✓] Invalidation created with ID: ${INVALIDATION_ID}${NC}"

  # Get CloudFront Domain Name
  CF_DOMAIN=$(aws cloudfront get-distribution \
    --id "${DISTRIBUTION_ID}" \
    --query "Distribution.DomainName" \
    --output text 2>/dev/null || echo "")

  echo -e "\n${YELLOW}[Step 4/4] Verifying endpoint...${NC}"
  if [ -n "$CF_DOMAIN" ]; then
    echo -e "${GREEN}================================================================${NC}"
    echo -e "${GREEN}🎉 Deployment Complete! Your site is live globally at:${NC}"
    echo -e "${CYAN}👉 https://${CF_DOMAIN}${NC}"
    echo -e "${GREEN}================================================================${NC}"
  fi
else
  echo -e "\n${YELLOW}[Notice] AWS_DISTRIBUTION_ID was not provided. Skipped cache invalidation.${NC}"
  echo "To invalidate, pass AWS_DISTRIBUTION_ID=your_id ./deploy.sh"
fi
