# GitHub Pages Deployment Guide

## Quick Start

Your portfolio is now ready for GitHub Pages! Follow these steps:

### 1. Initialize Git Repository (if not already done)

```bash
git init
git add .
git commit -m "Initial commit - Portfolio website ready for deployment"
```

### 2. Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right → "New repository"
3. Name your repository (e.g., `portfolio` or `rishabh-portfolio`)
4. Choose "Public" (required for free GitHub Pages)
5. Do NOT initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### 3. Push to GitHub

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push your code
git branch -M main
git push -u origin main
```

### 4. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source":
   - Select branch: `main`
   - Select folder: `/ (root)`
5. Click "Save"

### 5. Access Your Live Site

After 1-2 minutes, your site will be live at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

GitHub will show you the exact URL in the Pages settings.

## Important Notes

### File Structure
- Your main entry point is `index.html` (GitHub Pages looks for this automatically)
- All assets are referenced with relative paths, so they'll work on GitHub Pages
- No build process needed - it's pure HTML/CSS/JS

### Custom Domain (Optional)

If you want to use a custom domain like `rishabhdangi.com`:

1. Buy a domain from a registrar (Namecheap, GoDaddy, etc.)
2. In your repository settings → Pages → Custom domain, enter your domain
3. In your domain registrar's DNS settings, add:
   - Type: `A` Record
   - Host: `@`
   - Value: GitHub's IP addresses:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Or for subdomain (www): Type `CNAME`, Host `www`, Value `YOUR_USERNAME.github.io`

### Updating Your Site

Whenever you make changes:

```bash
git add .
git commit -m "Description of changes"
git push
```

GitHub Pages will automatically rebuild and deploy your site within 1-2 minutes.

## Troubleshooting

### Site Not Loading
- Wait 2-3 minutes after enabling Pages
- Check that you selected the correct branch and folder
- Ensure your repository is public

### Images Not Showing
- Verify all image paths are relative (no leading `/`)
- Check that images exist in `assets/images/`
- Ensure image filenames match exactly (case-sensitive)

### CSS/JS Not Loading
- Check browser console for errors (F12)
- Verify all file paths are relative
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

### 404 Error
- Make sure `index.html` exists in the root directory
- Check that the repository name in the URL matches your actual repo name

## Performance Tips

Your site is already optimized with:
- Lazy loading for images
- Minified CSS/JS (if you run the optimization scripts)
- Preloading for critical resources
- Mobile-responsive design

## Security

The site includes:
- Content Security Policy headers
- No external dependencies (except Google Fonts)
- No sensitive data exposure

## Next Steps

1. Update `README.md` with your actual GitHub Pages URL
2. Add your social media links in `js/view-manager.js` footer section
3. Replace placeholder images with your actual photos
4. Customize content in `js/data.js`

## Support

If you encounter issues:
1. Check [GitHub Pages documentation](https://docs.github.com/en/pages)
2. Verify your repository settings
3. Check browser console for JavaScript errors
4. Ensure all file paths are correct

---

**Your portfolio is ready to go live! 🚀**
