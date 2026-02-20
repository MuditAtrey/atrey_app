# Cloudflare Pages Deployment Guide

This project is configured for Cloudflare Pages hosting.

## Deployment Settings

When setting up your project in Cloudflare Pages dashboard, use these settings:

### Build Configuration
- **Framework preset**: None (Static HTML)
- **Build command**: (leave empty or blank)
- **Build output directory**: (leave empty or use `.`)
- **Root directory**: `/main`

### Environment Variables
None required for this static site.

## Project Structure
```
atrey_app/
├── main/                  # Root directory for Cloudflare Pages
│   ├── index.html        # Your main HTML file
│   ├── styles.css        # Psychedelic CSS animations
│   ├── resources/        # Put your gif1.gif here
│   └── _headers          # Cloudflare headers for caching/security
└── README.md             # This file
```

**Note:** Since your root directory is set to `/main`, Cloudflare only sees files inside the `main` folder.

## Deployment Methods

### Method 1: Git Integration (Recommended)
1. Push your code to GitHub/GitLab
2. Go to Cloudflare Pages dashboard
3. Click "Create a project" → "Connect to Git"
4. Select your repository
5. Use the build settings above
6. Click "Save and Deploy"

### Method 2: Direct Upload
1. Go to Cloudflare Pages dashboard
2. Click "Create a project" → "Direct Upload"
3. Upload the contents of the `main` folder
4. Your site will be live  (from project root)
```bash
# Login to Cloudflare
npx wrangler login

# Deploy the main folderect-name=atrey-app

# Or with npx (no install needed)
npx wrangler pages deploy main --project-name=atrey-app
```

## Local Development
Simply open `main/index.html` in a browser, or use a local server:

```bash
# Python 3
cd main && python3 -m http.server 8000

# Node.js (npx)
cd main && npx serve
```

## Notes
- The `resources` folder is currently empty. Make sure to add your `gif1.gif` file there before deploying.
- All paths are relative, so the site will work on any domain.
