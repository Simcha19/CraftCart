import { CATALOG as C } from "./catalog";
import { useCraft } from "./FormContext";
import { cartTotal, labelOf, money, unitPrice } from "./pricing";

export default function CartPanel({ editable = true }) {
  const { state, dispatch } = useCraft();
  const { cart } = state;

  return (
    <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Your cart</h2>

      {cart.length === 0 ? (
        <p className="mt-3 text-sm text-gray-500">
          Your cart is empty. Customize a pair and add it to your cart.
        </p>
      ) : (
        <>
          <ul className="mt-4 divide-y divide-gray-100">
            {cart.map((item) => (
              <li key={item.id} className="py-4 first:pt-0">
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="font-medium">
                      {labelOf(C.colors, item.config.color)} · {labelOf(C.materials, item.config.material)}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {labelOf(C.soles, item.config.sole)} sole
                      {item.config.addons.length > 0 &&
                        ` · ${item.config.addons.map((id) => labelOf(C.addons, id)).join(", ")}`}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold">
                    {money(unitPrice(item.config) * item.qty)}
                  </p>
                </div>

                {editable && (
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${labelOf(C.colors, item.config.color)} sneakers`}
                        onClick={() => dispatch({ type: "UPDATE_QTY", id: item.id, delta: -1 })}
                        className="h-8 w-8 rounded border border-gray-300 hover:bg-gray-50"
                      >
                        −
                      </button>
                      <span className="min-w-6 text-center text-sm">{item.qty}</span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${labelOf(C.colors, item.config.color)} sneakers`}
                        disabled={item.qty >= 10}
                        onClick={() => dispatch({ type: "UPDATE_QTY", id: item.id, delta: 1 })}
                        className="h-8 w-8 rounded border border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => dispatch({ type: "REMOVE_ITEM", id: item.id })}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="flex justify-between border-t border-gray-200 pt-4 font-semibold">
            <span>Total</span>
            <span>{money(cartTotal(cart))}</span>
          </div>

          {state.step === 1 && (
            <button
              type="button"
              onClick={() => dispatch({ type: "GO_TO_STEP", step: 2 })}
              className="mt-4 w-full rounded-xl bg-indigo-600 px-4 py-2.5 font-semibold text-white hover:bg-indigo-700"
            >
              Continue to shipping
            </button>
          )}
        </>
      )}
    </aside>
  );
}
