"""
Production Static Site Builder
Builds a self-contained, optimized 'dist/' static directory ready for Amazon S3 + CloudFront deployment.
"""

import os
import shutil
import re
import sys

# Ensure UTF-8 output on Windows consoles
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

ROOT = os.path.dirname(os.path.abspath(__file__))
DIST = os.path.join(ROOT, "dist")

def minify_css(css_content):
    # Remove CSS comments
    css = re.sub(r'/\*[\s\S]*?\*/', '', css_content)
    # Collapse multiple whitespaces
    css = re.sub(r'\s+', ' ', css)
    # Remove space around punctuation
    css = re.sub(r'\s*([\{\}:;,>])\s*', r'\1', css)
    return css.strip()

def build():
    print("=" * 60)
    print("[*] Building Production Static Artifacts for AWS S3 + CloudFront")
    print("=" * 60)

    # 1. Clean previous dist
    if os.path.exists(DIST):
        shutil.rmtree(DIST)
        print("[-] Cleaned existing dist/ directory.")
    os.makedirs(DIST, exist_ok=True)

    # 2. Copy index.html
    src_index = os.path.join(ROOT, "index.html")
    dist_index = os.path.join(DIST, "index.html")
    shutil.copy2(src_index, dist_index)
    print(f"[OK] Built {os.path.relpath(dist_index, ROOT)} ({os.path.getsize(dist_index)} bytes)")

    # 3. Copy src/ tree
    src_dir = os.path.join(ROOT, "src")
    dist_src = os.path.join(DIST, "src")
    shutil.copytree(src_dir, dist_src)
    print(f"[OK] Copied modular src/ tree to dist/src/")

    # 4. Minify CSS
    dist_css = os.path.join(dist_src, "styles", "design-system.css")
    if os.path.exists(dist_css):
        with open(dist_css, "r", encoding="utf-8") as f:
            raw_css = f.read()
        min_css = minify_css(raw_css)
        with open(dist_css, "w", encoding="utf-8") as f:
            f.write(min_css)
        savings = round((1 - len(min_css)/len(raw_css))*100, 1)
        print(f"[OK] Minified CSS: {len(raw_css)} bytes -> {len(min_css)} bytes ({savings}% savings)")

    # 5. Copy README
    readme = os.path.join(ROOT, "README.md")
    if os.path.exists(readme):
        shutil.copy2(readme, os.path.join(DIST, "README.md"))

    # 6. Build verification audit
    required_files = [
        "index.html",
        "src/main.js",
        "src/data/data.js",
        "src/styles/design-system.css",
        "src/components/Navbar.js",
        "src/components/Hero.js",
        "src/components/About.js",
        "src/components/Skills.js",
        "src/components/Projects.js",
        "src/components/CreativeSlot.js",
        "src/components/Contact.js",
        "src/components/Footer.js",
        "src/components/Terminal.js",
        "src/components/ThemeToggle.js",
        "src/assets/favicon.svg",
        "src/assets/og-image.svg",
        "src/assets/aws-cloud.svg"
    ]

    all_exist = True
    total_size = 0
    for req in required_files:
        full_path = os.path.join(DIST, req)
        if os.path.exists(full_path):
            size = os.path.getsize(full_path)
            total_size += size
        else:
            print(f"[ERROR] Missing required build artifact: {req}")
            all_exist = False

    if all_exist:
        print("-" * 60)
        print(f"[SUCCESS] Production Build Succeeded!")
        print(f"[OUTPUT] Total Output Size: {round(total_size / 1024, 2)} KB across {len(required_files)} verified files.")
        print(f"[DEPLOY] S3 Deploy Command: aws s3 sync dist/ s3://<your-bucket-name>")
        print("-" * 60)
        return True
    else:
        print("[FAIL] Build audit failed.")
        return False

if __name__ == "__main__":
    success = build()
    exit(0 if success else 1)
