# ShopFast — E‑commerce SPA (Vanilla JS)

ShopFast is an e‑commerce SPA built with HTML, CSS, and vanilla JavaScript. It includes catalog, product detail, cart, checkout, admin panel, themes, and bilingual support (ES/EN).

## Key features
- Category catalog with hash-based navigation.
- Detail view with quantity selector and stock validation.
- Persistent cart in `localStorage` with totals and quick actions.
- Checkout with validation and order ID generation.
- Admin panel with seed, reset, image update, and full delete actions.
- Theme mode (system, light, dark) with persistence.
- Language selector with full translations (UI and products).

## Project structure
- `index.html`: app shell and navbar.
- `css/styles.css`: base styles, components, and utilities.
- `js/app.js`: full logic (router, render, store, admin, i18n, theme).

## Requirements
- Modern browser with `localStorage` support.

## How to run
1. Open `index.html` in your browser (ideally from a static server).
2. Navigate using the links or hash routes.

## Main routes
- `#/` main catalog
- `#/category/tecnologia`, `#/category/ropa`, `#/category/hogar`
- `#/item/:id`
- `#/cart`
- `#/checkout`
- `#/admin`

## Admin panel
- Access via `#/admin`.
- Password: `admin1234`
- Available actions:
  - Full reset (delete + seed + images)
  - Load products (seed)
  - Update images
  - Delete all products
  - Sign out

## Persistence and local data
- Products and cart are stored in `localStorage`.
- Theme and language preferences are also stored in `localStorage`.
- To reset everything, clear `localStorage` or use the admin reset.

## Product images
- Images are defined by ID in `PRODUCT_IMAGE_OVERRIDES`.
- The “Update images” admin button reapplies the current image set.

## Notes
- To avoid cache issues, the script is loaded with cache-busting in `index.html`.
- When using `file://`, some browsers may show warnings; a local static server is recommended.

---
Demo project for educational purposes.
