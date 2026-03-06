const CART_STORAGE_KEY = 'miec-cart';
const THEME_KEY = 'shopfast-theme';
const ADMIN_AUTH_KEY = 'shopfast-admin-auth';
const ADMIN_PASSWORD = 'admin1234';
const LANG_KEY = 'shopfast-lang';







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

let currentLang = 'en';

const t = (key, params = {}) => {
  const dict = I18N[currentLang] ?? I18N.en;
  const fallback = I18N.en?.[key] ?? key;
  const value = dict[key] ?? fallback;
  return formatMessage(value, params);
};

const getLanguagePreference = () => {
  const stored = localStorage.getItem(LANG_KEY);
  return stored === 'es' || stored === 'en' ? stored : 'en';
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
    return field[currentLang] ?? field.en ?? field.es ?? '';
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

  if (!form || !errorEl) return;

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
