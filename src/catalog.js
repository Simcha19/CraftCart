export const CATALOG = {
  basePrice: 80,
  colors: [
    { id: "white", label: "Cloud White", hex: "#f3f4f6", price: 0, dark: false },
    { id: "black", label: "Midnight Black", hex: "#111827", price: 0, dark: true },
    { id: "red", label: "Crimson", hex: "#dc2626", price: 5, dark: true },
    { id: "navy", label: "Navy Blue", hex: "#1e3a8a", price: 5, dark: true },
  ],
  materials: [
    { id: "canvas", label: "Canvas", price: 0 },
    { id: "leather", label: "Leather", price: 40 },
    { id: "suede", label: "Suede", price: 55 },
  ],
  soles: [
    { id: "std", label: "Standard", price: 0, hex: "#d1d5db" },
    { id: "air", label: "Air Cushion", price: 25, hex: "#bfdbfe" },
  ],
  addons: [
    { id: "laces", label: "Premium Laces", price: 10 },
    { id: "monogram", label: "Monogram", price: 15 },
    { id: "waterproof", label: "Waterproof Coating", price: 20 },
  ],
};

export const DEFAULT_CONFIG = {
  color: "white",
  material: "canvas",
  sole: "std",
  addons: [],
};