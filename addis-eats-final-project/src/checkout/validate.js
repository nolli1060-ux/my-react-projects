export const DELIVERY_AREAS = [
  "Bole",
  "Kazanchis",
  "Megenagna",
  "Piassa",
  "Sarbet",
  "CMC",
  "Gerji",
];

export function validateCheckoutForm(form) {
  const errors = {};

  if (!form.name || !form.name.trim()) {
    errors.name = "Please enter your full name.";
  } else if (form.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters long.";
  }

  const cleanPhone = (form.phone || "").replace(/\s/g, "");
  if (!cleanPhone) {
    errors.phone = "Please enter your TeleBirr phone number.";
  } else if (!/^(?:\+251|0)9\d{8}$/.test(cleanPhone)) {
    errors.phone = "Use valid Ethiopian format (e.g. 0911234567 or +251911234567).";
  }

  if (!form.area || !DELIVERY_AREAS.includes(form.area)) {
    errors.area = "Please select an Addis Ababa delivery area.";
  }

  if (form.notes && form.notes.length > 200) {
    errors.notes = "Special notes must be 200 characters or fewer.";
  }

  return errors;
}
