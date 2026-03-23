# Remove Background from Profile Photo

## Quick & Easy Online Tools (Free)

### Option 1: Remove.bg (Best Quality)
1. Go to: https://www.remove.bg/
2. Click "Upload Image"
3. Select your profile photo: `cosmic-portfolio/public/profile.png`
4. Wait 5 seconds for automatic background removal
5. Click "Download" (free for standard resolution)
6. Save as: `profile-nobg.png`
7. Replace the file in `cosmic-portfolio/public/profile.png`

### Option 2: Photopea (Free Photoshop Alternative)
1. Go to: https://www.photopea.com/
2. Open your profile photo
3. Use Magic Wand tool or Select > Subject
4. Delete background
5. Export as PNG
6. Replace `cosmic-portfolio/public/profile.png`

### Option 3: Canva (Free with Account)
1. Go to: https://www.canva.com/
2. Create account (free)
3. Upload your profile photo
4. Use "Background Remover" tool
5. Download as PNG
6. Replace `cosmic-portfolio/public/profile.png`

## After Removing Background

Once you have the new image with transparent background:

1. Save it as: `cosmic-portfolio/public/profile.png` (replace existing)
2. Or save as: `cosmic-portfolio/public/profile-nobg.png` (keep both)
3. Refresh your browser at http://localhost:8080/
4. The profile photo will automatically update!

## Tips for Best Results

- Use high-resolution original photo
- Ensure good lighting in the photo
- Clear distinction between you and background works best
- PNG format preserves transparency

## Current Profile Photo Location

Your profile photo is at:
`cosmic-portfolio/public/profile.png`

Just replace this file with your background-removed version!
