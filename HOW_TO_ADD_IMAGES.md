# How to Add Your Project Images

You've uploaded 2 images in the chat. Here's how to save them to your portfolio:

## Step 1: Save the Images

### Image 1 - Vedix AI (The AI Platform Screenshot)
1. Right-click on the first image (showing "The Most Accurate AI Mind Ever Built")
2. Select "Save Image As..."
3. Save it to: `cosmic-portfolio/public/projects/vedix-ai.png`

### Image 2 - Analytics Dashboard (Revenue Dashboard Screenshot)
1. Right-click on the second image (showing $24.9M Revenue, charts, and metrics)
2. Select "Save Image As..."
3. Save it to: `cosmic-portfolio/public/projects/analytics-dashboard.png`

## Step 2: For SmartCity AI Project

You still need an image for the SmartCity AI project. You can either:
- Take a screenshot of your SmartCity AI dashboard
- Use a placeholder for now
- Or use a similar traffic/IoT monitoring dashboard image

Save it as: `cosmic-portfolio/public/projects/smartcity-ai.png`

## Quick Command Line Method (Alternative)

If you have the images downloaded to your Downloads folder, you can use:

```bash
# Windows PowerShell
cd cosmic-portfolio

# Copy from Downloads (adjust the filenames as needed)
cp ~/Downloads/vedix-ai-screenshot.png public/projects/vedix-ai.png
cp ~/Downloads/analytics-dashboard.png public/projects/analytics-dashboard.png
cp ~/Downloads/smartcity-screenshot.png public/projects/smartcity-ai.png
```

## Verify Images Are Added

After adding the images, check that they exist:

```bash
ls public/projects/
```

You should see:
- vedix-ai.png
- analytics-dashboard.png
- smartcity-ai.png

## Test in Browser

1. Make sure your dev server is running: `npm run dev`
2. Open http://localhost:8080
3. Scroll to the Projects section
4. You should see your actual project screenshots instead of placeholders

## Image Specifications

Your uploaded images look good! They should work perfectly. If you want to optimize them:

**Current images appear to be:**
- Vedix AI: ~1920x1080 (good size)
- Analytics Dashboard: ~1920x1080 (good size)

**Recommended:**
- Format: PNG or JPG
- Dimensions: 800x600 to 1920x1080
- File size: < 500KB each (optimize if larger)

## Need Help?

If the images don't show up:
1. Check the file names match exactly (case-sensitive!)
2. Make sure they're in the correct folder: `public/projects/`
3. Refresh your browser (Ctrl+F5 or Cmd+Shift+R)
4. Check browser console for errors (F12)
