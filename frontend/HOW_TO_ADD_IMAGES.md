# How to Add Your Own Images

## Step 1: Prepare Your Images

1. **Collect your images** - Make sure they're in JPG, PNG, or WebP format
2. **Resize if needed** - Recommended sizes are listed below
3. **Name them correctly** - Use the exact file names listed

## Step 2: Copy Images to the Project

1. Navigate to: `frontend/public/images/`
2. Copy your image files into this folder
3. Use these exact file names:

### Required Image Files:

```
frontend/public/images/
├── hero-cybersecurity.jpg          (1200x600px recommended)
├── phishing-feature.jpg           (400x300px)
├── network-feature.jpg            (400x300px)
├── osint-feature.jpg              (400x300px)
├── cta-cybersecurity.jpg          (600x400px)
├── login-cybersecurity.jpg        (600x800px)
├── signup-network.jpg             (600x800px)
├── phishing-card.jpg              (400x250px)
├── network-card.jpg               (400x250px)
├── osint-card.jpg                 (400x250px)
├── missions-header.jpg            (800x400px)
├── mission-phishing.jpg            (800x400px)
├── mission-network.jpg            (800x400px)
└── mission-osint.jpg              (800x400px)
```

## Step 3: Verify

1. Start your frontend server: `npm run dev`
2. The app will automatically use your local images
3. If an image is missing, it will fallback to Unsplash images

## Image Guidelines

- **Format**: JPG, PNG, or WebP
- **Size**: Keep file sizes reasonable (under 500KB per image if possible)
- **Aspect Ratio**: Try to match the recommended dimensions
- **Quality**: Use high-quality images for best results

## Tips

- You don't need all images at once - the app will use Unsplash fallbacks for missing images
- Start with the most important ones: hero image, feature cards, and mission cards
- Test on different screen sizes to ensure images look good

## Troubleshooting

**Images not showing?**
- Check that file names match exactly (case-sensitive)
- Verify images are in `frontend/public/images/` folder
- Check browser console for 404 errors
- Make sure image format is supported (JPG, PNG, WebP)

**Images look stretched?**
- Ensure aspect ratios match recommendations
- Use CSS object-fit: cover (already applied)

## Example Workflow

1. Take/collect your cybersecurity-themed photos
2. Resize them to recommended dimensions
3. Save with exact file names
4. Copy to `frontend/public/images/`
5. Refresh your browser - images should appear!




