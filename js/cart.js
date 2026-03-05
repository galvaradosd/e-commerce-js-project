const CART_STORAGE_KEY = 'miec-cart';

const safeParse = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
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

export const cartStore = new CartStore();

export const getCart = () => cartStore.items;
export const getCartTotals = () => cartStore.totals;
export const addItem = (item, quantity) => cartStore.add(item, quantity);
export const removeItem = (itemId) => cartStore.remove(itemId);
export const clearCart = () => cartStore.clear();
export const subscribeCart = (handler) => cartStore.subscribe(handler);
