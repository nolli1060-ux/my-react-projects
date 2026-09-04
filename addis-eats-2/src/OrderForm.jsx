import { useState } from "react";

function OrderForm() {
  const [form, setForm] = useState({ name: "", phone: "", area: "" });
  const [submitted, setSubmitted] = useState(false);
  const phoneValid = /^(?:\+251|0)9\d{8}$/.test(form.phone);
  const valid = form.name.trim().length > 0 && phoneValid && form.area;

  function handleChange(event) {
    const { name, value } = event.target;
    setForm(currentForm => ({ ...currentForm, [name]: value }));
    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (valid) setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
      <label htmlFor="phone">Phone</label>
      <input id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone (+2519........)" inputMode="tel" required />
      {form.phone && !phoneValid && <p className="err">Use +2519...</p>}
      <label htmlFor="area">Delivery area</label>
      <select id="area" name="area" value={form.area} onChange={handleChange} required>
        <option value="">Select an area</option>
        <option>Bole</option>
        <option>Megenagna</option>
        <option>4 Killo</option>
        <option>6 Killo</option>
        <option>Piassa</option>
        <option>Kasanchis</option>
        <option>CMC</option>
        <option>Ayat</option>
      </select>
      <button type="submit" disabled={!valid}>Pay with TeleBirr</button>
      {submitted && <p className="success" role="status">Order received for {form.name} in {form.area}.</p>}
    </form>
  );
}

export default OrderForm;