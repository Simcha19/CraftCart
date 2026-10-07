import { CATALOG as C } from "./catalog";

const priceOf = (list, id) => list.find((o) => o.id === id)?.price ?? 0;
export const labelOf = (list, id) => list.find((o) => o.id === id)?.label ?? id;

// Derived on the fly. Never stored in state.
export const unitPrice = (cfg) =>
  C.basePrice +
  priceOf(C.colors, cfg.color) +
  priceOf(C.materials, cfg.material) +
  priceOf(C.soles, cfg.sole) +
  cfg.addons.reduce((sum, id) => sum + priceOf(C.addons, id), 0);

export const cartTotal = (cart) =>
  cart.reduce((sum, item) => sum + unitPrice(item.config) * item.qty, 0);

export const money = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);