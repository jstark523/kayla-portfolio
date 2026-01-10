/**
 * Sync products from Stripe Payment Links to products.json
 *
 * This script fetches all active Payment Links from Stripe and
 * generates the products.json file for the website.
 *
 * In Stripe, when creating a product, use metadata to set:
 * - category: "Originals", "Prints", or "Crafts"
 * - order: number for sort order (optional)
 */

const fs = require('fs');
const path = require('path');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function syncProducts() {
  console.log('Fetching payment links from Stripe...');

  // Fetch all active payment links
  const paymentLinks = await stripe.paymentLinks.list({
    active: true,
    limit: 100,
    expand: ['data.line_items']
  });

  console.log(`Found ${paymentLinks.data.length} active payment links`);

  const products = [];

  for (const link of paymentLinks.data) {
    try {
      // Get line items for this payment link
      const lineItems = await stripe.paymentLinks.listLineItems(link.id, {
        limit: 1
      });

      if (lineItems.data.length === 0) {
        console.log(`Skipping ${link.id} - no line items`);
        continue;
      }

      const lineItem = lineItems.data[0];
      const priceId = lineItem.price.id;

      // Fetch full price details
      const price = await stripe.prices.retrieve(priceId, {
        expand: ['product']
      });

      const product = price.product;

      // Skip if product is not active
      if (!product.active) {
        console.log(`Skipping ${product.name} - product not active`);
        continue;
      }

      // Get category from metadata (case-insensitive, with fallbacks)
      const rawCategory = product.metadata?.category ||
                          product.metadata?.Category ||
                          product.metadata?.CATEGORY ||
                          'Prints';

      // Normalize category to proper case
      const categoryMap = {
        'originals': 'Originals',
        'original': 'Originals',
        'prints': 'Prints',
        'print': 'Prints',
        'crafts': 'Crafts',
        'craft': 'Crafts'
      };
      const category = categoryMap[rawCategory.toLowerCase()] || 'Prints';

      // Get sort order from metadata (default to 0)
      const rawOrder = product.metadata?.order ||
                       product.metadata?.Order ||
                       '0';
      const order = parseInt(rawOrder, 10) || 0;

      // Get workId from metadata (links product to a work in works.json)
      const workId = product.metadata?.workId ||
                     product.metadata?.workid ||
                     product.metadata?.WorkId ||
                     product.metadata?.work_id ||
                     null;

      // Check if sold out (payment link has restrictions)
      const sold = !link.active;

      // Build product entry
      const productEntry = {
        id: product.id,
        title: product.name,
        category: category,
        price: price.unit_amount / 100, // Convert cents to dollars
        image: product.images?.[0] || 'assets/images/placeholder.jpg',
        description: product.description || '',
        stripeLink: link.url,
        sold: sold,
        _order: order // Used for sorting, removed before saving
      };

      // Only add workId if it exists
      if (workId) {
        productEntry.workId = workId;
      }

      products.push(productEntry);
      console.log(`Added: ${product.name} (${category}) - $${productEntry.price}`);

    } catch (error) {
      console.error(`Error processing payment link ${link.id}:`, error.message);
    }
  }

  // Sort by order, then by title
  products.sort((a, b) => {
    if (a._order !== b._order) return a._order - b._order;
    return a.title.localeCompare(b.title);
  });

  // Remove _order field before saving
  products.forEach(p => delete p._order);

  // Build the final JSON structure
  const output = {
    "_comment": "✏️ AUTO-GENERATED FROM STRIPE - Do not edit manually!",
    "_instructions": "Manage products in Stripe Dashboard. This file syncs automatically.",
    "products": products,
    "_lastSync": new Date().toISOString()
  };

  // Write to products.json
  const outputPath = path.join(__dirname, '..', 'content', 'products.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + '\n');

  console.log(`\nSynced ${products.length} products to products.json`);
}

syncProducts().catch(error => {
  console.error('Sync failed:', error);
  process.exit(1);
});
