import React, { useState } from "react";
import { useForm } from "./FormContext";

export default function Step3Review({ totalPrice, onBack }) {
  const { formData, resetFormData } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleConfirmOrder = () => {
    setIsSubmitting(true);
    // Simulate API processing delay (2 seconds)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSubmitting) {
    return (
      <div className="py-12 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <h3 className="text-lg font-bold text-gray-800">Processing Your Custom Order...</h3>
        <p className="text-xs text-gray-500">Please do not refresh or close this page.</p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="py-8 text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto font-bold">
          ✓
        </div>
        <h2 className="text-2xl font-black text-gray-800">Order Confirmed!</h2>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          Thank you, <span className="font-semibold text-gray-800">{formData.fullName}</span>. We've received your custom CraftCart bag order and sent a confirmation email to{" "}
          <span className="font-semibold text-gray-800">{formData.email}</span>.
        </p>
        <div className="pt-4">
          <button
            type="button"
            onClick={resetFormData}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold shadow hover:bg-indigo-700 transition"
          >
            Start New Customization
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-gray-800">3. Order Summary & Review</h2>

      {/* Specifications Breakdown */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3 text-sm">
        <h3 className="font-bold text-gray-700 border-b pb-2">Custom Configuration</h3>
        <div className="flex justify-between">
          <span className="text-gray-600">Base Product</span>
          <span className="font-semibold">$60.00</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Material ({formData.material.name})</span>
          <span className="font-semibold">+${formData.material.price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Hardware ({formData.hardware.name})</span>
          <span className="font-semibold">+${formData.hardware.price.toFixed(2)}</span>
        </div>
        {formData.addOns.length > 0 && (
          <div className="border-t pt-2 space-y-1">
            <span className="text-gray-600 font-medium">Add-ons:</span>
            {formData.addOns.map((item) => (
              <div key={item.id} className="flex justify-between text-xs text-gray-500 pl-2">
                <span>• {item.name}</span>
                <span>+${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}
        <div className="border-t pt-3 flex justify-between text-base font-black text-gray-900">
          <span>Final Total</span>
          <span className="text-indigo-600">${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* Shipping Details Breakdown */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm space-y-1">
        <h3 className="font-bold text-gray-700 border-b pb-2 mb-2">Shipping Information</h3>
        <p><span className="text-gray-500">Name:</span> {formData.fullName}</p>
        <p><span className="text-gray-500">Email:</span> {formData.email}</p>
        <p><span className="text-gray-500">Phone:</span> {formData.phone}</p>
        <p><span className="text-gray-500">Address:</span> {formData.shippingAddress}</p>
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
        >
          &larr; Back
        </button>
        <button
          type="button"
          onClick={handleConfirmOrder}
          className="px-6 py-2.5 bg-green-600 text-white rounded-lg text-sm font-semibold shadow hover:bg-green-700 transition"
        >
          Confirm & Pay ${totalPrice.toFixed(2)}
        </button>
      </div>
    </div>
  );
}