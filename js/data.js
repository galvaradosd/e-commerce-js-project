const STORAGE_KEY = 'miec-products';

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

const getStockById = (productId) => {
  const products = readStoredProducts() ?? createSeedProducts();
  const found = products.find((product) => product.id === productId);
  return typeof found?.stock === 'number' ? found.stock : null;
};
