import React, { useState } from "react";
import { useForm } from "./FormContext";

export default function Step2Details({ onNext, onBack }) {
  const { formData, updateFormData } = useForm();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9+\s\-()]{7,15}$/;

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.shippingAddress.trim()) {
      newErrors.shippingAddress = "Shipping address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceed = (e) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleProceed} className="space-y-4">
      <h2 className="text-lg font-bold text-gray-800">2. Shipping Details</h2>

      {/* Full Name */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
          Full Name
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="e.g. Dents Joy"
          className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="e.g. dents@example.com"
          className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="e.g. +1 555-0192"
          className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
      </div>

      {/* Shipping Address */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
          Shipping Address
        </label>
        <textarea
          name="shippingAddress"
          rows={3}
          value={formData.shippingAddress}
          onChange={handleChange}
          placeholder="Enter full street address, city, and zip code"
          className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        {errors.shippingAddress && (
          <p className="text-xs text-red-500 mt-1">{errors.shippingAddress}</p>
        )}
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
          type="submit"
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold shadow hover:bg-indigo-700 transition"
        >
          Review Order &rarr;
        </button>
      </div>
    </form>
  );
}