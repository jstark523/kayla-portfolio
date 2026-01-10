# How to Edit Your Portfolio Website

Hey! This guide will help you update your website. Don't worry - it's simpler than it looks!

---

## Quick Reference

| What you want to do | File to edit |
|---------------------|--------------|
| Add/remove artwork | `content/works.json` |
| Update your bio | `about.html` |
| Change contact info | `contact.html` |
| Change colors/fonts | `assets/css/style.css` |
| Replace images | `assets/images/` folder |

---

## Adding New Artwork (The Most Common Task!)

### Step 1: Add your image
1. Put your image file in the `assets/images/` folder
2. Use a simple filename with no spaces (e.g., `sunset-painting.jpg` not `Sunset Painting (Final).jpg`)

### Step 2: Add it to your gallery
Open `content/works.json` and add a new entry. Copy this template:

```json
{
  "id": "unique-name-here",
  "title": "Your Artwork Title",
  "year": "2024",
  "category": "Paintings",
  "image": "assets/images/your-image-filename.jpg",
  "description": "Description of your piece.",
  "featured": true
}
```

**Important:**
- Put a comma after the previous artwork's `}` before adding yours
- `featured: true` = shows on homepage, `featured: false` = only on Work page
- Categories can be anything you want: Paintings, Drawings, Digital, Photography, etc.

### Example: Before and After

**Before:**
```json
{
  "id": "artwork-1",
  "title": "Old Painting",
  "year": "2023",
  ...
  "featured": true
}
```

**After (adding a new one):**
```json
{
  "id": "artwork-1",
  "title": "Old Painting",
  "year": "2023",
  ...
  "featured": true
},
{
  "id": "new-painting",
  "title": "My New Painting",
  "year": "2024",
  "category": "Paintings",
  "image": "assets/images/new-painting.jpg",
  "description": "Acrylic on canvas, 24x36 inches.",
  "featured": true
}
```

---

## Updating Your Bio (About Page)

Open `about.html` and find this section:

```html
<!-- EDIT YOUR BIO HERE -->
<p>
    Hello! I'm Kayla...
</p>
```

Just change the text between the `<p>` and `</p>` tags. Each `<p>...</p>` is a paragraph.

**To add a new paragraph:**
```html
<p>
    Your new paragraph text here.
</p>
```

---

## Changing Your Contact Info

Open `contact.html` and find these lines:

```html
<a href="mailto:hello@example.com" class="contact-email">hello@example.com</a>
```

Change `hello@example.com` in BOTH places to your real email.

For social links:
```html
<a href="https://instagram.com/yourusername">Instagram</a>
```

Change `yourusername` to your actual Instagram handle.

---

## Changing the Hero Image (Big Image on Homepage)

1. Add your new image to `assets/images/`
2. Open `index.html`
3. Find this line:
   ```html
   <img src="assets/images/hero-placeholder.svg" alt="Featured artwork">
   ```
4. Change `hero-placeholder.svg` to your new image filename

---

## Changing Colors (For When You're Feeling Adventurous)

Open `assets/css/style.css` and look at the top:

```css
:root {
    --color-bg: #fafafa;           /* Background color */
    --color-text: #1a1a1a;         /* Main text color */
    --color-text-light: #666;      /* Secondary text */
    --color-accent: #1a1a1a;       /* Links, buttons */
    --color-border: #e5e5e5;       /* Subtle borders */
}
```

Change the `#xxxxxx` values to different colors. You can use:
- Google "color picker" to find hex codes
- Or try: `#000000` (black), `#ffffff` (white), `#ff6b6b` (coral), `#4ecdc4` (teal)

---

## How to Save and Publish Changes

### Using GitHub Desktop (Easiest)

1. Open GitHub Desktop
2. You'll see your changes listed on the left
3. At the bottom, type a short description (e.g., "Added new painting")
4. Click "Commit to main"
5. Click "Push origin" at the top

Your changes will be live in 1-2 minutes!

### Using VS Code + Terminal

1. Open VS Code
2. Open Terminal (View > Terminal)
3. Type these commands:
   ```
   git add .
   git commit -m "Added new artwork"
   git push
   ```

---

## Image Tips

- **Recommended sizes:**
  - Artwork images: 800-1200px wide
  - Hero image: 1200-1600px wide
  - About photo: 600-800px wide

- **File formats:** JPG for photos/paintings, PNG if you need transparency

- **Compress your images** before uploading at [squoosh.app](https://squoosh.app) to keep the site fast

---

## Something Broke?

Don't panic! Here's what to do:

1. **Check for typos** - especially in `works.json`. A missing comma or quote will break it.

2. **Use a JSON validator** - Paste your `works.json` content into [jsonlint.com](https://jsonlint.com) to find errors.

3. **Undo your changes** - In GitHub Desktop, right-click the file and choose "Discard changes"

4. **Ask for help** - Show me the error message and I'll help fix it!

---

## Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Images not showing | Check the filename matches exactly (case-sensitive!) |
| Page looks broken | You might have deleted a `<` or `>` in HTML |
| Works page is blank | Check `works.json` for missing commas or quotes |
| Changes not appearing | Did you push to GitHub? Wait 1-2 minutes. |

---

That's it! You've got this. Start by adding one new artwork and see how it goes.
