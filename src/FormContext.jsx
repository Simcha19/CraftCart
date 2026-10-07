import React, { createContext, useContext, useState, useEffect } from "react";

const FormContext = createContext();

const INITIAL_DATA = {
  material: { name: "Standard Canvas", price: 0 },
  hardware: { name: "Standard Aluminum", price: 0 },
  addOns: [],
  fullName: "",
  email: "",
  phone: "",
  shippingAddress: "",
};

export function FormProvider({ children }) {
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem("craftcart_form_data");
      return saved ? JSON.parse(saved) : INITIAL_DATA;
    } catch (e) {
      return INITIAL_DATA;
    }
  });

  const [step, setStep] = useState(() => {
    try {
      const savedStep = localStorage.getItem("craftcart_step");
      return savedStep ? JSON.parse(savedStep) : 1;
    } catch (e) {
      return 1;
    }
  });

  useEffect(() => {
    localStorage.setItem("craftcart_form_data", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem("craftcart_step", JSON.stringify(step));
  }, [step]);

  const updateFormData = (fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const resetFormData = () => {
    setFormData(INITIAL_DATA);
    setStep(1);
    localStorage.removeItem("craftcart_form_data");
    localStorage.removeItem("craftcart_step");
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        resetFormData,
        step,
        setStep,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  return useContext(FormContext);
}