const STORAGE_KEY = 'miec-products';
const CART_STORAGE_KEY = 'miec-cart';
const THEME_KEY = 'shopfast-theme';
const ADMIN_AUTH_KEY = 'shopfast-admin-auth';
const ADMIN_PASSWORD = 'admin1234';
const LANG_KEY = 'shopfast-lang';

const deepFreeze = (value) => {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value);
    Object.values(value).forEach(deepFreeze);
  }
  return value;
};

const BASE_PRODUCTS = deepFreeze([
  {
    name: 'iPhone 15 Pro Max',
    price: 1300,
    category: 'tecnologia',
    stock: 15,
    description: 'Smartphone de titanio con chip A17 Pro y cámara de 48MP.',
  },
  {
    name: 'MacBook Pro 14" M3',
    price: 1999,
    category: 'tecnologia',
    stock: 8,
    description: 'Laptop para profesionales con rendimiento extremo.',
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    price: 1250,
    category: 'tecnologia',
    stock: 12,
    description: 'Smartphone Android con IA integrada y S-Pen.',
  },
  {
    name: 'Sony PlayStation 5',
    price: 499,
    category: 'tecnologia',
    stock: 20,
    description: 'Consola de videojuegos de última generación.',
  },
  {
    name: 'Xbox Series X',
    price: 499,
    category: 'tecnologia',
    stock: 18,
    description: 'Consola de Microsoft con gráficos en 4K reales.',
  },
  {
    name: 'Nintendo Switch OLED',
    price: 349,
    category: 'tecnologia',
    stock: 25,
    description: 'Consola híbrida con pantalla vibrante OLED de 7 pulgadas.',
  },
  {
    name: 'AirPods Pro 2',
    price: 249,
    category: 'tecnologia',
    stock: 30,
    description: 'Audífonos inalámbricos con cancelación activa de ruido.',
  },
  {
    name: 'Sony WH-1000XM5',
    price: 348,
    category: 'tecnologia',
    stock: 15,
    description: 'Auriculares de diadema líderes en cancelación de ruido.',
  },
  {
    name: 'iPad Air 5ta Gen',
    price: 599,
    category: 'tecnologia',
    stock: 22,
    description: 'Tableta versátil con chip M1 de Apple.',
  },
  {
    name: 'Samsung Galaxy Tab S9',
    price: 799,
    category: 'tecnologia',
    stock: 14,
    description: 'Tableta premium con pantalla AMOLED.',
  },
  {
    name: 'Camiseta de Algodón Básica',
    price: 25,
    category: 'ropa',
    stock: 100,
    description: 'Camiseta unisex 100% algodón, ideal para uso diario.',
  },
  {
    name: 'Chaqueta de Cuero Vintage',
    price: 120,
    category: 'ropa',
    stock: 15,
    description: 'Chaqueta de cuero genuino estilo motero.',
  },
  {
    name: 'Pantalón Jean Skinny',
    price: 45,
    category: 'ropa',
    stock: 60,
    description: 'Pantalón vaquero ajustado y elástico.',
  },
  {
    name: 'Zapatillas Deportivas Nike Air',
    price: 110,
    category: 'ropa',
    stock: 30,
    description: 'Zapatillas ligeras para correr o entrenar.',
  },
  {
    name: 'Sudadera con Capucha',
    price: 55,
    category: 'ropa',
    stock: 40,
    description: 'Sudadera cálida con bolsillo frontal y capucha.',
  },
  {
    name: 'Vestido de Verano Floral',
    price: 35,
    category: 'ropa',
    stock: 25,
    description: 'Vestido ligero con estampado de flores.',
  },
  {
    name: 'Camisa de Botones Elegante',
    price: 40,
    category: 'ropa',
    stock: 35,
    description: 'Camisa de manga larga perfecta para la oficina.',
  },
  {
    name: 'Pantalón de Chándal Jogger',
    price: 30,
    category: 'ropa',
    stock: 55,
    description: 'Pantalón cómodo para estar en casa o hacer ejercicio.',
  },
  {
    name: 'Abrigo de Invierno Impermeable',
    price: 85,
    category: 'ropa',
    stock: 20,
    description: 'Abrigo grueso resistente al agua y al viento.',
  },
  {
    name: 'Zapatos de Vestir Oxford',
    price: 75,
    category: 'ropa',
    stock: 18,
    description: 'Calzado formal de cuero negro.',
  },
  {
    name: 'Sofá de 3 Plazas Minimalista',
    price: 450,
    category: 'hogar',
    stock: 5,
    description: 'Sofá cómodo de tela en color gris neutro.',
  },
  {
    name: 'Mesa de Comedor de Madera',
    price: 290,
    category: 'hogar',
    stock: 8,
    description: 'Mesa de madera de roble para 6 personas.',
  },
  {
    name: 'Lámpara de Pie Moderna',
    price: 65,
    category: 'hogar',
    stock: 20,
    description: 'Lámpara de diseño industrial para sala de estar.',
  },
  {
    name: 'Juego de Ollas Antiadherentes',
    price: 120,
    category: 'hogar',
    stock: 15,
    description: 'Batería de cocina de 7 piezas de aluminio.',
  },
  {
    name: 'Cafetera de Goteo Programable',
    price: 45,
    category: 'hogar',
    stock: 25,
    description: 'Cafetera eléctrica para 12 tazas.',
  },
  {
    name: 'Robot Aspirador Inteligente',
    price: 199,
    category: 'hogar',
    stock: 12,
    description: 'Aspiradora que limpia tu casa automáticamente.',
  },
  {
    name: 'Set de Sábanas de Algodón',
    price: 55,
    category: 'hogar',
    stock: 35,
    description: 'Sábanas tamaño Queen de 400 hilos.',
  },
  {
    name: 'Espejo Redondo Decorativo',
    price: 40,
    category: 'hogar',
    stock: 18,
    description: 'Espejo de pared con marco dorado.',
  },
  {
    name: 'Alfombra Persa Sintética',
    price: 85,
    category: 'hogar',
    stock: 10,
    description: 'Alfombra grande para sala con patrones clásicos.',
  },
  {
    name: 'Silla de Oficina Ergonómica',
    price: 130,
    category: 'hogar',
    stock: 22,
    description: 'Silla con soporte lumbar para teletrabajo.',
  },
]);

