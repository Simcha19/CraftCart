export function validateShipping(v) {
  const e = {};
  if (!v.fullName.trim()) e.fullName = "Full name is required";
  else if (v.fullName.trim().length < 2) e.fullName = "Name is too short";

  if (!v.email.trim()) e.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    e.email = "Enter a valid email address";

  const digits = v.phone.replace(/\D/g, "");
  if (!v.phone.trim()) e.phone = "Phone number is required";
  else if (!/^\+?[\d\s\-().]+$/.test(v.phone.trim()) || digits.length < 10 || digits.length > 15)
    e.phone = "Enter a valid phone number (10 to 15 digits)";

  if (!v.address.trim()) e.address = "Street address is required";
  if (!v.city.trim()) e.city = "City is required";
  if (!v.zip.trim()) e.zip = "Postal code is required";
  else if (!/^[A-Za-z0-9\s-]{3,10}$/.test(v.zip.trim())) e.zip = "Enter a valid postal code";
  return e;
}