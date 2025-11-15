#!/bin/bash

###############################################################################
# Image Compression Script
# Requirement 13.2 - Compress all images to <200KB
#
# This script compresses images using ImageMagick and cwebp
# 
# Prerequisites:
#   - ImageMagick: sudo apt-get install imagemagick (Linux)
#                  brew install imagemagick (Mac)
#   - WebP tools: sudo apt-get install webp (Linux)
#                 brew install webp (Mac)
#
# Usage: ./scripts/compress-images.sh
###############################################################################

# Configuration
MAX_SIZE_KB=200
JPEG_QUALITY=82
WEBP_QUALITY=80
MAX_WIDTH=1920
MAX_HEIGHT=1080
THUMBNAIL_MAX_WIDTH=800
THUMBNAIL_MAX_HEIGHT=450

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
total_processed=0
total_compressed=0
total_skipped=0

echo "========================================================================"
echo "Image Compression Script"
echo "Target: All images < ${MAX_SIZE_KB}KB"
echo "========================================================================"
echo ""

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo -e "${RED}Error: ImageMagick is not installed${NC}"
    echo "Install with: brew install imagemagick (Mac) or sudo apt-get install imagemagick (Linux)"
    exit 1
fi

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo -e "${YELLOW}Warning: cwebp is not installed. WebP conversion will be skipped.${NC}"
    echo "Install with: brew install webp (Mac) or sudo apt-get install webp (Linux)"
    echo ""
fi

# Function to get file size in KB
get_file_size_kb() {
    local file="$1"
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        stat -f%z "$file" | awk '{print int($1/1024)}'
    else
        # Linux
        stat -c%s "$file" | awk '{print int($1/1024)}'
    fi
}

# Function to compress JPEG/JPG
compress_jpeg() {
    local input="$1"
    local output="${input%.*}_compressed.jpg"
    local temp="${input%.*}_temp.jpg"
    
    echo "  Compressing JPEG..."
    
    # Resize if too large
    convert "$input" -resize "${MAX_WIDTH}x${MAX_HEIGHT}>" -quality ${JPEG_QUALITY} "$temp"
    
    # Check if compressed size is acceptable
    local size=$(get_file_size_kb "$temp")
    
    if [ $size -le $MAX_SIZE_KB ]; then
        mv "$temp" "$output"
        echo -e "  ${GREEN}✓ Compressed to ${size}KB${NC}"
        echo "  Output: $output"
        return 0
    else
        # Try lower quality
        convert "$input" -resize "${MAX_WIDTH}x${MAX_HEIGHT}>" -quality 75 "$temp"
        size=$(get_file_size_kb "$temp")
        
        if [ $size -le $MAX_SIZE_KB ]; then
            mv "$temp" "$output"
            echo -e "  ${GREEN}✓ Compressed to ${size}KB (quality 75)${NC}"
            echo "  Output: $output"
            return 0
        else
            rm -f "$temp"
            echo -e "  ${RED}✗ Could not compress below ${MAX_SIZE_KB}KB${NC}"
            echo "  Consider manual optimization or converting to WebP"
            return 1
        fi
    fi
}

# Function to compress PNG
compress_png() {
    local input="$1"
    local output="${input%.*}_compressed.png"
    local temp="${input%.*}_temp.png"
    
    echo "  Compressing PNG..."
    
    # Resize and compress
    convert "$input" -resize "${MAX_WIDTH}x${MAX_HEIGHT}>" -quality 85 -define png:compression-level=9 "$temp"
    
    local size=$(get_file_size_kb "$temp")
    
    if [ $size -le $MAX_SIZE_KB ]; then
        mv "$temp" "$output"
        echo -e "  ${GREEN}✓ Compressed to ${size}KB${NC}"
        echo "  Output: $output"
        return 0
    else
        rm -f "$temp"
        echo -e "  ${YELLOW}! PNG is large. Consider converting to JPEG or WebP${NC}"
        
        # Try converting to JPEG
        local jpeg_output="${input%.*}_compressed.jpg"
        convert "$input" -resize "${MAX_WIDTH}x${MAX_HEIGHT}>" -quality ${JPEG_QUALITY} "$jpeg_output"
        size=$(get_file_size_kb "$jpeg_output")
        
        if [ $size -le $MAX_SIZE_KB ]; then
            echo -e "  ${GREEN}✓ Converted to JPEG: ${size}KB${NC}"
            echo "  Output: $jpeg_output"
            return 0
        else
            rm -f "$jpeg_output"
            return 1
        fi
    fi
}

# Function to create WebP version
create_webp() {
    local input="$1"
    local output="${input%.*}.webp"
    
    if command -v cwebp &> /dev/null; then
        echo "  Creating WebP version..."
        cwebp -q ${WEBP_QUALITY} "$input" -o "$output" 2>/dev/null
        
        if [ -f "$output" ]; then
            local size=$(get_file_size_kb "$output")
            echo -e "  ${GREEN}✓ WebP created: ${size}KB${NC}"
            echo "  Output: $output"
        fi
    fi
}

# Function to process image
process_image() {
    local file="$1"
    local size=$(get_file_size_kb "$file")
    local filename=$(basename "$file")
    
    echo ""
    echo "Processing: $filename"
    echo "  Current size: ${size}KB"
    
    total_processed=$((total_processed + 1))
    
    # Skip if already optimized
    if [ $size -le $MAX_SIZE_KB ]; then
        echo -e "  ${GREEN}✓ Already optimized${NC}"
        total_skipped=$((total_skipped + 1))
        return 0
    fi
    
    echo -e "  ${YELLOW}! Needs compression (${size}KB > ${MAX_SIZE_KB}KB)${NC}"
    
    # Get file extension
    local ext="${filename##*.}"
    ext=$(echo "$ext" | tr '[:upper:]' '[:lower:]')
    
    # Compress based on type
    case "$ext" in
        jpg|jpeg)
            if compress_jpeg "$file"; then
                total_compressed=$((total_compressed + 1))
                create_webp "${file%.*}_compressed.jpg"
            fi
            ;;
        png)
            if compress_png "$file"; then
                total_compressed=$((total_compressed + 1))
                create_webp "${file%.*}_compressed.png"
            fi
            ;;
        *)
            echo "  Unsupported format: $ext"
            ;;
    esac
}

# Find and process all images
echo "Scanning for images..."
echo ""

# Process images in assets/images directory
if [ -d "assets/images" ]; then
    while IFS= read -r -d '' file; do
        process_image "$file"
    done < <(find assets/images -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -print0)
fi

# Summary
echo ""
echo "========================================================================"
echo "Compression Summary"
echo "========================================================================"
echo "Total images processed: $total_processed"
echo "Images compressed: $total_compressed"
echo "Images already optimized: $total_skipped"
echo ""

if [ $total_compressed -gt 0 ]; then
    echo -e "${GREEN}✓ Compression complete!${NC}"
    echo ""
    echo "Compressed images are saved with '_compressed' suffix."
    echo "Review the compressed images and replace originals if satisfied."
    echo ""
    echo "To replace originals:"
    echo "  find assets/images -name '*_compressed.*' -exec bash -c 'mv \"\$0\" \"\${0/_compressed/}\"' {} \;"
else
    echo -e "${GREEN}✓ All images are already optimized!${NC}"
fi

echo ""
echo "========================================================================"