const PRODUCT_TRANSLATIONS = deepFreeze([
  {
    name: 'iPhone 15 Pro Max',
    description: 'Titanium smartphone with A17 Pro chip and 48MP camera.',
  },
  {
    name: 'MacBook Pro 14" M3',
    description: 'Laptop for professionals with extreme performance.',
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Android smartphone with built-in AI and S Pen.',
  },
  {
    name: 'Sony PlayStation 5',
    description: 'Next-generation gaming console.',
  },
  {
    name: 'Xbox Series X',
    description: 'Microsoft console with true 4K graphics.',
  },
  {
    name: 'Nintendo Switch OLED',
    description: 'Hybrid console with vibrant 7-inch OLED screen.',
  },
  {
    name: 'AirPods Pro 2',
    description: 'Wireless earbuds with active noise cancellation.',
  },
  {
    name: 'Sony WH-1000XM5',
    description: 'Over-ear headphones leading in noise cancellation.',
  },
  {
    name: 'iPad Air 5th Gen',
    description: 'Versatile tablet with Apple M1 chip.',
  },
  {
    name: 'Samsung Galaxy Tab S9',
    description: 'Premium tablet with AMOLED display.',
  },
  {
    name: 'Basic Cotton T-Shirt',
    description: 'Unisex 100% cotton tee, ideal for everyday wear.',
  },
  {
    name: 'Vintage Leather Jacket',
    description: 'Genuine leather biker-style jacket.',
  },
  {
    name: 'Skinny Jeans',
    description: 'Slim, stretchy denim pants.',
  },
  {
    name: 'Nike Air Sports Sneakers',
    description: 'Lightweight sneakers for running or training.',
  },
  {
    name: 'Hooded Sweatshirt',
    description: 'Warm hoodie with front pocket and hood.',
  },
  {
    name: 'Floral Summer Dress',
    description: 'Lightweight dress with floral print.',
  },
  {
    name: 'Elegant Button-Up Shirt',
    description: 'Long-sleeve shirt perfect for the office.',
  },
  {
    name: 'Jogger Sweatpants',
    description: 'Comfortable pants for lounging or exercise.',
  },
  {
    name: 'Waterproof Winter Coat',
    description: 'Thick coat resistant to water and wind.',
  },
  {
    name: 'Oxford Dress Shoes',
    description: 'Formal black leather shoes.',
  },
  {
    name: 'Minimalist 3-Seater Sofa',
    description: 'Comfortable fabric sofa in neutral gray.',
  },
  {
    name: 'Wooden Dining Table',
    description: 'Oak wood table for 6 people.',
  },
  {
    name: 'Modern Floor Lamp',
    description: 'Industrial design floor lamp for living room.',
  },
  {
    name: 'Nonstick Cookware Set',
    description: '7-piece aluminum cookware set.',
  },
  {
    name: 'Programmable Drip Coffee Maker',
    description: 'Electric coffee maker for 12 cups.',
  },
  {
    name: 'Smart Robot Vacuum',
    description: 'Vacuum that cleans your home automatically.',
  },
  {
    name: 'Cotton Sheet Set',
    description: 'Queen-size 400-thread-count sheets.',
  },
  {
    name: 'Decorative Round Mirror',
    description: 'Wall mirror with gold frame.',
  },
  {
    name: 'Synthetic Persian Rug',
    description: 'Large living room rug with classic patterns.',
  },
  {
    name: 'Ergonomic Office Chair',
    description: 'Chair with lumbar support for remote work.',
  },
]);

const IMAGE_BASE_URL = 'https://picsum.photos/seed';
const FALLBACK_IMAGE = 'https://picsum.photos/seed/fallback/600/600';
const PRODUCT_IMAGE_OVERRIDES = deepFreeze({
  '1': 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/ed134c063dd3e84cf73e043e9bd63ad8deb12148.jpg',
  '2': 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/fbe26db55dd7434f497180e4b45c21b63b0f13a7.jpg',
  '3': 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/a2f78ffbefea46276854f5ff1b40e55073322fff.jpg',
  '4': 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/6729d8c1d6e634ebb83de0a46cc94c7365737de6.jpg',
  '5': 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/216319bf68a2ca59c1a047a3554b8e01eb822a5f.jpg',
  '6': 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/509669c2082e1202b7232bbd6e79b3cd31156687.jpg',
  '7': 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/cd383b0e8ebd0147b4f8193cc6de29460be84af1.jpg',
  '8': 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/8148d1904eafadb5443e17e68968c525d5a30312.jpg',
  '9': 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/7a7471c3eeb371fa4471827bdb819894d57edad4.jpg',
  '10': 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/fdaf29baac2eecac092d06e802cb12e6f2d9ee15.jpg',
  '11': 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/bd4a918d7b2aceaf75121d1fbd608e8fd305f511.jpg',
  '12': 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/292cadff8951652487144bd55994bfe7642a7508.jpg',
  '13': 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/443ededba42b796e841f5ae06da6718291ca1e2e.jpg',
  '14': 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/62d791b8cd3be65fdc549c41d92de40a3a63f8f5.jpg',
  '15': 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/53844166f080f8cf4a6d1c86861f5ee10bcae987.jpg',
  '16': 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/13e5bd536614d81a2d8e8b67cd8a1a0d47757844.jpg',
  '17': 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/56221e70f19e79e727c9905b6ed9a7c3baf07361.jpg',
  '18': 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/4a562bdf1bf760d82c3a1a9eb24c8300fbc63ff5.jpg',
  '19': 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/789726fa98ef9b66f046fa3fa50056468d496945.jpg',
  '20': 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/06a02a1cb7172139a1519c7bcca7008bace82bd2.jpg',
  '21': 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/f8344fbee351c73c507398acd6af85ce07a9d58b.jpg',
  '22': 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/79d33c69528e318f90c8f5d1d2d9477a99dcba97.jpg',
  '23': 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/81c9fdad8d8f98a358953a170931ea4728383011.jpg',
  '24': 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/416e32528cd01a94e51470016a91afba79d712c7.jpg',
  '25': 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/bf9cecb9c060ea6564047a691ab52c22fe13a101.jpg',
  '26': 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/b5060a2dc885f6054a0a055c5a9d350935578c6e.jpg',
  '27': 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/fca2ed965e7a3a094b50bac323c0a5ab587ece2f.jpg',
  '28': 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/8e4059c1875dfb30a494d9ae7efe1c1d584c8a21.jpg',
  '29': 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/337eb657f1e0833269199036129995f093c87295.jpg',
  '30': 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/27b5dfb82574f0dfbe35cb03beb44c4d82eb4178.jpg',
});

const hashString = (value) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const getImageForCategory = (category, seed) => {
  const signature = hashString(`${category}-${seed}`);
  return `${IMAGE_BASE_URL}/${signature}/600/600`;
};

