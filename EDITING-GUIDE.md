# How to Edit Your Portfolio Website

Heyyyyy HB. This guide will help you update your website. Don't worry - you are a coder now 
ദ്ദി ˉ͈̀꒳ˉ͈́ )✧

---

## Before You Start Editing

**Always pull the latest changes first!** The shop syncs automatically from Stripe, so the code may have changed since you last worked on it.

Everytime before you make any changes- in your VSCode terminal (if you don't see it: hover to top menu bar -> click terminal -> new terminal), run:
```
git fetch
git pull
```

---

## Quick Reference

| What you want to do | Where to do it |
|---------------------|----------------|
| Add/remove artwork | `content/works.json` |
| Add/remove shop products | Stripe Dashboard (syncs automatically!) |
| Add/remove blog posts | `content/blog.json` |
| Update email & social links | `content/site-settings.json` (updates everywhere!) |
| Update your bio | `about.html` |
| Change colors/fonts | `assets/css/style.css` |
| Replace images | `assets/images/` folder |
| Change hero slideshow & taglines | `content/works.json` (heroFeature + tagline) |

⚠️ **Don't edit `content/products.json` directly** - it's auto-generated from Stripe and will be overwritten!

---

## How Work Detail Pages Work

When visitors click on any artwork in your gallery, they're taken to a dedicated detail page showing:
- The full-size image (click to zoom)
- Title and year
- Description (if you've added one)
- **Any linked shop products** (prints or originals available for purchase)

To link a shop product to an artwork, add `workId` metadata in Stripe (see Shop section below).

### Description Fallback

Shop products automatically inherit descriptions from their linked artwork! This means:
- If a product has its own description in Stripe, that's used
- If a product has no description but is linked to a work (via `workId`), the work's description is used
- This works on both the Shop page and Work Detail pages

**Example:** If "Sparkle Face" in `works.json` has description "Acrylic on canvas, 24x36", any linked prints or originals without their own description will automatically show that text.

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
  "description": "An artistic statement about your piece.",
  "medium": "Acrylic on canvas, 24x36",
  "featured": true,
  "heroFeature": true,
  "tagline": "Your artistic tagline here"
}
```

**What each field does:**
- `description` = artistic statement about the piece (shown on work detail page, also used as fallback for shop products)
- `medium` = technical details like materials and size (shown everywhere: work detail page, shop cards, etc.)
- `featured: true` = shows in "Selected Work" grid on homepage
- `heroFeature: true` = shows in the big hero slideshow at top of homepage
- `tagline` = text shown below the image in the hero slideshow (required if heroFeature is true)
- Put a comma after the previous artwork's `}` before adding yours
- Categories can be anything you want: Paintings, Drawings, Digital, Photography, etc.

**Hero Slideshow:** Works with both `heroFeature: true` AND a `tagline` will cycle through the homepage hero. Visitors can use the arrows or wait 5 seconds for auto-advance.

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
  "description": "This piece explores the interplay of light and shadow.",
  "medium": "Acrylic on canvas, 24x36",
  "featured": true
}
```

---

## Managing Your Shop (Automatic Stripe Sync!)

Your shop syncs automatically with Stripe every 6 hours. **No need to edit any files** - just manage products in Stripe and they appear on your website!

### Adding a Product

