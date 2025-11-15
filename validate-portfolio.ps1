# Portfolio Validation Script for PowerShell
# Validates HTML, CSS, and JavaScript for cross-browser compatibility

Write-Host "`n============================================================" -ForegroundColor Cyan
Write-Host "Portfolio Validation Suite" -ForegroundColor White
Write-Host "============================================================`n" -ForegroundColor Cyan

$passed = 0
$failed = 0
$warnings = 0

function Test-Item-Exists {
    param($Path, $Description)
    
    if (Test-Path $Path) {
        Write-Host "[PASS] $Description" -ForegroundColor Green
        $script:passed++
        return $true
    } else {
        Write-Host "[FAIL] $Description - Not found: $Path" -ForegroundColor Red
        $script:failed++
        return $false
    }
}

function Test-Content {
    param($Path, $Pattern, $Description)
    
    if (Test-Path $Path) {
        $content = Get-Content $Path -Raw
        if ($content -match $Pattern) {
            Write-Host "[PASS] $Description" -ForegroundColor Green
            $script:passed++
            return $true
        } else {
            Write-Host "[FAIL] $Description" -ForegroundColor Red
            $script:failed++
            return $false
        }
    } else {
        Write-Host "[FAIL] $Description - File not found: $Path" -ForegroundColor Red
        $script:failed++
        return $false
    }
}

function Write-Warning-Test {
    param($Description)
    Write-Host "[WARN] $Description" -ForegroundColor Yellow
    $script:warnings++
}

# File Structure Validation
Write-Host "`n--- File Structure Validation ---`n" -ForegroundColor Cyan

Test-Item-Exists "index-netflix.html" "Main HTML file exists"
Test-Item-Exists "README-NETFLIX.md" "README file exists"
Test-Item-Exists "css" "CSS directory exists"
Test-Item-Exists "js" "JavaScript directory exists"
Test-Item-Exists "assets" "Assets directory exists"

# HTML Validation
Write-Host "`n--- HTML Validation ---`n" -ForegroundColor Cyan

if (Test-Path "index-netflix.html") {
    $html = Get-Content "index-netflix.html" -Raw
    
    # DOCTYPE
    if ($html -match '<!DOCTYPE html>') {
        Write-Host "[PASS] DOCTYPE declaration" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "[FAIL] DOCTYPE declaration" -ForegroundColor Red
        $failed++
    }
    
    # HTML lang attribute
    if ($html -match '<html[^>]+lang=') {
        Write-Host "[PASS] HTML lang attribute" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "[FAIL] HTML lang attribute" -ForegroundColor Red
        $failed++
    }
    
    # Meta charset
    if ($html -match '<meta charset="UTF-8">') {
        Write-Host "[PASS] Meta charset UTF-8" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "[FAIL] Meta charset UTF-8" -ForegroundColor Red
        $failed++
    }
    
    # Viewport meta
    if ($html -match 'name="viewport"') {
        Write-Host "[PASS] Viewport meta tag" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "[FAIL] Viewport meta tag" -ForegroundColor Red
        $failed++
    }
    
    # Title tag
    if ($html -match '<title>.*</title>') {
        Write-Host "[PASS] Title tag present" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "[FAIL] Title tag present" -ForegroundColor Red
        $failed++
    }
    
    # Semantic HTML5 elements
    $semanticElements = @('<header', '<main', '<footer', '<nav')
    foreach ($element in $semanticElements) {
        if ($html -match [regex]::Escape($element)) {
            Write-Host "[PASS] Semantic element $element>" -ForegroundColor Green
            $passed++
        } else {
            Write-Host "[FAIL] Semantic element $element>" -ForegroundColor Red
            $failed++
        }
    }
    
    # ARIA attributes
    if ($html -match 'aria-label|aria-labelledby|role=') {
        Write-Host "[PASS] ARIA attributes present" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "[FAIL] ARIA attributes present" -ForegroundColor Red
        $failed++
    }
}

# CSS File Validation
Write-Host "`n--- CSS File Validation ---`n" -ForegroundColor Cyan

$cssFiles = @(
    "css/reset.css",
    "css/variables.css",
    "css/layout.css",
    "css/components.css",
    "css/animations.css",
    "css/performance.css",
    "css/loading-states.css",
    "css/error-handling.css",
    "css/mobile-optimization.css"
)

foreach ($file in $cssFiles) {
    Test-Item-Exists $file "CSS file: $file"
}

# Check CSS custom properties in variables.css
if (Test-Path "css/variables.css") {
    $css = Get-Content "css/variables.css" -Raw
    if ($css -match '--[a-z-]+:') {
        Write-Host "[PASS] CSS custom properties defined" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "[FAIL] CSS custom properties defined" -ForegroundColor Red
        $failed++
    }
}

# JavaScript File Validation
Write-Host "`n--- JavaScript File Validation ---`n" -ForegroundColor Cyan