const safeParse = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const cloneProducts = (products) =>
  structuredClone?.(products) ?? products.map((product) => ({ ...product }));

const delay = (ms = 300) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const createSeedProducts = () =>
  BASE_PRODUCTS.map((product, index) => {
    const translation = PRODUCT_TRANSLATIONS[index] ?? {};
    const name = {
      es: product.name,
      en: translation.name ?? product.name,
    };
    const description = {
      es: product.description,
      en: translation.description ?? product.description,
    };
    const seedName = name.es ?? product.name;

    const id = String(index + 1);
    const override = PRODUCT_IMAGE_OVERRIDES[id];

    return {
      ...product,
      name,
      description,
      id,
      img: override ?? getImageForCategory(product.category, seedName),
    };
  });

const getProductSeedName = (product) => {
  if (!product) return '';
  if (typeof product.name === 'string') return product.name;
  if (product.name && typeof product.name === 'object') {
    return product.name.es ?? product.name.en ?? '';
  }
  return '';
};

const readStoredProducts = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  const parsed = raw ? safeParse(raw) : null;
  return Array.isArray(parsed) ? parsed : null;
};

const writeProducts = (products) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

const ensureCatalog = () => {
  if (!readStoredProducts()) {
    writeProducts(createSeedProducts());
  }
};

const fetchProducts = async (categoryId) => {
  await delay();
  const products = readStoredProducts() ?? createSeedProducts();
  const filtered = categoryId
    ? products.filter((product) => product.category === categoryId)
    : products;

  return cloneProducts(filtered);
};

const fetchProductById = async (itemId) => {
  await delay();
  const products = readStoredProducts() ?? createSeedProducts();
  const found = products.find((product) => product.id === itemId) ?? null;
  return found ? { ...found } : null;
};

const seedProducts = () => {
  const seeded = createSeedProducts();
  writeProducts(seeded);
  return cloneProducts(seeded);
};

const deleteAllProducts = () => {
  writeProducts([]);
  return [];
};

const updateProductImages = () => {
  const products = readStoredProducts() ?? [];
  const updated = products.map((product) => {
    const override = PRODUCT_IMAGE_OVERRIDES[String(product.id)];
    return {
      ...product,
      img: override ?? getImageForCategory(product.category, getProductSeedName(product)),
    };
  });

  writeProducts(updated);
  return cloneProducts(updated);
};

const normalizeQuantity = (value) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 1;
  return Math.max(1, Math.floor(parsed));
};

const normalizeCart = (value) =>
  Array.isArray(value)
    ? value.filter((item) => item && typeof item.id === 'string')
    : [];

class CartStore extends EventTarget {
  #key;
  #cart;

  constructor({ key = CART_STORAGE_KEY } = {}) {
    super();
    this.#key = key;
    this.#cart = this.#read();
  }

  get items() {
    return structuredClone?.(this.#cart) ?? [...this.#cart];
  }

  get totals() {
    const totalQuantity = this.#cart.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    const totalAmount = this.#cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    return { totalQuantity, totalAmount };
  }

  add(item, quantity = 1) {
    if (!item?.id) return this.items;

    const normalizedQuantity = normalizeQuantity(quantity);
    const existing = this.#cart.find((entry) => entry.id === item.id);

    if (existing) {
      this.#cart = this.#cart.map((entry) =>
        entry.id === item.id
          ? { ...entry, quantity: entry.quantity + normalizedQuantity }
          : entry
      );
    } else {
      this.#cart = [
        ...this.#cart,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          img: item.img,
          quantity: normalizedQuantity,
        },
      ];
    }

    this.#persist();
    return this.items;
  }

  updateQuantity(itemId, nextQuantity) {
    if (!itemId) return this.items;
    const normalized = Math.max(0, Math.floor(Number(nextQuantity) || 0));
    if (normalized <= 0) {
      this.#cart = this.#cart.filter((item) => item.id !== itemId);
    } else {
      this.#cart = this.#cart.map((item) =>
        item.id === itemId ? { ...item, quantity: normalized } : item
      );
    }
    this.#persist();
    return this.items;
  }

  remove(itemId) {
    this.#cart = this.#cart.filter((item) => item.id !== itemId);
    this.#persist();
    return this.items;
  }

  clear() {
    this.#cart = [];
    this.#persist();
    return this.items;
  }

  subscribe(handler) {
    const listener = (event) => handler(event.detail);
    this.addEventListener('change', listener);

    return () => this.removeEventListener('change', listener);
  }

  #read() {
    const raw = localStorage.getItem(this.#key);
    const parsed = raw ? safeParse(raw) : null;
    return normalizeCart(parsed);
  }

  #persist() {
    localStorage.setItem(this.#key, JSON.stringify(this.#cart));
    this.#emit();
  }

  #emit() {
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          cart: this.items,
          totals: this.totals,
        },
      })
    );
  }
}

const cartStore = new CartStore();

const app = document.getElementById('app');
const cartWidget = document.querySelector('.cart-widget');
const cartCount = document.querySelector('[data-cart-count]');
const navLinks = Array.from(document.querySelectorAll('.nav__link'));
const themeSelect = document.querySelector('[data-theme-select]');
const languageSelect = document.querySelector('[data-language-select]');
const i18nNodes = Array.from(document.querySelectorAll('[data-i18n]'));
const adminLink = document.querySelector('[data-route="admin"]');
const metaDescription = document.querySelector('meta[name="description"]');

if (!app) {
  throw new Error('No se encontró el contenedor principal #app.');
}

const CATEGORY_LABELS = {
  tecnologia: { es: 'Tecnología', en: 'Technology' },
  ropa: { es: 'Ropa', en: 'Clothing' },
  hogar: { es: 'Hogar', en: 'Home' },
};

