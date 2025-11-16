# PowerShell script to assign random Unsplash images to portfolio items
Write-Host "🎨 Assigning Random Images to Portfolio Items" -ForegroundColor Cyan
Write-Host "============================================`n" -ForegroundColor Cyan

# Check if random folder has images
$randomFolder = "assets\images\random"
$randomImages = @()

if (Test-Path $randomFolder) {
    $randomImages = Get-ChildItem -Path $randomFolder -File -Include *.jpg,*.jpeg,*.png,*.webp | Select-Object -ExpandProperty Name
    if ($randomImages.Count -gt 0) {
        Write-Host "✅ Found $($randomImages.Count) images in random folder`n" -ForegroundColor Green
    } else {
        Write-Host "⚠️  No images found in random folder, will use Unsplash URLs`n" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠️  Random folder not found, will use Unsplash URLs`n" -ForegroundColor Yellow
}

# Unsplash random image URLs
$unsplashUrls = @{
    'about-me' = 'https://source.unsplash.com/random/800x1200/?portrait,professional'
    'education' = 'https://source.unsplash.com/random/800x1200/?education,books'
    'experience' = 'https://source.unsplash.com/random/800x1200/?office,work'
    'technical-activities' = 'https://source.unsplash.com/random/800x1200/?technology,electronics'
    'learning-and-courses' = 'https://source.unsplash.com/random/800x1200/?learning,course'
    'project' = 'https://source.unsplash.com/random/800x1200/?project,code'
    'award' = 'https://source.unsplash.com/random/800x1200/?trophy,award'
    'skills-and-interests' = 'https://source.unsplash.com/random/800x1200/?skills,hobby'
}

# Read data.js
$dataPath = "js\data.js"
$content = Get-Content -Path $dataPath -Raw

# Count empty images
$emptyImages = ([regex]::Matches($content, '(image|thumbnail):\s*[''"][\''"],?')).Count

if ($emptyImages -gt 0) {
    Write-Host "Found $emptyImages empty image fields`n" -ForegroundColor Yellow
    
    # Run Node.js script if available
    if (Get-Command node -ErrorAction SilentlyContinue) {
        Write-Host "Running image assignment script...`n" -ForegroundColor Cyan
        node assign-random-images.js
    } else {
        Write-Host "❌ Node.js not found. Please install Node.js or manually update data.js" -ForegroundColor Red
        Write-Host "`nAlternatively, you can:`n" -ForegroundColor Yellow
        Write-Host "1. Download images from Unsplash and save to assets\images\random\" -ForegroundColor White
        Write-Host "2. Manually update js\data.js with image paths" -ForegroundColor White
    }
} else {
    Write-Host "✅ All images are already assigned!" -ForegroundColor Green
}

Write-Host "`n✨ Done!" -ForegroundColor Cyan
