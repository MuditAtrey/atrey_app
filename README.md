# Cloudflare Pages Deployment Guide

Complete guide for hosting this static psychedelic page on Cloudflare Pages with your custom domain (atrey.app).

## Step 1: Configure Your Cloudflare Pages Project

### Build Settings (for your static site)
When in your Cloudflare Pages project settings, configure:

- **Framework preset**: None
- **Build command**: Leave empty OR use `exit 0`
- **Build output directory**: `.` (just a dot)
- **Root directory**: `/main`
- **Deploy command**: If required, use `exit 0` (this tells it there's nothing to deploy/build)

### Alternative Build Settings (if above doesn't work)
- **Framework preset**: None  
- **Build command**: `echo "Static site - no build needed"`
- **Build output directory**: Leave empty
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

## Step 2: Deploy Your Site

### Method 1: Git Integration (Recommended - Auto-deploys on push)
1. Push your code to GitHub/GitLab
2. Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/?to=/:account/pages)
3. Click **"Create a project"** → **"Connect to Git"**
4. Select your repository (`MuditAtrey/atrey_app`)
5. Configure build settings (see Step 1 above)
6. Click **"Save and Deploy"**
7. Wait ~1 minute for deployment to complete

### Method 2: Direct Upload (Quick & Simple)
1. Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/?to=/:account/pages)
2. Click **"Create a project"** → **"Direct Upload"**
3. Drag and drop ALL files from the `main` folder
4. Your site goes live immediately

### Method 3: Wrangler CLI
```bash
# Login to Cloudflare account
npx wrangler login

# Deploy the main folder as a Pages site
npx wrangler pages deploy main --project-name=atrey-app
```

## Step 3: Connect Your Custom Domain (atrey.app)

Once your site is deployed:

1. Go to your Cloudflare Pages project
2. Click **"Custom domains"** tab
3. Click **"Set up a custom domain"**
4. Enter: `atrey.app` (or `www.atrey.app`)
5. Click **"Continue"**
6. Cloudflare will automatically configure DNS if your domain is already on Cloudflare
7. Wait 5-10 minutes for SSL certificate to activate

### Adding Both Root and WWW
To make both `atrey.app` and `www.atrey.app` work:
1. Add `atrey.app` as custom domain
2. Add `www.atrey.app` as another custom domain
3. Both will point to your psychedelic page!

### DNS Records (Cloudflare handles this automatically)
If you need to verify, your DNS should have:
- **A record** or **CNAME** for `@` (root domain) pointing to your Pages project
- **CNAME** for `www` pointing to your Pages project

## Step 4: Verify & Test

After deployment completes:
1. Visit your `*.pages.dev` URL (provided by Cloudflare)
2. Visit `atrey.app` (after DNS propagates, ~5-10 min)
3. You should see your psychedelic spinning GIF page!

## Troubleshooting

### "Failed to find build output directory"
- Set **Build output directory** to `.` (just a dot)
- Or leave it completely empty

### "Deploy command failed"
- Use `exit 0` as the deploy/build command
- Or try `echo "Static site"`

### GIF not showing
- Make sure `gif1.gif` is in the `main/resources/` folder before deploying

### Domain not working
- Wait 10-15 minutes for DNS propagation
- Check that domain nameservers point to Cloudflare
- Verify custom domain is added in Pages project settings

### Build takes too long
- Static sites should deploy in under 30 seconds

## Local Development (Optional)

To preview locally before deploying:

```bash
# Python 3
cd main && python3 -m http.server 8000

# Node.js
cd main && npx serve
```

Then open http://localhost:8000 in your browser
Build command: (empty)
Build output directory: .
Root directory: /main
Deploy command: exit 0
```

**Files Cloudflare will serve from `/main/`:**
- `index.html` - Your HTML
- `styles.css` - Psychedelic animations
- `_headers` - Caching config
- `resources/gif1.gif` - Your GIF (add this!)

That's it! Your psychedelic page will be live on atrey.app 🌈✨
# Node.js (npx)
cd main && npx serve
```

## Notes
- The `resources` folder is currently empty. Make sure to add your `gif1.gif` file there before deploying.
- All paths are relative, so the site will work on any domain.