const I18N = {
  es: {
    navAll: 'Todos',
    navTech: 'Tecnología',
    navClothing: 'Ropa',
    navHome: 'Hogar',
    navAdmin: 'Admin',
    themeLabel: 'Tema',
    themeSystem: 'Sistema',
    themeLight: 'Claro',
    themeDark: 'Oscuro',
    languageLabel: 'Idioma',
    languageSpanish: 'Español',
    languageEnglish: 'English',
    cartAriaLabel: 'Ir al carrito',
    loadingCatalogTitle: 'Cargando catálogo',
    loadingDescription: 'Cargando información…',
    listTitleAll: 'Descubre todos nuestros productos',
    listTitleCategory: 'Catálogo de {category}',
    viewDetail: 'Ver detalle',
    productMissingTitle: 'El producto no existe 😢',
    productMissingDescription: 'No encontramos este artículo en el catálogo.',
    cartDescription: 'Revisa tus productos antes de finalizar la compra.',
    listMetaAll: 'Explora {count} productos destacados.',
    listMetaCategory: 'Explora {count} productos de {category}.',
    emptyProductsTitle: 'No hay productos 😢',
    emptyProductsDescription: 'Intenta con otra categoría o vuelve más tarde.',
    emptyProductsCta: 'Volver al catálogo',
    productDetailTitle: 'Detalle del producto',
    categoryLabel: 'Categoría: {category}',
    addToCart: 'Agregar al carrito',
    finishPurchase: 'Terminar compra',
    cartTitle: 'Tu carrito',
    cartEmptyTitle: 'Tu carrito está vacío 🛒',
    cartEmptyDescription: '¿No sabes qué comprar? ¡Miles de productos te esperan!',
    cartEmptyCta: 'Volver al catálogo',
    unitPriceLabel: 'Precio unitario',
    stockLabel: 'Stock disponible',
    subtotalLabel: 'Subtotal',
    removeItem: 'Eliminar 🗑️',
    totalLabel: 'Total',
    clearCart: 'Vaciar carrito',
    checkoutCta: 'Finalizar compra',
    checkoutTitle: 'Checkout',
    checkoutDescription: 'Completa tus datos para finalizar la compra.',
    checkoutName: 'Nombre completo',
    checkoutPhone: 'Teléfono',
    checkoutEmail: 'Email',
    checkoutEmailConfirm: 'Confirmar email',
    checkoutSubmit: 'Confirmar compra ({total})',
    checkoutEmptyError: 'Tu carrito está vacío.',
    checkoutMissingError: 'Por favor, completa todos los campos.',
    checkoutEmailMismatch: 'Los correos electrónicos no coinciden.',
    checkoutProcessingTitle: 'Procesando tu orden... ⏳',
    checkoutProcessingSubtitle: 'Por favor, no cierres esta ventana.',
    orderThanksTitle: '¡Gracias por tu compra, {name}! 🎉',
    orderSuccessSubtitle: 'Tu orden ha sido generada con éxito.',
    orderIdLabel: 'El ID de tu orden es:',
    orderIdHint: 'Guarda este código para rastrear tu pedido.',
    adminLoginTitle: 'Acceso administrador',
    adminLoginDescription: 'Inicia sesión para acceder al panel de administración.',
    adminPasswordLabel: 'Contraseña',
    adminLoginButton: 'Ingresar',
    adminWrongPassword: 'Contraseña incorrecta.',
    adminPanelTitle: 'Panel de administración',
    adminPanelDescription: 'Herramientas para reiniciar el catálogo y actualizar imágenes.',
    adminReset: 'Reset completo (borrar + seed + imágenes)',
    adminSeed: 'Cargar productos (seed)',
    adminImages: 'Actualizar imágenes',
    adminDelete: 'Borrar todos los productos',
    adminLogout: 'Cerrar sesión',
    adminProcessing: 'Procesando…',
    adminResetSuccess: 'Catálogo reiniciado con éxito.',
    adminSeedSuccess: 'Productos cargados con éxito.',
    adminImagesSuccess: 'Imágenes actualizadas con éxito.',
    adminDeleteSuccess: 'Productos eliminados con éxito.',
    notFoundTitle: '404 - Página no encontrada',
    notFoundDescription: 'La ruta que buscas no existe.',
    notFoundCta: 'Volver al inicio',
    detailStockError: 'Stock insuficiente. Disponible: {stock}.',
    detailStockPartial:
      'Stock insuficiente. Agregamos {remaining} unidad(es). Disponible: {stock}.',
    cartStockError: 'Stock insuficiente. Disponible: {stock}.',
  },
  en: {
    navAll: 'All',
    navTech: 'Technology',
    navClothing: 'Clothing',
    navHome: 'Home',
    navAdmin: 'Admin',
    themeLabel: 'Theme',
    themeSystem: 'System',
    themeLight: 'Light',
    themeDark: 'Dark',
    languageLabel: 'Language',
    languageSpanish: 'Spanish',
    languageEnglish: 'English',
    cartAriaLabel: 'Go to cart',
    loadingCatalogTitle: 'Loading catalog',
    loadingDescription: 'Loading information…',
    listTitleAll: 'Discover all our products',
    listTitleCategory: 'Catalog for {category}',
    viewDetail: 'View details',
    productMissingTitle: 'Product not found 😢',
    productMissingDescription: 'We could not find this item in the catalog.',
    cartDescription: 'Review your products before completing the purchase.',
    listMetaAll: 'Explore {count} featured products.',
    listMetaCategory: 'Explore {count} {category} products.',
    emptyProductsTitle: 'No products 😢',
    emptyProductsDescription: 'Try another category or come back later.',
    emptyProductsCta: 'Back to catalog',
    productDetailTitle: 'Product details',
    categoryLabel: 'Category: {category}',
    addToCart: 'Add to cart',
    finishPurchase: 'Finish purchase',
    cartTitle: 'Your cart',
    cartEmptyTitle: 'Your cart is empty 🛒',
    cartEmptyDescription: 'Not sure what to buy? Thousands of products await!',
    cartEmptyCta: 'Back to catalog',
    unitPriceLabel: 'Unit price',
    stockLabel: 'Stock available',
    subtotalLabel: 'Subtotal',
    removeItem: 'Remove 🗑️',
    totalLabel: 'Total',
    clearCart: 'Clear cart',
    checkoutCta: 'Checkout',
    checkoutTitle: 'Checkout',
    checkoutDescription: 'Complete your details to finish the purchase.',
    checkoutName: 'Full name',
    checkoutPhone: 'Phone',
    checkoutEmail: 'Email',
    checkoutEmailConfirm: 'Confirm email',
    checkoutSubmit: 'Place order ({total})',
    checkoutEmptyError: 'Your cart is empty.',
    checkoutMissingError: 'Please complete all fields.',
    checkoutEmailMismatch: 'Emails do not match.',
    checkoutProcessingTitle: 'Processing your order... ⏳',
    checkoutProcessingSubtitle: 'Please do not close this window.',
    orderThanksTitle: 'Thanks for your purchase, {name}! 🎉',
    orderSuccessSubtitle: 'Your order has been created successfully.',
    orderIdLabel: 'Your order ID is:',
    orderIdHint: 'Save this code to track your order.',
    adminLoginTitle: 'Admin access',
    adminLoginDescription: 'Sign in to access the admin panel.',
    adminPasswordLabel: 'Password',
    adminLoginButton: 'Sign in',
    adminWrongPassword: 'Incorrect password.',
    adminPanelTitle: 'Admin panel',
    adminPanelDescription: 'Tools to reset the catalog and update images.',
    adminReset: 'Full reset (delete + seed + images)',
    adminSeed: 'Load products (seed)',
    adminImages: 'Update images',
    adminDelete: 'Delete all products',
    adminLogout: 'Sign out',
    adminProcessing: 'Processing…',
    adminResetSuccess: 'Catalog reset successfully.',
    adminSeedSuccess: 'Products loaded successfully.',
    adminImagesSuccess: 'Images updated successfully.',
    adminDeleteSuccess: 'Products deleted successfully.',
    notFoundTitle: '404 - Page not found',
    notFoundDescription: 'The route you are looking for does not exist.',
    notFoundCta: 'Back to home',
    detailStockError: 'Not enough stock. Available: {stock}.',
    detailStockPartial:
      'Not enough stock. Added {remaining} unit(s). Available: {stock}.',
    cartStockError: 'Not enough stock. Available: {stock}.',
  },
};

