import { useCraft } from "./FormContext";
import { CATALOG as C } from "./catalog";
import { cartTotal, unitPrice, labelOf, money } from "./pricing";

export function Processing() {
  return (
    <div role="status" aria-live="polite" className="max-w-md mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-10 text-center">
      <div className="mx-auto mb-5 h-12 w-12 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
      <h2 className="text-xl font-semibold">Processing your order…</h2>
      <p className="text-gray-500 mt-2 text-sm">Please don’t close or refresh this page.</p>
    </div>
  );
}

export function Success() {
  const { state, dispatch } = useCraft();
  const { cart, shipping, orderId } = state;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
      <div className="text-center mb-6">
        <div className="mx-auto mb-3 h-14 w-14 rounded-full bg-green-100 text-green-600 text-3xl flex items-center justify-center" aria-hidden="true">✓</div>
        <h2 className="text-2xl font-bold">Order confirmed!</h2>
        <p className="text-gray-500 mt-1">
          Order <span className="font-mono font-semibold text-gray-800">{orderId}</span> · confirmation sent to {shipping.email}
        </p>
      </div>

      <ul className="divide-y divide-gray-100 border border-gray-100 rounded-xl mb-4">
        {cart.map((i) => (
          <li key={i.id} className="flex justify-between gap-4 p-3 text-sm">
            <div>
              <p className="font-medium">
                {labelOf(C.colors, i.config.color)} · {labelOf(C.materials, i.config.material)} × {i.qty}
              </p>
              <p className="text-gray-500 text-xs">
                {labelOf(C.soles, i.config.sole)} sole
                {i.config.addons.length > 0 && ` · ${i.config.addons.map((id) => labelOf(C.addons, id)).join(", ")}`}
              </p>
            </div>
            <span className="font-semibold">{money(unitPrice(i.config) * i.qty)}</span>
          </li>
        ))}
      </ul>

      <div className="flex justify-between text-lg font-bold mb-4">
        <span>Total paid</span>
        <span>{money(cartTotal(cart))}</span>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        Shipping to {shipping.fullName}, {shipping.address}, {shipping.city} {shipping.zip}
      </p>

      <button
        type="button"
        onClick={() => dispatch({ type: "RESET" })}
        className="w-full rounded-xl bg-indigo-600 text-white font-semibold py-3 hover:bg-indigo-700"
      >
        Start a new order
      </button>
    </div>
  );
}