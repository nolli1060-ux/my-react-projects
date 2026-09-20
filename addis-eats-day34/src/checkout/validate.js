const AREAS = ["Bole", "Kazanchis", "Megenagna", "Piassa"];

export function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Please enter your name";
  }

  if (!/^(?:\+251|0)9\d{8}$/.test(form.phone.replace(/\s/g, ""))) {
    errors.phone = "Use 09… or +2519… (TeleBirr number)";
  }

  if (!AREAS.includes(form.area)) {
    errors.area = "Choose a delivery area";
  }

  if (form.notes.length > 200) {
    errors.notes = "Keep notes to 200 characters or fewer";
  }

  return errors;
}

export { AREAS };