const formatMessage = (template, params = {}) =>
  template.replace(/\{(\w+)\}/g, (_, key) => String(params[key] ?? ''));

let currentLang = 'es';

const t = (key, params = {}) => {
  const dict = I18N[currentLang] ?? I18N.es;
  const fallback = I18N.es?.[key] ?? key;
  const value = dict[key] ?? fallback;
  return formatMessage(value, params);
};

const getLanguagePreference = () => {
  const stored = localStorage.getItem(LANG_KEY);
  return stored === 'es' || stored === 'en' ? stored : 'es';
};

const syncI18nNodes = () => {
  i18nNodes.forEach((node) => {
    const key = node.dataset.i18n;
    if (!key) return;
    node.textContent = t(key);
  });
};

const applyLanguage = () => {
  document.documentElement.lang = currentLang;
  if (languageSelect) {
    languageSelect.value = currentLang;
  }
  syncI18nNodes();
  if (cartWidget) {
    cartWidget.setAttribute('aria-label', t('cartAriaLabel'));
  }
};

const setLanguagePreference = (value) => {
  if (value !== 'es' && value !== 'en') return;
  localStorage.setItem(LANG_KEY, value);
  currentLang = value;
  applyLanguage();
  router();
};

const initLanguage = () => {
  currentLang = getLanguagePreference();
  applyLanguage();
  if (languageSelect) {
    languageSelect.addEventListener('change', (event) => {
      setLanguagePreference(event.target.value);
    });
  }
};

const getLocalizedField = (field) => {
  if (typeof field === 'string') return field;
  if (field && typeof field === 'object') {
    return field[currentLang] ?? field.es ?? field.en ?? '';
  }
  return '';
};

const getProductName = (product) => getLocalizedField(product?.name);
const getProductDescription = (product) => getLocalizedField(product?.description);

const getCategoryLabel = (categoryId) =>
  CATEGORY_LABELS[categoryId]?.[currentLang] ?? categoryId;

const formatCurrency = (value) =>
  new Intl.NumberFormat(currentLang === 'en' ? 'en-US' : 'es-AR', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

const themeMedia = window.matchMedia
  ? window.matchMedia('(prefers-color-scheme: dark)')
  : null;

const getThemePreference = () => {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'light' || stored === 'dark' || stored === 'system') {
    return stored;
  }
  return 'system';
};

const resolveTheme = (preference) => {
  if (preference === 'system') {
    return themeMedia && themeMedia.matches ? 'dark' : 'light';
  }
  return preference;
};

const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
};

const syncThemeSelect = (preference) => {
  if (!themeSelect) return;
  themeSelect.value = preference;
};

const pulseThemeSelect = () => {
  if (!themeSelect) return;
  themeSelect.classList.remove('theme-control__select--pulse');
  void themeSelect.offsetWidth;
  themeSelect.classList.add('theme-control__select--pulse');
};

const setThemePreference = (preference) => {
  localStorage.setItem(THEME_KEY, preference);
  applyTheme(resolveTheme(preference));
  syncThemeSelect(preference);
  pulseThemeSelect();
};

const initTheme = () => {
  const preference = getThemePreference();
  syncThemeSelect(preference);
  applyTheme(resolveTheme(preference));

  if (themeSelect) {
    themeSelect.addEventListener('change', (event) => {
      setThemePreference(event.target.value);
    });
  }

  if (themeMedia) {
    themeMedia.addEventListener('change', () => {
      if (getThemePreference() === 'system') {
        applyTheme(resolveTheme('system'));
      }
    });
  }
};

const isAdminAuthed = () => localStorage.getItem(ADMIN_AUTH_KEY) === 'true';

const setAdminAuthed = (value) => {
  localStorage.setItem(ADMIN_AUTH_KEY, value ? 'true' : 'false');
  syncAdminNav();
};

const syncAdminNav = () => {
  if (!adminLink) return;
  const authed = isAdminAuthed();
  adminLink.hidden = false;
  adminLink.setAttribute('aria-hidden', 'false');
  if (!authed) {
    adminLink.removeAttribute('aria-current');
  }
};

const normalizeHash = (hash) => {
  if (!hash || hash === '#') return '#/';
  if (hash.startsWith('#/')) return hash;
  return `#/${hash.replace(/^#/, '')}`;
};

const withViewTransition = (callback) => {
  if (document.startViewTransition) {
    document.startViewTransition(callback);
  } else {
    callback();
  }
};

const template = (html) => {
  const node = document.createElement('template');
  node.innerHTML = html.trim();
  return node.content;
};

const render = (html) => {
  withViewTransition(() => {
    app.replaceChildren(template(html));
  });
};

const detailState = {
  product: null,
  quantity: 1,
};

const syncDetailCounter = () => {
  const counter = app.querySelector('[data-counter]');
  if (!counter || !detailState.product) return;

  const quantityEl = counter.querySelector('[data-quantity]');
  const decrementBtn = counter.querySelector('[data-action="decrement"]');
  const incrementBtn = counter.querySelector('[data-action="increment"]');
  const addBtn = counter.querySelector('[data-action="add"]');

  if (quantityEl) {
    quantityEl.textContent = String(detailState.quantity);
  }
  if (decrementBtn) {
    decrementBtn.disabled = detailState.quantity <= 1;
  }
  if (incrementBtn) {
    incrementBtn.disabled = detailState.quantity >= detailState.product.stock;
  }
  if (addBtn) {
    addBtn.disabled = detailState.product.stock <= 0;
  }
};

