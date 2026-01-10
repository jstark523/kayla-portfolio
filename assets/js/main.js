/**
 * KAYLA'S PORTFOLIO - Main JavaScript
 *
 * This file handles:
 * - Site-wide settings (social links, email)
 * - Loading artwork from works.json
 * - Mobile navigation
 * - Lightbox for viewing images
 * - Dynamic year in footer
 */

// Set current year in footer
document.querySelectorAll('#year').forEach(el => {
    el.textContent = new Date().getFullYear();
});

// ===========================================
// SITE-WIDE SETTINGS
// ===========================================

// Load and apply site settings from JSON
async function loadSiteSettings() {
    try {
        const response = await fetch('content/site-settings.json');
        const settings = await response.json();
        applySiteSettings(settings);
    } catch (error) {
        console.error('Error loading site settings:', error);
    }
}

// Apply settings to the page
function applySiteSettings(settings) {
    // Update all footer social links
    document.querySelectorAll('.social-links').forEach(container => {
        container.innerHTML = '';

        // Add social links from settings
        settings.socialLinks.forEach(social => {
            const link = document.createElement('a');
            link.href = social.url;
            link.textContent = social.name;
            link.target = '_blank';
            link.rel = 'noopener';
            container.appendChild(link);
        });

        // Add email link
        if (settings.email) {
            const emailLink = document.createElement('a');
            emailLink.href = `mailto:${settings.email}`;
            emailLink.textContent = 'Email';
            container.appendChild(emailLink);
        }
    });

    // Update contact page email if it exists
    const contactEmail = document.querySelector('.contact-email');
    if (contactEmail && settings.email) {
        contactEmail.href = `mailto:${settings.email}`;
        contactEmail.textContent = settings.email;
    }

    // Update contact page social links if they exist
    const contactSocial = document.querySelector('.contact-social');
    if (contactSocial) {
        contactSocial.innerHTML = '';
        settings.socialLinks.forEach(social => {
            const link = document.createElement('a');
            link.href = social.url;
            link.textContent = social.name;
            link.target = '_blank';
            link.rel = 'noopener';
            contactSocial.appendChild(link);
        });
    }
}

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Load and display works from JSON
async function loadWorks() {
    try {
        const response = await fetch('content/works.json');
        const data = await response.json();
        return data.works;
    } catch (error) {
        console.error('Error loading works:', error);
        return [];
    }
}

// Create a work item element
function createWorkItem(work) {
    const article = document.createElement('article');
    article.className = 'work-item';
    article.dataset.category = work.category;

    article.innerHTML = `
        <img src="${work.image}" alt="${work.title}" loading="lazy">
        <div class="work-item-overlay">
            <h3 class="work-item-title">${work.title}</h3>
            <span class="work-item-year">${work.year}</span>
        </div>
    `;

    // Click to open lightbox
    article.addEventListener('click', () => {
        openLightbox(work.image, work.title);
    });

    return article;
}

// Populate featured works on homepage
async function populateFeaturedWorks() {
    const container = document.getElementById('featured-work');
    if (!container) return;

    const works = await loadWorks();
    const featured = works.filter(w => w.featured);

    container.innerHTML = '';
    featured.forEach(work => {
        container.appendChild(createWorkItem(work));
    });
}

// Populate all works on work page
async function populateAllWorks() {
    const container = document.getElementById('all-work');
    if (!container) return;

    const works = await loadWorks();

    container.innerHTML = '';
    works.forEach(work => {
        container.appendChild(createWorkItem(work));
    });

    // Create filter buttons
    createFilters(works);
}

// Create category filter buttons
function createFilters(works) {
    const filtersContainer = document.getElementById('work-filters');
    if (!filtersContainer) return;

    const categories = [...new Set(works.map(w => w.category))];

    if (categories.length <= 1) return; // Don't show filters if only one category

    filtersContainer.innerHTML = `
        <button class="filter-btn active" data-filter="all">All</button>
        ${categories.map(cat => `
            <button class="filter-btn" data-filter="${cat}">${cat}</button>
        `).join('')}
    `;

    // Add filter styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .work-filters {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }
        .filter-btn {
            background: none;
            border: 1px solid var(--color-border);
            padding: 0.5rem 1rem;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            cursor: pointer;
            transition: all 0.2s;
        }
        .filter-btn:hover,
        .filter-btn.active {
            background: var(--color-text);
            color: var(--color-bg);
            border-color: var(--color-text);
        }
        .work-item.hidden {
            display: none;
        }
    `;
    document.head.appendChild(style);

    // Filter functionality
    filtersContainer.addEventListener('click', (e) => {
        if (!e.target.classList.contains('filter-btn')) return;

        // Update active state
        filtersContainer.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');

        // Filter items
        const filter = e.target.dataset.filter;
        const items = document.querySelectorAll('.work-item');

        items.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
}

// Lightbox functionality
function openLightbox(src, alt) {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const img = lightbox.querySelector('img');
    img.src = src;
    img.alt = alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Lightbox event listeners
const lightbox = document.getElementById('lightbox');
if (lightbox) {
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });
}

// ===========================================
// SHOP FUNCTIONALITY
// ===========================================

// Load products from JSON
async function loadProducts() {
    try {
        const response = await fetch('content/products.json');
        const data = await response.json();
        return data.products;
    } catch (error) {
        console.error('Error loading products:', error);
        return [];
    }
}

// Create a product card element
function createProductCard(product) {
    const article = document.createElement('article');
    article.className = 'product-card';
    article.dataset.category = product.category;

    let buttonHtml;
    if (product.sold) {
        buttonHtml = '<span class="product-card-btn sold">Sold</span>';
    } else if (product.stripeLink) {
        buttonHtml = `<a href="${product.stripeLink}" target="_blank" rel="noopener" class="product-card-btn">Buy Now</a>`;
    } else {
        buttonHtml = '<span class="product-card-btn coming-soon">Coming Soon</span>';
    }

    article.innerHTML = `
        <div class="product-card-image">
            <img src="${product.image}" alt="${product.title}" loading="lazy">
        </div>
        <div class="product-card-info">
            <h3 class="product-card-title">${product.title}</h3>
            ${product.description ? `<p class="product-card-description">${product.description}</p>` : ''}
            <p class="product-card-price">$${product.price}</p>
            ${buttonHtml}
        </div>
    `;

    return article;
}

// Populate shop page
async function populateShop() {
    const container = document.getElementById('product-grid');
    if (!container) return;

    const products = await loadProducts();

    container.innerHTML = '';
    products.forEach(product => {
        container.appendChild(createProductCard(product));
    });

    // Setup filter functionality
    setupShopFilters();
}

// Setup shop category filters
function setupShopFilters() {
    const filtersContainer = document.getElementById('shop-filters');
    if (!filtersContainer) return;

    filtersContainer.addEventListener('click', (e) => {
        if (!e.target.classList.contains('shop-filter-btn')) return;

        // Update active state
        filtersContainer.querySelectorAll('.shop-filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');

        // Filter items
        const filter = e.target.dataset.filter;
        const items = document.querySelectorAll('.product-card');

        items.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
}

// Initialize based on current page
document.addEventListener('DOMContentLoaded', () => {
    loadSiteSettings();
    populateFeaturedWorks();
    populateAllWorks();
    populateShop();
});
