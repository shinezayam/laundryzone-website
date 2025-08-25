# LaundryZone Website Deployment Guide

## 🚀 Deploy to GitHub & Vercel

### Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Repository name: `laundryzone-website`
5. Description: `LaundryZone Mongolia - Modern laundry service website`
6. Make it **Public** (required for free Vercel deployment)
7. **DO NOT** initialize with README, .gitignore, or license (we already have these)
8. Click "Create repository"

### Step 2: Push to GitHub

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/laundryzone-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

1. Go to [Vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import your `laundryzone-website` repository
4. Vercel will automatically detect it's a Next.js project
5. Keep all default settings:
   - Framework Preset: Next.js
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)
6. Click "Deploy"

### Step 4: Configure Environment Variables (if needed)

If you have any environment variables, add them in Vercel:
1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add any required variables

### Step 5: Custom Domain (Optional)

1. In Vercel project settings, go to "Domains"
2. Add your custom domain (e.g., `laundryzone.mn`)
3. Follow the DNS configuration instructions

## 🌐 Your Website URL

After deployment, your website will be available at:
- **Vercel URL**: `https://laundryzone-website.vercel.app` (or similar)
- **Custom Domain**: `https://your-domain.com` (if configured)

## 📝 Important Notes

- The website supports 3 languages: English, Mongolian, and Korean
- All translations are included in the `/messages` folder
- The website is fully responsive and optimized for mobile
- All images and assets are included in the repository

## 🔧 Local Development

To run the website locally:

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to see your website.

## 📞 Support

If you encounter any issues during deployment, check:
1. Vercel deployment logs
2. GitHub repository settings
3. Environment variables configuration