const getStockById = (productId) => {
  const products = readStoredProducts() ?? createSeedProducts();
  const found = products.find((product) => product.id === productId);
  return typeof found?.stock === 'number' ? found.stock : null;
};

const setDetailError = (message = '') => {
  const errorEl = app.querySelector('[data-detail-error]');
  if (errorEl) {
    errorEl.textContent = message;
  }
};

const setCartError = (message = '') => {
  const errorEl = app.querySelector('[data-cart-error]');
  if (errorEl) {
    errorEl.textContent = message;
  }
};

const handleAppClick = (event) => {
  const target = event.target instanceof Element ? event.target : null;
  const actionElement = target?.closest('[data-action]');
  const isCounterAction =
    actionElement && actionElement.closest('[data-counter]');
  if (isCounterAction && detailState.product) {
    if (actionElement.disabled) return;
    const { action } = actionElement.dataset;

    if (action === 'increment' && detailState.quantity < detailState.product.stock) {
      detailState.quantity += 1;
      setDetailError('');
      syncDetailCounter();
    }

    if (action === 'decrement' && detailState.quantity > 1) {
      detailState.quantity -= 1;
      setDetailError('');
      syncDetailCounter();
    }

    if (action === 'add') {
      const stock =
        typeof detailState.product.stock === 'number'
          ? detailState.product.stock
          : null;
      const existing = cartStore.items.find(
        (entry) => entry.id === detailState.product.id
      );
      const existingQty = existing ? existing.quantity : 0;
      let addQuantity = detailState.quantity;

      if (stock !== null) {
        const remaining = Math.max(0, stock - existingQty);
        if (remaining <= 0) {
          setDetailError(t('detailStockError', { stock }));
          return;
        }
        if (addQuantity > remaining) {
          addQuantity = remaining;
          setDetailError(
            t('detailStockPartial', { remaining, stock })
          );
        } else {
          setDetailError('');
        }
      }

      if (addQuantity <= 0) {
        return;
      }

      cartStore.add(
        {
          id: detailState.product.id,
          name: getProductName(detailState.product),
          price: detailState.product.price,
          img: detailState.product.img,
        },
        addQuantity
      );
      updateCartWidget();

      const counter = app.querySelector('[data-counter]');
      if (counter) {
        counter.outerHTML = `
      <a class="button button--primary" href="#/cart">
        ${t('finishPurchase')}
      </a>
    `;
      }
    }
  }

  const cartActionElement = target?.closest('[data-action][data-id]');
  const isCartCounterAction =
    cartActionElement && cartActionElement.closest('[data-cart-counter]');
  if (isCartCounterAction) {
    if (cartActionElement.disabled) return;
    const { action, id } = cartActionElement.dataset;
    const item = cartStore.items.find((entry) => entry.id === id);
    if (!item) return;

    if (action === 'cart-increment') {
      const stock = getStockById(id);
      if (typeof stock === 'number' && item.quantity >= stock) {
        setCartError(t('cartStockError', { stock }));
        return;
      }
      setCartError('');
      cartStore.updateQuantity(id, item.quantity + 1);
      updateCartWidget();
      renderCart();
    }

    if (action === 'cart-decrement') {
      setCartError('');
      cartStore.updateQuantity(id, item.quantity - 1);
      updateCartWidget();
      renderCart();
    }
  }

  const removeButton = target?.closest('[data-remove]');
  if (removeButton) {
    setCartError('');
    cartStore.remove(removeButton.dataset.remove);
    updateCartWidget();
    renderCart();
  }

  const clearButton = target?.closest('[data-clear]');
  if (clearButton) {
    setCartError('');
    cartStore.clear();
    updateCartWidget();
    renderCart();
  }

  const adminButton = target?.closest('[data-admin]');
  if (adminButton) {
    const action = adminButton.dataset.admin;
    const status = app.querySelector('[data-admin-status]');
    const setStatus = (message, type = '') => {
      if (!status) return;
      status.className = `admin__status ${type}`.trim();
      status.textContent = message;
    };

    setStatus(t('adminProcessing'));

    setTimeout(() => {
      if (action === 'reset') {
        deleteAllProducts();
        seedProducts();
        updateProductImages();
        setStatus(t('adminResetSuccess'), 'status--success');
      }

      if (action === 'seed') {
        seedProducts();
        setStatus(t('adminSeedSuccess'), 'status--success');
      }

      if (action === 'images') {
        updateProductImages();
        setStatus(t('adminImagesSuccess'), 'status--success');
      }

      if (action === 'delete') {
        deleteAllProducts();
        setStatus(t('adminDeleteSuccess'), 'status--success');
      }
    }, 400);
  }

  const logoutButton = target?.closest('[data-admin-logout]');
  if (logoutButton) {
    setAdminAuthed(false);
    renderAdminLogin();
  }
};

app.addEventListener('click', handleAppClick);

const handleAppSubmit = (event) => {
  const target = event.target;
  if (!(target instanceof HTMLFormElement)) return;

  if (target.matches('[data-admin-login]')) {
    event.preventDefault();
    const errorEl = app.querySelector('[data-admin-error]');
    if (errorEl) errorEl.textContent = '';

    const formData = new FormData(target);
    const password = String(formData.get('password') ?? '').trim();

    if (password === ADMIN_PASSWORD) {
      setAdminAuthed(true);
      window.location.hash = '#/admin';
      router();
      return;
    }

    if (errorEl) {
      errorEl.textContent = t('adminWrongPassword');
    }
  }
};

app.addEventListener('submit', handleAppSubmit);

const setActiveNav = () => {
  const current = normalizeHash(window.location.hash);
  navLinks.forEach((link) => {
    const isActive = normalizeHash(link.getAttribute('href')) === current;
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
    link.classList.toggle('nav__link--active', isActive);
  });
};

const setPageMeta = ({ title, description }) => {
  if (title) {
    document.title = `ShopFast | ${title}`;
  }
  if (description && metaDescription) {
    metaDescription.setAttribute('content', description);
  }
};

let lastCartQuantity = null;

const updateCartWidget = (totals = cartStore.totals) => {
  const { totalQuantity } = totals;
  if (cartCount) {
    cartCount.textContent = totalQuantity;
    if (lastCartQuantity !== null && totalQuantity !== lastCartQuantity) {
      cartCount.classList.remove('cart-widget__count--pulse');
      void cartCount.offsetWidth;
      cartCount.classList.add('cart-widget__count--pulse');
    }
  }
  if (cartWidget) {
    cartWidget.hidden = totalQuantity === 0;
    cartWidget.setAttribute('aria-hidden', String(totalQuantity === 0));
  }
  lastCartQuantity = totalQuantity;
};

