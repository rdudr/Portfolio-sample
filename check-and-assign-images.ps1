# PowerShell Script to Check and Assign Random Images
Write-Host "`n🎨 Portfolio Image Assignment Tool" -ForegroundColor Cyan
Write-Host "==================================`n" -ForegroundColor Cyan

# Check for images in random folder
$randomPath = "assets\images\random"
Write-Host "📁 Checking folder: $randomPath" -ForegroundColor Yellow

if (Test-Path $randomPath) {
    $images = Get-ChildItem -Path $randomPath -File -Include *.jpg,*.jpeg,*.png,*.webp,*.JPG,*.JPEG,*.PNG,*.WEBP
    
    if ($images.Count -gt 0) {
        Write-Host "✅ Found $($images.Count) images!`n" -ForegroundColor Green
        
        Write-Host "Images found:" -ForegroundColor Cyan
        $images | ForEach-Object { Write-Host "  - $($_.Name)" -ForegroundColor White }
        
        Write-Host "`n📝 Creating image assignment list..." -ForegroundColor Yellow
        
        # Create a simple mapping file
        $mapping = @"
# Image Assignment Mapping
# Copy these paths to your data.js file

"@
        
        $counter = 1
        foreach ($img in $images) {
            $path = "assets/images/random/$($img.Name)"
            $mapping += "`nImage $counter : '$path'"
            $counter++
        }
        
        $mapping | Out-File -FilePath "image-paths.txt" -Encoding UTF8
        Write-Host "✅ Created image-paths.txt with all image paths" -ForegroundColor Green
        
        Write-Host "`n📋 Next steps:" -ForegroundColor Cyan
        Write-Host "1. Open image-paths.txt to see all available image paths" -ForegroundColor White
        Write-Host "2. Open js\data.js in your editor" -ForegroundColor White
        Write-Host "3. Replace empty image: '' and thumbnail: '' with paths from image-paths.txt" -ForegroundColor White
        Write-Host "`nOr let me know and I can update data.js automatically!" -ForegroundColor Yellow
        
    } else {
        Write-Host "❌ No images found in $randomPath" -ForegroundColor Red
        Write-Host "`n💡 Please add images (.jpg, .png, .webp) to this folder:" -ForegroundColor Yellow
        Write-Host "   $((Get-Location).Path)\$randomPath" -ForegroundColor White
    }
} else {
    Write-Host "❌ Folder not found: $randomPath" -ForegroundColor Red
    Write-Host "Creating folder..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $randomPath -Force | Out-Null
    Write-Host "✅ Created folder. Please add images to it." -ForegroundColor Green
}

Write-Host "`n✨ Done!`n" -ForegroundColor Cyan
