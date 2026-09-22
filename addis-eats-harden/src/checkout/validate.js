export function validateCheckout(data) {
  const errors = {};

  if (!data.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!data.phone.trim()) {
    errors.phone = "Please enter your phone number.";
  } else if (!/^(09|\+2519)\d{8}$/.test(data.phone.replace(/\s/g, ""))) {
    errors.phone = "Enter a valid Ethiopian phone number.";
  }

  if (!data.address.trim()) {
    errors.address = "Please enter your delivery address.";
  }

  return errors;
}