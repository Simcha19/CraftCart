import React from "react";
import { useForm } from "./FormContext";

const MATERIALS = [
  { name: "Standard Canvas", price: 0, image: "🎒" },
  { name: "Premium Leather", price: 35, image: "💼" },
  { name: "Recycled Nylon", price: 15, image: "🎒" },
];

const HARDWARE = [
  { name: "Standard Aluminum", price: 0 },
  { name: "Matte Black Steel", price: 20 },
  { name: "Brushed Brass", price: 25 },
];

const ADDONS = [
  { id: "monogram", name: "Custom Monogram Engraving", price: 15 },
  { id: "padding", name: "Extra Laptop Padding", price: 10 },
  { id: "waterproof", name: "Waterproof Coating", price: 18 },
];

export default function Step1Config({ onNext }) {
  const { formData, updateFormData } = useForm();

  const toggleAddOn = (addon) => {
    const exists = formData.addOns.some((item) => item.id === addon.id);
    if (exists) {
      updateFormData({
        addOns: formData.addOns.filter((item) => item.id !== addon.id),
      });
    } else {
      updateFormData({ addOns: [...formData.addOns, addon] });
    }
  };

  return (
    <div className="space-y-6">
      {/* Live Preview Box */}
      <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl text-center">
        <div className="text-6xl mb-2">{formData.material.image || "🎒"}</div>
        <h3 className="text-lg font-bold text-gray-800">
          CraftCart Bag — {formData.material.name}
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Hardware: {formData.hardware.name} | Add-ons: {formData.addOns.length} selected
        </p>
      </div>

      {/* Material Options */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Select Material
        </label>
        <div className="grid grid-cols-3 gap-3">
          {MATERIALS.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => updateFormData({ material: item })}
              className={`p-3 text-left border rounded-lg transition-all ${
                formData.material.name === item.name
                  ? "border-indigo-600 bg-indigo-50 ring-2 ring-indigo-500/20"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="font-semibold text-sm text-gray-800">{item.name}</div>
              <div className="text-xs text-indigo-600 font-medium">
                {item.price === 0 ? "Included" : `+$${item.price}`}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Hardware Options */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Hardware Finish
        </label>
        <div className="grid grid-cols-3 gap-3">
          {HARDWARE.map((hw) => (
            <button
              key={hw.name}
              type="button"
              onClick={() => updateFormData({ hardware: hw })}
              className={`p-3 text-left border rounded-lg transition-all ${
                formData.hardware.name === hw.name
                  ? "border-indigo-600 bg-indigo-50 ring-2 ring-indigo-500/20"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="font-semibold text-sm text-gray-800">{hw.name}</div>
              <div className="text-xs text-indigo-600 font-medium">
                {hw.price === 0 ? "Included" : `+$${hw.price}`}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Add-ons Checklist */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Optional Add-ons
        </label>
        <div className="space-y-2">
          {ADDONS.map((addon) => {
            const isChecked = formData.addOns.some((item) => item.id === addon.id);
            return (
              <label
                key={addon.id}
                className={`flex justify-between items-center p-3 border rounded-lg cursor-pointer transition-all ${
                  isChecked ? "border-indigo-600 bg-indigo-50/50" : "border-gray-200"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleAddOn(addon)}
                    className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                  />
                  <span className="text-sm font-medium text-gray-700">{addon.name}</span>
                </div>
                <span className="text-xs font-semibold text-indigo-600">+${addon.price}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold shadow hover:bg-indigo-700 transition"
        >
          Proceed to Shipping &rarr;
        </button>
      </div>
    </div>
  );
}