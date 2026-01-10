# How to Edit Your Portfolio Website

Hey! This guide will help you update your website. Don't worry - it's simpler than it looks!

---

## Quick Reference

| What you want to do | File to edit |
|---------------------|--------------|
| Add/remove artwork | `content/works.json` |
| Add/remove shop products | `content/products.json` |
| Update your bio | `about.html` |
| Change contact info | `contact.html` |
| Update social links (Etsy, Instagram, etc.) | All `.html` files (footer section) |
| Change colors/fonts | `assets/css/style.css` |
| Replace images | `assets/images/` folder |
| Change homepage tagline | `index.html` |

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

## Setting Up Your Shop with Stripe

Your shop uses Stripe Payment Links - a simple way to accept payments without any coding. Here's how to set it up:

### First Time Setup (One Time Only)

1. **Create a Stripe account** at [stripe.com](https://stripe.com)
2. Complete their verification process (takes a few minutes)
3. That's it! You're ready to create payment links.

### Adding a Product to Your Shop

#### Step 1: Create a Payment Link in Stripe

1. Log into [dashboard.stripe.com](https://dashboard.stripe.com)
2. Go to **Payment Links** in the left sidebar (or search for it)
3. Click **+ New** to create a new payment link
4. Fill in:
   - **Product name**: e.g., "Mountain Print 11x14"
   - **Price**: e.g., $35.00
   - **Image**: Upload a photo of the product
5. **IMPORTANT for limited items**: Click "Advanced options" and enable **"Limit the number of payments"**
   - For originals: Set to 1
   - For limited edition prints: Set to your edition size (e.g., 25)
6. Click **Create link**
7. Copy the link (looks like `https://buy.stripe.com/xxxxx`)

#### Step 2: Add the Product to Your Website

Open `content/products.json` and add a new entry:

```json
{
  "id": "mountain-print",
  "title": "Mountain Print",
  "category": "Prints",
  "price": 35,
  "image": "assets/images/mountain-print.jpg",
  "description": "Archival giclée print, 11x14 inches",
  "stripeLink": "https://buy.stripe.com/xxxxx",
  "sold": false
}
```

**Categories:** Use `Originals`, `Prints`, or `Crafts`

**Don't forget:**
- Add a comma after the previous product's `}`
- Add the product image to `assets/images/`
- The `price` is just for display - the actual charge comes from Stripe

#### Step 3: When Something Sells Out

**For originals or limited editions that sold out:**

1. Stripe automatically stops accepting payments when the limit is reached
2. In `products.json`, change `"sold": false` to `"sold": true`
3. The website will show "Sold" instead of "Buy Now"

**To remove a product entirely:** Just delete its entire entry from `products.json` (and the comma before it)

### Product Entry Explained

```json
{
  "id": "unique-id",           // No spaces, used internally
  "title": "Display Name",     // What customers see
  "category": "Prints",        // Originals, Prints, or Crafts
  "price": 35,                 // Display price (number, no $)
  "image": "assets/images/x.jpg",  // Product photo
  "description": "Details",    // Size, medium, etc.
  "stripeLink": "https://...", // Paste from Stripe (or leave "" if not ready)
  "sold": false                // Change to true when sold out
}
```

**Button states:**
- Has `stripeLink` → Shows "Buy Now"
- `stripeLink` is `""` → Shows "Coming Soon"
- `sold` is `true` → Shows "Sold"

---

## Updating Your Social Links

Your Etsy, Instagram, and email appear in the footer of every page. To update them:

### Update in ALL these files:
- `index.html`
- `work.html`
- `shop.html`
- `about.html`
- `contact.html`

### Find this section (near the bottom):
```html
<div class="social-links">
    <a href="https://etsy.com/shop/YOURSHOPNAME" ...>Etsy</a>
    <a href="https://instagram.com/yourusername" ...>Instagram</a>
    <a href="mailto:hello@example.com">Email</a>
</div>
```

### Change:
- `YOURSHOPNAME` → your actual Etsy shop name
- `yourusername` → your actual Instagram handle
- `hello@example.com` → your actual email

**Tip:** Use VS Code's "Find and Replace" (Cmd+Shift+H on Mac) to change all at once:
- Find: `YOURSHOPNAME`
- Replace: `YourActualShopName`
- Click "Replace All"

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

## Changing Your Contact Info

Open `contact.html` and find these lines:

```html
<a href="mailto:hello@example.com" class="contact-email">hello@example.com</a>
```

Change `hello@example.com` in BOTH places to your real email.

For social links in the contact page body:
```html
<a href="https://instagram.com/yourusername">Instagram</a>
```

Change `yourusername` to your actual Instagram handle.

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
| Works/Shop page is blank | Check JSON file for missing commas or quotes |
| Changes not appearing | Did you push to GitHub? Wait 1-2 minutes. |
| "Buy Now" not working | Check the Stripe link is correct in products.json |
| Product still showing after selling | Change `"sold": false` to `"sold": true` |

---

## Stripe Tips

- **Test before going live:** Stripe has a "Test mode" toggle in the dashboard. Use it to test purchases without real charges.
- **Check your payouts:** Go to Stripe dashboard → Balances to see your money and set up bank transfers.
- **Shipping:** Stripe Payment Links can collect shipping addresses. Enable this when creating the link if you're shipping physical items.
- **Taxes:** Stripe can handle sales tax automatically. Check their Tax settings if needed.

---

That's it! You've got this. Start by adding one new product and see how it goes.
