# ShopFast — E-commerce SPA (Vanilla JS)

ShopFast es una SPA de e-commerce construida con HTML, CSS y JavaScript puro (sin frameworks ni bundlers). Incluye catálogo, detalle de producto, carrito, checkout, panel de administración, temas y soporte bilingüe (ES/EN).

## Características

- Catálogo por categorías con navegación basada en hash.
- Vista de detalle con selector de cantidad y validación de stock.
- Carrito persistente en `localStorage` con totales y acciones rápidas.
- Checkout con validación de formulario y generación de ID de orden.
- Panel de administración con acciones de seed, reset, actualización de imágenes y borrado.
- Tema claro, oscuro y automático (sistema), con persistencia.
- Selector de idioma con traducciones completas de UI y productos (ES/EN).

## Estructura del proyecto

```
e-commerce-js-project/
├── css/
│   └── styles.css        # Estilos base, componentes y utilidades
├── js/
│   ├── app.js            # Lógica completa: router, render, CartStore, i18n, tema, admin
│   └── data.js           # Catálogo local (local-first), funciones de acceso a productos
├── .gitignore
├── README.md
├── index.html            # Shell de la app y navbar
└── server.mjs            # Servidor dev estático (requiere Bun)
```

## Requisitos

- Navegador moderno con soporte de `localStorage`.
- [Bun](https://bun.sh) (opcional, solo para el servidor dev local).

## Cómo correr

### Opción 1 — Con servidor dev (recomendado)

Evita problemas con rutas y caché al usar `file://`.

```bash
bun server.mjs
```

Abrí [http://localhost:3000](http://localhost:3000) en el browser.

### Opción 2 — Sin servidor

Abrí `index.html` directamente en el browser. En la mayoría de los browsers modernos funciona sin problemas.

## Rutas disponibles

| Ruta | Descripción |
|------|-------------|
| `#/` | Catálogo completo |
| `#/category/tecnologia` | Categoría Tecnología |
| `#/category/ropa` | Categoría Ropa |
| `#/category/hogar` | Categoría Hogar |
| `#/item/:id` | Detalle de producto |
| `#/cart` | Carrito |
| `#/checkout` | Checkout |
| `#/admin` | Panel de administración |

## Panel de administración

- Accedé desde `#/admin`.
- Contraseña: `admin1234`

| Acción | Descripción |
|--------|-------------|
| Reset completo | Borra todo, recarga el seed y actualiza imágenes |
| Cargar productos | Carga el catálogo base (seed) |
| Actualizar imágenes | Reaplica las imágenes definidas en `PRODUCT_IMAGE_OVERRIDES` |
| Borrar todos los productos | Vacía el catálogo |

## Datos y persistencia

- El catálogo se genera desde `BASE_PRODUCTS` en `data.js` y se almacena en `localStorage` (local-first, sin red).
- El carrito, el tema y el idioma también se persisten en `localStorage`.
- Para resetear todo, usá la acción "Reset completo" en el panel admin o limpiá `localStorage` desde las DevTools del browser.

### Base de datos local

Actualmente el proyecto **no usa ninguna base de datos externa**. Todos los productos están definidos directamente en el código (`js/data.js`) y se sirven desde memoria y `localStorage`. Esto hace que la app funcione sin conexión a internet y sin ninguna configuración adicional.

### Integración futura con Firestore

A futuro se podría reemplazar el catálogo local por **Cloud Firestore** (Firebase). El flujo sería:

1. Reemplazar `fetchProducts()` y `fetchProductById()` en `data.js` por llamadas a Firestore.
2. Usar el panel admin para hacer seed de los productos en la colección `products` de Firestore.
3. Agregar reglas de seguridad en Firestore: lectura pública, escritura solo para administradores autenticados.

Esta migración no requeriría cambios en `app.js` ya que la interfaz de `fetchProducts` y `fetchProductById` se mantendría igual.

## Notas

- Los scripts se cargan con cache-busting (`?v=5`) en `index.html`.
- No se usan dependencias externas en producción — todo es HTML, CSS y JS puro.

---

Proyecto educativo — [Germán Alvarado](https://github.com/galvaradosd)