const renderLoading = (title) => {
  const description = t('loadingDescription');
  setPageMeta({
    title,
    description,
  });

  render(`
    <section class="section">
      <h1 class="section-title">${title}</h1>
      <p class="section-subtitle">${description}</p>
    </section>
  `);
};

const renderEmpty = (title, description, actionText, actionHref) => {
  setPageMeta({ title, description });

  render(`
    <section class="section">
      <h1 class="section-title">${title}</h1>
      <p class="section-subtitle">${description}</p>
      <div class="u-text-center">
        <a class="button button--primary" href="${actionHref}">${actionText}</a>
      </div>
    </section>
  `);
};

const renderProductCard = (product) => {
  const name = getProductName(product);
  const categoryLabel = getCategoryLabel(product.category);
  return `
  <article class="product-card">
    <div class="product-card__media">
      <img
        src="${product.img || FALLBACK_IMAGE}"
        alt="${name}"
        loading="lazy"
      />
    </div>
    <h3 class="product-card__title">${name}</h3>
    <p class="product-card__meta">${t('categoryLabel', { category: categoryLabel })}</p>
    <p class="product-card__price">${formatCurrency(product.price)}</p>
    <a class="button button--primary" href="#/item/${product.id}">
      ${t('viewDetail')}
    </a>
  </article>
`;
};

const renderList = async (title, categoryId = null) => {
  const categoryLabel = categoryId ? getCategoryLabel(categoryId) : '';
  renderLoading(title);

  const products = await fetchProducts(categoryId);

  if (products.length === 0) {
    renderEmpty(
      t('emptyProductsTitle'),
      t('emptyProductsDescription'),
      t('emptyProductsCta'),
      '#/'
    );
    return;
  }

  setPageMeta({
    title,
    description: categoryId
      ? t('listMetaCategory', { count: products.length, category: categoryLabel })
      : t('listMetaAll', { count: products.length }),
  });

  render(`
    <section class="section">
      <h1 class="section-title">${title}</h1>
      <div class="product-grid">
        ${products.map(renderProductCard).join('')}
      </div>
    </section>
  `);
};



const renderItemDetail = async (itemId) => {
  renderLoading(t('productDetailTitle'));

  const product = await fetchProductById(itemId);

  if (!product) {
    renderEmpty(
      t('productMissingTitle'),
      t('productMissingDescription'),
      t('emptyProductsCta'),
      '#/'
    );
    return;
  }

  const name = getProductName(product);
  const description = getProductDescription(product);
  const categoryLabel = getCategoryLabel(product.category);

  setPageMeta({
    title: name,
    description,
  });

  render(`
    <section class="section">
      <h1 class="section-title">${t('productDetailTitle')}</h1>
      <article class="product-detail">
        <div class="product-detail__media">
          <img src="${product.img || FALLBACK_IMAGE}" alt="${name}" />
        </div>
        <div class="product-detail__content">
          <h2>${name}</h2>
          <p class="product-card__meta">${t('categoryLabel', { category: categoryLabel })}</p>
          <p>${description}</p>
          <p class="product-detail__price">${formatCurrency(product.price)}</p>
          <div class="counter" data-counter>
            <div class="counter__controls">
              <button class="button button--ghost" type="button" data-action="decrement">-</button>
              <span data-quantity>1</span>
              <button class="button button--ghost" type="button" data-action="increment">+</button>
            </div>
            <button class="button button--success" type="button" data-action="add">
              ${t('addToCart')}
            </button>
          </div>
          <p class="form__error" data-detail-error></p>
        </div>
      </article>
    </section>
  `);

  detailState.product = product;
  detailState.quantity = 1;
  syncDetailCounter();
};

const renderCart = () => {
  const cart = cartStore.items;
  const { totalAmount, totalQuantity } = cartStore.totals;
  const products = readStoredProducts() ?? createSeedProducts();
  const productMap = new Map(products.map((product) => [product.id, product]));
  const stockMap = new Map(products.map((product) => [product.id, product.stock]));

  if (totalQuantity === 0) {
    renderEmpty(
      t('cartEmptyTitle'),
      t('cartEmptyDescription'),
      t('cartEmptyCta'),
      '#/'
    );
    return;
  }

  setPageMeta({
    title: t('cartTitle'),
    description: t('cartDescription'),
  });

  render(`
    <section class="section cart">
      <h1 class="section-title">${t('cartTitle')}</h1>
      <div>
        ${cart
      .map((item) => {
        const product = productMap.get(item.id);
        const name = product ? getProductName(product) : getLocalizedField(item.name);
        const stock = stockMap.get(item.id);
        const canIncrement =
          typeof stock === 'number' ? item.quantity < stock : true;
        const canDecrement = item.quantity > 1;

        return `
              <article class="cart-item" data-cart-item="${item.id}">
                <div>
                  <h3>${name}</h3>
                  <p class="cart-item__meta">${t('unitPriceLabel')}: ${formatCurrency(
          item.price
        )}</p>
                  ${typeof stock === 'number'
            ? `<p class="cart-item__meta">${t('stockLabel')}: ${stock}</p>`
            : ''}
                </div>
                <div>
                  <div class="counter" data-cart-counter>
                    <div class="counter__controls">
                      <button class="button button--ghost" type="button" data-action="cart-decrement" data-id="${item.id}" ${canDecrement ? '' : 'disabled'}>-</button>
                      <span data-cart-quantity>${item.quantity}</span>
                      <button class="button button--ghost" type="button" data-action="cart-increment" data-id="${item.id}" ${canIncrement ? '' : 'disabled'}>+</button>
                    </div>
                  </div>
                  <p><strong>${t('subtotalLabel')}: ${formatCurrency(
              item.price * item.quantity
            )}</strong></p>
                </div>
                <div>
                  <button class="button button--danger" data-remove="${item.id}">
                    ${t('removeItem')}
                  </button>
                </div>
              </article>
            `;
      })
      .join('')}
      </div>
      <div class="cart-summary">
        <p class="form__error" data-cart-error></p>
        <h3>${t('totalLabel')}: <span>${formatCurrency(totalAmount)}</span></h3>
        <div>
          <button class="button button--ghost" data-clear>
            ${t('clearCart')}
          </button>
          <a class="button button--success" href="#/checkout">
            ${t('checkoutCta')}
          </a>
        </div>
      </div>
    </section>
  `);


};

