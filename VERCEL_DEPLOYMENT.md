# Vercel Deployment Guide

## Connect Your GitHub Repository to Vercel

### Method 1: Via Vercel Dashboard (Recommended)

1. Visit: https://vercel.com/dashboard
2. Log in with your account: **anshojha-12312163**
3. Click on your project: **https-github-com-anshojha-12312163**
4. Go to **Settings** → **Git**
5. Click **"Connect Git Repository"**
6. Authorize Vercel to access your GitHub
7. Select repository: `anshojha-12312163/https-github.com-anshojha-12312163-cosmic-portfolio-new`
8. Click **"Connect"**

### Method 2: Import New Project from GitHub

1. Visit: https://vercel.com/new
2. Click **"Import Git Repository"**
3. Paste your repo URL: `https://github.com/anshojha-12312163/https-github.com-anshojha-12312163-cosmic-portfolio-new`
4. Click **"Import"**
5. Configure project:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
6. Click **"Deploy"**

### Benefits of GitHub Connection

Once connected, Vercel will automatically:
- Deploy on every push to `main` branch
- Create preview deployments for pull requests
- Show deployment status in GitHub commits
- Enable rollback to previous deployments

### Your URLs

- **Production**: https://https-github-com-anshojha-12312163.vercel.app
- **GitHub Repo**: https://github.com/anshojha-12312163/https-github.com-anshojha-12312163-cosmic-portfolio-new

### Automatic Deployments

After connecting, every time you run:
```bash
git push origin main
```

Vercel will automatically build and deploy your latest changes!