1. Log into [dashboard.stripe.com](https://dashboard.stripe.com)
2. Go to **Payment Links** → Click **+ New**
3. Fill in the product details:
   - **Product name**: e.g., "Mountain Print 11x14"
   - **Price**: e.g., $35.00
   - **Image**: Upload a photo (this shows on your website!)
   - **Description**: Size, medium, details

4. **Set the category** (Important!):
   - Scroll down and click **"Additional options"**
   - Click **"Add metadata"**
   - Add: Key = `category`, Value = `Originals`, `Prints`, or `Crafts`

5. **Link to a work** (Optional but recommended!):
   - In the same metadata section, add another entry
   - Add: Key = `workId`, Value = the ID of the artwork (e.g., `sparkle-face`)
   - This makes the product appear on that artwork's detail page!
   - Find artwork IDs in `content/works.json`

6. **For limited items** (originals, limited editions):
   - Click "Advanced options"
   - Enable **"Limit the number of payments"**
   - Set quantity (1 for originals, edition size for prints)

7. Click **Create link** - Done!

Your product will appear on your website within 6 hours (or sync manually - see below).

### Syncing Immediately (Manual Sync)

Don't want to wait 6 hours?

1. Go to your GitHub repo
2. Click **Actions** tab
3. Click **"Sync Stripe Products"** on the left
4. Click **"Run workflow"** → **"Run workflow"**
5. Wait ~30 seconds, refresh your site!

### Metadata Tips

The sync is forgiving with metadata:
- `category`, `Category`, or `CATEGORY` all work
- `prints`, `Prints`, `print`, `Print` all become "Prints"
- `originals`, `original`, `Original` all become "Originals"
- `crafts`, `craft`, `Crafts` all become "Crafts"
- If you forget the category, it defaults to "Prints"
- `workId`, `workid`, `WorkId`, or `work_id` all work for linking to artwork

### When Something Sells Out

- Stripe automatically stops accepting payments when limit is reached
- Deactivate the payment link in Stripe to show "Sold" on your site
- Or just delete the payment link to remove it entirely

### Removing a Product

Just delete or deactivate the Payment Link in Stripe. Next sync, it's gone from your site.

### Product Images

The image you upload to Stripe is used on your website. For best results:
- Use square or 4:5 ratio images
- At least 800px wide
- JPG or PNG format

---

## Updating Your Email & Social Links (Site-Wide!)

Your email and social links appear on every page. Edit them in ONE place and they update everywhere!

### Open `content/site-settings.json`:

```json
{
  "artistName": "Kayla Carabes",
  "email": "kjcarabes@gmail.com",

  "socialLinks": [
    {
      "name": "Instagram",
      "url": "https://instagram.com/kayla_carabes"
    }
  ]
}
```

### To change your email:
Just change the `email` value.

### To add a new social link:
Add a new entry to the `socialLinks` array:

```json
"socialLinks": [
    {
      "name": "Instagram",
      "url": "https://instagram.com/kayla_carabes"
    },
    {
      "name": "Etsy",
      "url": "https://etsy.com/shop/yourshopname"
    },
    {
      "name": "TikTok",
      "url": "https://tiktok.com/@yourusername"
    }
  ]
```

**Don't forget:** Add a comma after each `}` except the last one!

### To remove a social link:
Just delete its entire `{ "name": "...", "url": "..." }` entry (and the comma before it if it's the last one)

---

## Updating Your Bio (About Page)

Open `about.html` and find this section:

```html
<!-- ✏️ EDIT YOUR BIO HERE -->
<p>
    Kayla Carabes is a Mexican American painter...
</p>
<!-- END BIO SECTION -->
```

Just change the text between the `<p>` and `</p>` tags. Each `<p>...</p>` is a paragraph.

**To add a new paragraph:**
```html
<p>
    Your new paragraph text here.
</p>
```

---

## Adding Blog Posts

Your blog is perfect for sharing work-in-progress, thoughts, and studio updates. Blog posts support multiple images that display in an artistic, scattered layout.

### Open `content/blog.json`:

```json
{
  "posts": [
    {
      "id": "unique-post-id",
      "title": "Optional Title",
      "date": "2025-02-26",
      "images": [
        "assets/images/blog-image-1.webp",
        "assets/images/blog-image-2.webp"
      ],
      "content": "Your blog post text goes here..."
    }
  ]
}
```

**What each field does:**
- `id` - A unique identifier (use lowercase, dashes instead of spaces)
- `title` - Optional! Leave it out for posts without a title
- `date` - Format: `YYYY-MM-DD` (e.g., `2025-02-26` for Feb 26, 2025)
- `images` - An array of image paths (can be 1 or many!)
- `content` - Your post text

### Adding a New Blog Post

1. **Add your images** to `assets/images/` folder
2. **Open `content/blog.json`**
3. **Add a new entry at the TOP** of the posts array (newest first):

```json
{
  "posts": [
    {
      "id": "new-post",
      "date": "2025-03-01",
      "images": ["assets/images/new-image.webp"],
      "content": "My new blog post about this painting..."
    },
    {
      "id": "older-post",
      ...
    }
  ]
}
```

**Don't forget:** Add a comma after the `}` of your new post!

### Multiple Images

When you add multiple images, they display in an artistic scattered/overlapping layout:

```json
{
  "id": "studio-update",
  "date": "2025-02-10",
  "images": [
    "assets/images/painting-1.webp",
    "assets/images/painting-2.webp",
    "assets/images/detail-shot.webp"
  ],
  "content": "Working on several pieces this week..."
}
```

Images are clickable - visitors can click to view full size.

### Posts With or Without Titles

**With title:**
```json
{
  "id": "drawing-with-light",
  "title": "Drawing with light",
  "date": "2025-02-17",
  "images": ["assets/images/blog-2.webp"],
  "content": "Turned this painting around and put it up to my window..."
}
```

**Without title (just date and content):**
```json
{
  "id": "forest-painting",
  "date": "2025-02-10",
  "images": ["assets/images/blog-1.webp"],
  "content": "Slowly chipping away at this forest painting..."
}
```

### Removing a Blog Post

Just delete the entire post entry from the array (including the comma before or after it).

---

## Changing the Contact Page Text

The email and social links on the contact page are automatically pulled from `content/site-settings.json` (see above).

To change the contact page message, open `contact.html` and find:

```html
<!-- ✏️ EDIT YOUR CONTACT INFO HERE -->
<p>
    Interested in working together...
</p>
```

Edit the text between `<p>` and `</p>` to say whatever you want.

---

## Changing the Homepage

### Hero Image (Big Image at Top)
Open `index.html` and find:
```html
<img src="assets/images/sparkle-face.jpeg" alt="Featured artwork">
```
Change `sparkle-face.jpeg` to your preferred image filename.

### Tagline
Find this line:
```html
<p class="hero-tagline">Where color meets feeling</p>
```
Change the text to your own tagline.

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
  - Artwork/product images: 800-1200px wide
  - Hero image: 1200-1600px wide
  - About photo: 600-800px wide

- **File formats:** JPG for photos/paintings, PNG if you need transparency

- **Compress your images** before uploading at [squoosh.app](https://squoosh.app) to keep the site fast

---

## Something Broke?

Don't panic! Here's what to do:

1. **Check for typos** - especially in `.json` files. A missing comma or quote will break it.

2. **Use a JSON validator** - Paste your JSON content into [jsonlint.com](https://jsonlint.com) to find errors.

3. **Undo your changes** - In GitHub Desktop, right-click the file and choose "Discard changes"

4. **Ask for help** - Show me the error message and I'll help fix it!

---

## Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Images not showing | Check the filename matches exactly (case-sensitive!) |
| Page looks broken | You might have deleted a `<` or `>` in HTML |
| Works page is blank | Check `works.json` for missing commas or quotes |
| Blog page is blank | Check `blog.json` for missing commas or quotes |
| Blog images not scattered | Need 2+ images in the `images` array for scattered layout |
| Shop not updating | Run manual sync (Actions → Sync Stripe Products → Run workflow) |
| Product not appearing | Check Payment Link is active in Stripe, wait for sync |
| Wrong category | Edit product metadata in Stripe, run sync |
| Changes not appearing | Did you push to GitHub? Wait 1-2 minutes. |

---

## Stripe Tips

- **Test before going live:** Stripe has a "Test mode" toggle in the dashboard. Use it to test purchases without real charges.
- **Check your payouts:** Go to Stripe dashboard → Balances to see your money and set up bank transfers.
- **Shipping:** Stripe Payment Links can collect shipping addresses. Enable this when creating the link if you're shipping physical items.
- **Taxes:** Stripe can handle sales tax automatically. Check their Tax settings if needed.

---

That's it! You've got this. Products sync from Stripe automatically - just create Payment Links and they'll appear on your site!