const renderCheckout = () => {
  const { totalAmount } = cartStore.totals;
  const isCartEmpty = cartStore.items.length === 0;

  setPageMeta({
    title: t('checkoutTitle'),
    description: t('checkoutDescription'),
  });

  render(`
    <section class="section">
      <h1 class="section-title">${t('checkoutTitle')}</h1>
      <form class="form" data-checkout-form>
        <div class="form__field">
          <label for="name">${t('checkoutName')}</label>
          <input class="form__input" id="name" name="name" type="text" required />
        </div>
        <div class="form__field">
          <label for="phone">${t('checkoutPhone')}</label>
          <input class="form__input" id="phone" name="phone" type="text" required />
        </div>
        <div class="form__field">
          <label for="email">${t('checkoutEmail')}</label>
          <input class="form__input" id="email" name="email" type="email" required />
        </div>
        <div class="form__field">
          <label for="emailConfirm">${t('checkoutEmailConfirm')}</label>
          <input
            class="form__input"
            id="emailConfirm"
            name="emailConfirm"
            type="email"
            required
          />
        </div>
        <p class="form__error" data-error></p>
        <button class="button button--primary" type="submit" ${isCartEmpty ? 'disabled' : ''
    }>
          ${t('checkoutSubmit', { total: formatCurrency(totalAmount) })}
        </button>
      </form>
    </section>
  `);

  const form = app.querySelector('[data-checkout-form]');
  const errorEl = app.querySelector('[data-error]');

  if (isCartEmpty) {
    errorEl.textContent = t('checkoutEmptyError');
    return;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    errorEl.textContent = '';

    const formData = new FormData(form);
    const name = formData.get('name').trim();
    const phone = formData.get('phone').trim();
    const email = formData.get('email').trim();
    const emailConfirm = formData.get('emailConfirm').trim();

    if (!name || !phone || !email || !emailConfirm) {
      errorEl.textContent = t('checkoutMissingError');
      return;
    }

    if (email !== emailConfirm) {
      errorEl.textContent = t('checkoutEmailMismatch');
      return;
    }

    render(`
      <section class="section">
        <h1 class="section-title">${t('checkoutProcessingTitle')}</h1>
        <p class="section-subtitle">${t('checkoutProcessingSubtitle')}</p>
      </section>
    `);

    setTimeout(() => {
      const orderId =
        crypto.randomUUID?.() ??
        `ORD-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;

      cartStore.clear();

      render(`
        <section class="section">
          <h1 class="section-title">${t('orderThanksTitle', { name })}</h1>
          <p class="section-subtitle">${t('orderSuccessSubtitle')}</p>
          <div class="product-card" style="max-inline-size:32rem; margin-inline:auto;">
            <p><strong>${t('orderIdLabel')}</strong></p>
            <h2 style="word-break: break-all;">${orderId}</h2>
            <p class="product-card__meta">${t('orderIdHint')}</p>
          </div>
        </section>
      `);
    }, 800);
  });
};

const renderAdminLogin = () => {
  setPageMeta({
    title: t('adminLoginTitle'),
    description: t('adminLoginDescription'),
  });

  render(`
    <section class="section">
      <h1 class="section-title">${t('adminLoginTitle')}</h1>
      <form class="form" data-admin-login>
        <div class="form__field">
          <label for="adminPassword">${t('adminPasswordLabel')}</label>
          <input class="form__input" id="adminPassword" name="password" type="password" required />
        </div>
        <p class="form__error" data-admin-error></p>
        <button class="button button--primary" type="submit">${t('adminLoginButton')}</button>
      </form>
    </section>
  `);

  const form = app.querySelector('[data-admin-login]');
  if (form) {
    const passwordInput = form.querySelector('#adminPassword');
    if (passwordInput) passwordInput.focus();
  }
};

const renderAdmin = () => {
  setPageMeta({
    title: t('adminPanelTitle'),
    description: t('adminPanelDescription'),
  });

  render(`
    <section class="section">
      <h1 class="section-title">${t('adminPanelTitle')}</h1>
      <div class="admin">
        <button class="button button--primary" data-admin="reset">
          ${t('adminReset')}
        </button>
        <button class="button button--success" data-admin="seed">
          ${t('adminSeed')}
        </button>
        <button class="button button--ghost" data-admin="images">
          ${t('adminImages')}
        </button>
        <button class="button button--danger" data-admin="delete">
          ${t('adminDelete')}
        </button>
        <button class="button button--ghost" type="button" data-admin-logout>
          ${t('adminLogout')}
        </button>
        <p class="admin__status" data-admin-status></p>
      </div>
    </section>
  `);


};

const renderNotFound = () => {
  renderEmpty(
    t('notFoundTitle'),
    t('notFoundDescription'),
    t('notFoundCta'),
    '#/'
  );
};

const router = () => {
  ensureCatalog();
  setActiveNav();

  const hash = normalizeHash(window.location.hash);
  const segments = hash.replace('#/', '').split('/').filter(Boolean);
  const [route, param] = segments;

  if (!route) {
    renderList(t('listTitleAll'));
    return;
  }

  if (route === 'category') {
    renderList(
      t('listTitleCategory', { category: getCategoryLabel(param) }),
      param
    );
    return;
  }

  if (route === 'item') {
    renderItemDetail(param);
    return;
  }

  if (route === 'cart') {
    renderCart();
    return;
  }

  if (route === 'checkout') {
    renderCheckout();
    return;
  }

  if (route === 'admin') {
    if (!isAdminAuthed()) {
      renderAdminLogin();
      return;
    }
    renderAdmin();
    return;
  }

  renderNotFound();
};

const boot = () => {
  const normalizedHash = normalizeHash(window.location.hash);
  if (normalizedHash !== window.location.hash) {
    window.location.hash = normalizedHash;
  }
  ensureCatalog();
  updateCartWidget();
  cartStore.subscribe(({ totals }) => updateCartWidget(totals));
  initTheme();
  initLanguage();
  syncAdminNav();
  renderLoading(t('loadingCatalogTitle'));
  router();
};

let booted = false;
const safeBoot = () => {
  if (booted) return;
  booted = true;
  boot();
};

const scheduleBootFallback = () => {
  if (booted) return;
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    safeBoot();
    return;
  }
  setTimeout(scheduleBootFallback, 100);
};

window.addEventListener('hashchange', router);
if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', safeBoot);
  window.addEventListener('load', safeBoot);
} else {
  safeBoot();
}
scheduleBootFallback();
setTimeout(() => {
  if (!booted) safeBoot();
}, 1000);
