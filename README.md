# ShopFast — E-commerce SPA (Vanilla JS)

ShopFast is an e-commerce SPA built with HTML, CSS and plain JavaScript (no frameworks, no bundlers). It includes a product catalog, product detail, cart, checkout, admin panel, themes and bilingual support (EN/ES).

## Features

- Category catalog with hash-based navigation.
- Product detail view with quantity selector and stock validation.
- Persistent cart in `localStorage` with totals and quick actions.
- Checkout with form validation and order ID generation.
- Admin panel with seed, reset, image update and delete actions.
- Light, dark and automatic (system) theme with persistence.
- Language selector with full UI and product translations (EN/ES).

## Project structure

```
e-commerce-js-project/
├── css/
│   └── styles.css        # Base styles, components and utilities
├── js/
│   ├── app.js            # Full logic: router, render, CartStore, i18n, theme, admin
│   └── data.js           # Local catalog (local-first), product access functions
├── .gitignore
├── README.md
├── index.html            # App shell and navbar
└── server.mjs            # Static dev server (requires Bun)
```

## Requirements

- Modern browser with `localStorage` support.
- [Bun](https://bun.sh) (optional, only for the local dev server).

## How to run

### Option 1 — With dev server (recommended)

Avoids path and cache issues when using `file://`.

```bash
bun server.mjs
```

Open [http://localhost:3000](http://localhost:3000) in the browser.

### Option 2 — Without a server

Open `index.html` directly in the browser. Works fine in most modern browsers.

## Available routes

| Route | Description |
|-------|-------------|
| `#/` | Full catalog |
| `#/category/tecnologia` | Technology category |
| `#/category/ropa` | Clothing category |
| `#/category/hogar` | Home category |
| `#/item/:id` | Product detail |
| `#/cart` | Cart |
| `#/checkout` | Checkout |
| `#/admin` | Admin panel |

## Admin panel

- Access via `#/admin`.
- Password: `admin1234`

| Action | Description |
|--------|-------------|
| Full reset | Deletes everything, reloads seed and updates images |
| Load products | Loads the base catalog (seed) |
| Update images | Reapplies images defined in `PRODUCT_IMAGE_OVERRIDES` |
| Delete all products | Clears the catalog |

## Data and persistence

- The catalog is generated from `BASE_PRODUCTS` in `data.js` and stored in `localStorage` (local-first, no network).
- The cart, theme and language are also persisted in `localStorage`.
- To reset everything, use the "Full reset" action in the admin panel or clear `localStorage` from the browser DevTools.

### Local database

The project currently **does not use any external database**. All products are defined directly in the code (`js/data.js`) and served from memory and `localStorage`. This makes the app work offline with no additional setup.

### Future Firestore integration

In the future, the local catalog could be replaced by **Cloud Firestore** (Firebase). The migration would involve:

1. Replacing `fetchProducts()` and `fetchProductById()` in `data.js` with Firestore calls.
2. Using the admin panel to seed the products into a Firestore `products` collection.
3. Adding Firestore security rules: public reads, writes only for authenticated admins.

This migration would require no changes to `app.js` since the `fetchProducts` and `fetchProductById` interface would stay the same.

## Language

The default language is **English**. A **Spanish** option is available via the language selector in the navbar.

## Notes

- Scripts are loaded with cache-busting (`?v=5`) in `index.html`.
- No external dependencies in production — everything is plain HTML, CSS and JS.

---

Educational project — [Germán Alvarado](https://github.com/galvaradosd)
