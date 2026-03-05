const STORAGE_KEY = 'miec-products';

const deepFreeze = (value) => {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value);
    Object.values(value).forEach(deepFreeze);
  }
  return value;
};

const BASE_PRODUCTS = deepFreeze([
  // Tecnología
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

  // Ropa
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

  // Hogar
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

const IMAGE_BASE_URL = 'https://picsum.photos/seed';

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

const readStoredProducts = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  const parsed = raw ? safeParse(raw) : null;
  return Array.isArray(parsed) ? parsed : null;
};

const writeProducts = (products) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

const cloneProducts = (products) =>
  structuredClone?.(products) ?? products.map((product) => ({ ...product }));

const delay = (ms = 300) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const createSeedProducts = () =>
  BASE_PRODUCTS.map((product, index) => ({
    ...product,
    id: String(index + 1),
    img: getImageForCategory(product.category, product.name),
  }));

export const ensureCatalog = () => {
  if (!readStoredProducts()) {
    writeProducts(createSeedProducts());
  }
};

export const fetchProducts = async (categoryId) => {
  await delay();
  const products = readStoredProducts() ?? createSeedProducts();
  const filtered = categoryId
    ? products.filter((product) => product.category === categoryId)
    : products;

  return cloneProducts(filtered);
};

export const fetchProductById = async (itemId) => {
  await delay();
  const products = readStoredProducts() ?? createSeedProducts();
  const found = products.find((product) => product.id === itemId) ?? null;

  return found ? { ...found } : null;
};

export const seedProducts = () => {
  const seeded = createSeedProducts();
  writeProducts(seeded);
  return cloneProducts(seeded);
};

export const deleteAllProducts = () => {
  writeProducts([]);
  return [];
};

export const updateProductImages = () => {
  const products = readStoredProducts() ?? [];
  const updated = products.map((product) => ({
    ...product,
    img: getImageForCategory(product.category, product.name),
  }));

  writeProducts(updated);
  return cloneProducts(updated);
};

export const getProductCategories = () =>
  Array.from(new Set(BASE_PRODUCTS.map((product) => product.category)));