$jsFiles = @(
    "js/data.js",
    "js/router.js",
    "js/view-manager.js",
    "js/row-carousel.js",
    "js/error-handler.js",
    "js/loading-states.js",
    "js/lazy-loader.js",
    "js/preload-manager.js",
    "js/touch-handler.js",
    "js/keyboard-navigation.js",
    "js/search.js",
    "js/category-filter.js",
    "js/back-navigation.js",
    "js/mobile-menu.js",
    "js/main-netflix.js"
)

foreach ($file in $jsFiles) {
    Test-Item-Exists $file "JS file: $file"
}

# Performance Checks
Write-Host "`n--- Performance Checks ---`n" -ForegroundColor Cyan

if (Test-Path "css") {
    Get-ChildItem "css/*.css" | ForEach-Object {
        $sizeKB = [math]::Round($_.Length / 1KB, 2)
        if ($sizeKB -lt 50) {
            Write-Host "[PASS] $($_.Name) size ($sizeKB KB)" -ForegroundColor Green
            $script:passed++
        } else {
            Write-Warning-Test "$($_.Name) size ($sizeKB KB) - Consider minification"
        }
    }
}

if (Test-Path "js") {
    Get-ChildItem "js/*.js" | ForEach-Object {
        $sizeKB = [math]::Round($_.Length / 1KB, 2)
        if ($sizeKB -lt 100) {
            Write-Host "[PASS] $($_.Name) size ($sizeKB KB)" -ForegroundColor Green
            $script:passed++
        } else {
            Write-Warning-Test "$($_.Name) size ($sizeKB KB) - Consider minification"
        }
    }
}

# Browser Compatibility Checks
Write-Host "`n--- Browser Compatibility Checks ---`n" -ForegroundColor Cyan

$allCSS = ""
if (Test-Path "css") {
    Get-ChildItem "css/*.css" | ForEach-Object {
        $allCSS += Get-Content $_.FullName -Raw
    }
}

$modernFeatures = @(
    @{Name="CSS Grid"; Pattern="display:\s*grid"},
    @{Name="CSS Flexbox"; Pattern="display:\s*flex"},
    @{Name="CSS Custom Properties"; Pattern="var\(--"},
    @{Name="CSS Transforms"; Pattern="transform:"},
    @{Name="CSS Transitions"; Pattern="transition:"}
)

foreach ($feature in $modernFeatures) {
    if ($allCSS -match $feature.Pattern) {
        Write-Host "[PASS] Uses $($feature.Name)" -ForegroundColor Green
        $passed++
    }
}

# Accessibility Checks
Write-Host "`n--- Accessibility Checks ---`n" -ForegroundColor Cyan

if (Test-Path "index-netflix.html") {
    $html = Get-Content "index-netflix.html" -Raw
    
    # Focus styles
    if ($allCSS -match ':focus') {
        Write-Host "[PASS] Focus styles defined" -ForegroundColor Green
        $passed++
    } else {
        Write-Warning-Test "No focus styles defined"
    }
    
    # Reduced motion support
    if ($allCSS -match '@media.*prefers-reduced-motion') {
        Write-Host "[PASS] Reduced motion support" -ForegroundColor Green
        $passed++
    } else {
        Write-Warning-Test "No reduced motion support"
    }
}

# Summary
Write-Host "`n============================================================" -ForegroundColor Cyan
Write-Host "Validation Summary" -ForegroundColor White
Write-Host "============================================================`n" -ForegroundColor Cyan

$total = $passed + $failed + $warnings
$passRate = if ($total -gt 0) { [math]::Round(($passed / $total) * 100, 1) } else { 0 }

Write-Host "Total Tests: $total" -ForegroundColor White
Write-Host "Passed: $passed" -ForegroundColor Green
Write-Host "Failed: $failed" -ForegroundColor Red
Write-Host "Warnings: $warnings" -ForegroundColor Yellow
Write-Host "Pass Rate: $passRate%" -ForegroundColor $(if ($passRate -ge 90) { "Green" } elseif ($passRate -ge 70) { "Yellow" } else { "Red" })

Write-Host ""

if ($failed -eq 0) {
    Write-Host "[SUCCESS] All critical tests passed!" -ForegroundColor Green
} else {
    Write-Host "[ATTENTION] Some tests failed. Please review the issues above." -ForegroundColor Red
}

if ($warnings -gt 0) {
    Write-Host "[INFO] $warnings warnings detected. Consider addressing them." -ForegroundColor Yellow
}

Write-Host ""

# Save report
$report = @{
    timestamp = Get-Date -Format "yyyy-MM-ddTHH:mm:ss"
    summary = @{
        total = $total
        passed = $passed
        failed = $failed
        warnings = $warnings
        passRate = $passRate
    }
} | ConvertTo-Json

$report | Out-File "validation-report.json" -Encoding UTF8
Write-Host "Report saved to validation-report.json" -ForegroundColor Cyan
Write-Host ""
