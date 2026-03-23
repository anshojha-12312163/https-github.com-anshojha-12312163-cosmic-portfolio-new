# Image Setup Guide

This guide will help you add professional images to your portfolio for projects and certificates.

## Required Images

### 1. Project Images
Add the following images to `cosmic-portfolio/public/` folder:

- `vedix-ai.png` or `vedix-ai.jpg` - Screenshot of Vedix AI platform
- `smartcity-ai.png` or `smartcity-ai.jpg` - Screenshot of SmartCity AI dashboard
- `analytics-dashboard.png` or `analytics-dashboard.jpg` - Screenshot of Analytics Dashboard

**Recommended dimensions:** 800x600px or 16:9 aspect ratio

### 2. Certificate Images
Add the following certificate images to `cosmic-portfolio/public/certificates/` folder:

- `sql-hackerrank.png` - HackerRank SQL Advanced Certificate
- `dsa-w3grads.png` - DSA with Java/C++ Certificate
- `oop-imneo.png` - OOP Certificate
- `freecodecamp-rwd.png` - freeCodeCamp Responsive Web Design Certificate

**Recommended dimensions:** 1200x900px or standard certificate size

### 3. Resume PDF
Add your resume as:
- `cosmic-portfolio/public/resume.pdf` - Your actual resume PDF file

## How to Update Image Paths

### For Projects (src/components/ProjectsSection.tsx):
```typescript
const projects = [
  {
    // ... other properties
    image: '/vedix-ai.png',  // Update this path
  },
  {
    // ... other properties
    image: '/smartcity-ai.png',  // Update this path
  },
  {
    // ... other properties
    image: '/analytics-dashboard.png',  // Update this path
  },
];
```

### For Certificates (src/components/CertificatesSection.tsx):
```typescript
const certificates = [
  {
    // ... other properties
    image: '/certificates/sql-hackerrank.png',  // Update this path
  },
  // ... repeat for other certificates
];
```

## Tips for Professional Images

### Project Screenshots:
1. Take full-page screenshots of your projects
2. Use browser extensions like "Full Page Screen Capture"
3. Ensure the UI is clean and professional
4. Consider adding a mockup frame using tools like:
   - Screely (https://www.screely.com/)
   - MockUPhone (https://mockuphone.com/)

### Certificate Images:
1. Download certificates in high resolution
2. If you have PDF certificates, convert them to PNG using:
   - Online tools like PDF to PNG converters
   - Screenshot tools with high DPI settings
3. Crop to remove unnecessary whitespace
4. Ensure text is readable

### Image Optimization:
Before adding images, optimize them using:
- TinyPNG (https://tinypng.com/)
- Squoosh (https://squoosh.app/)
- ImageOptim (Mac)

Target file sizes:
- Project images: < 200KB each
- Certificate images: < 150KB each

## Quick Setup Steps

1. Create the certificates folder:
   ```bash
   mkdir cosmic-portfolio/public/certificates
   ```

2. Add your images to the appropriate folders

3. Update the image paths in the component files

4. Test locally to ensure images load correctly

5. Commit and deploy!

## Placeholder Images

Currently, the portfolio uses `/placeholder.svg` for all images. This is a built-in placeholder that comes with the template. Replace these with your actual images for a professional look.

## Need Help?

If you don't have screenshots of your projects yet:
1. Deploy your projects to a live URL
2. Take professional screenshots
3. Or create mockups using Figma/Canva showing the key features

For certificates you haven't received yet:
1. Use the placeholder until you receive them
2. Update the links to point to the issuing platform
3. Add the actual certificate images once available
