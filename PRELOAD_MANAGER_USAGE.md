# PreloadManager Usage Guide

## Quick Start

The PreloadManager is automatically initialized in the main application. No manual setup required!

## How It Works

### 1. Card Hover Preloading
When you hover over a content card for 500ms, the PreloadManager automatically preloads the full-size detail page image.

**Benefits:**
- Detail pages load instantly when clicked
- Smoother user experience
- No waiting for images to load

**Example:**
```javascript
// Hover over a card for 500ms
// → PreloadManager starts preloading the detail image
// → If you move away before 500ms, preload is cancelled
// → If you stay, image is preloaded in background
```

### 2. Adjacent Cards Preloading
When you scroll a carousel, the PreloadManager preloads images for cards that are just outside the visible area.

**Benefits:**
- Smooth scrolling experience
- Cards appear instantly as you scroll
- No loading delays

**Configuration:**
- Preloads 2 cards before visible area
- Preloads 2 cards after visible area
- Triggered on scroll (throttled to 200ms)

### 3. Critical Images Preloading
On page load, the PreloadManager preloads images from the first row (About Me) and first few items from the second row (Education).

**Benefits:**
- Faster initial browsing
- Better first impression
- Reduced perceived load time

## API Reference

### Get Statistics
```javascript
const preloadManager = window.NetflixPortfolioApp.preloadManager();
const stats = preloadManager.getStats();

console.log(stats.preloadedCount);    // Number of preloaded images
console.log(stats.activeTimers);      // Number of active hover timers
console.log(stats.preloadedImages);   // Array of preloaded image URLs
```

### Reset Cache
```javascript
const preloadManager = window.NetflixPortfolioApp.preloadManager();
preloadManager.resetCache();  // Clear all preloaded images
```

### Clear Timers
```javascript
const preloadManager = window.NetflixPortfolioApp.preloadManager();
preloadManager.clearAllTimers();  // Cancel all active hover timers
```

## Configuration

Default settings (can be modified in `js/preload-manager.js`):

```javascript
this.preloadDelay = 500;              // 500ms hover delay
this.adjacentCardsToPreload = 2;      // 2 cards on each side
```

## Touch Devices

The PreloadManager automatically detects touch devices and disables hover preloading to prevent conflicts with touch interactions.

## Performance Tips

1. **Network Usage**: PreloadManager only preloads images that haven't been cached yet
2. **Memory Usage**: Minimal - only tracks URLs in a Set
3. **CPU Usage**: Negligible - uses native browser image preloading
4. **Battery Impact**: Low - preloading only happens on user interaction

## Debugging

### Check if PreloadManager is working:
```javascript
// Open browser console
const pm = window.NetflixPortfolioApp.preloadManager();
console.log(pm.getStats());
```

### Monitor preloading in real-time:
```javascript
// Watch for preloaded images
const pm = window.NetflixPortfolioApp.preloadManager();
setInterval(() => {
  console.log('Preloaded:', pm.getStats().preloadedCount);
}, 1000);
```

### Test hover preloading:
1. Open browser DevTools → Network tab
2. Filter by "Img"
3. Hover over a card for 500ms
4. Watch for image requests in Network tab

## Browser Compatibility

- ✓ Chrome 90+
- ✓ Firefox 88+
- ✓ Safari 14+
- ✓ Edge 90+
- ✓ Mobile browsers (with touch detection)

## Troubleshooting

### Images not preloading?
1. Check if you're on a touch device (hover preloading is disabled)
2. Verify you're hovering for at least 500ms
3. Check browser console for errors
4. Verify images exist in DataStore

### Too many network requests?
- PreloadManager caches preloaded images to prevent duplicates
- Only uncached images are preloaded
- Adjust `adjacentCardsToPreload` if needed

### Performance issues?
- PreloadManager is optimized for performance
- Uses native browser image preloading
- Throttles scroll events (200ms)
- Automatically cleans up timers

## Testing

Run the test suite:
1. Open `test-preload-manager.html` in browser
2. Run individual tests
3. Check statistics

Quick test:
1. Open `test-preload-simple.html` in browser
2. View test results

## Related Files

- `js/preload-manager.js` - Main implementation
- `js/main-netflix.js` - Initialization
- `js/view-manager.js` - Reinitialization on view changes
- `test-preload-manager.html` - Full test suite
- `test-preload-simple.html` - Quick test
- `verify-preload-manager.js` - Verification script

## Support

For issues or questions:
1. Check browser console for errors
2. Review `PRELOAD_MANAGER_IMPLEMENTATION.md` for details
3. Run test suite to verify functionality
