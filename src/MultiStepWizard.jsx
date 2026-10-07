import React from "react";
import { FormProvider, useForm } from "./FormContext";
import Step1Config from "./Step1Config";
import Step2Details from "./Step2Details";
import Step3Review from "./Step3Review";

function WizardContent() {
  const { step, setStep, formData } = useForm();

  // Derived price calculation pass (Base product price = $60)
  const basePrice = 60;
  const materialPrice = formData.material?.price || 0;
  const hardwarePrice = formData.hardware?.price || 0;
  const addOnsPrice = formData.addOns.reduce((sum, item) => sum + item.price, 0);
  const totalPrice = basePrice + materialPrice + hardwarePrice + addOnsPrice;

  return (
    <div className="max-w-2xl mx-auto my-8 p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
      {/* Wizard Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">CraftCart</h1>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            Step {step} of 3
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-indigo-600 h-full transition-all duration-300 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Real-time Dynamic Price Header */}
      <div className="mb-6 p-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl shadow-sm flex justify-between items-center">
        <div>
          <p className="text-xs uppercase font-semibold text-indigo-100">Live Estimated Price</p>
          <p className="text-2xl font-black">${totalPrice.toFixed(2)}</p>
        </div>
        <div className="text-xs bg-white/20 px-3 py-1.5 rounded-lg backdrop-blur-sm">
          Base: ${basePrice} + Customizations
        </div>
      </div>

      {/* Dynamic Step Mounts */}
      {step === 1 && <Step1Config onNext={() => setStep(2)} />}
      {step === 2 && <Step2Details onNext={() => setStep(3)} onBack={() => setStep(1)} />}
      {step === 3 && <Step3Review totalPrice={totalPrice} onBack={() => setStep(2)} />}
    </div>
  );
}

export default function MultiStepWizard() {
  return (
    <FormProvider>
      <WizardContent />
    </FormProvider>
  );
}