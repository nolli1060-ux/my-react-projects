import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle } from "lucide-react";

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function validate(data) {
    const errs = {};
    if (!data.name || !data.name.trim()) {
      errs.name = "Please enter your name.";
    }

    if (!data.email || !data.email.trim()) {
      errs.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      errs.email = "Please enter a valid email address (e.g. name@example.com).";
    }

    if (!data.subject || !data.subject.trim()) {
      errs.subject = "Please enter a subject.";
    }

    if (!data.message || !data.message.trim()) {
      errs.message = "Please write your message.";
    } else if (data.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters long.";
    }

    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const currentErrors = validate(form);
    if (currentErrors[name]) {
      setErrors((prev) => ({ ...prev, [name]: currentErrors[name] }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      const firstErrorKey = Object.keys(validationErrors)[0];
      document.getElementById(firstErrorKey)?.focus();
      return;
    }

    setSubmitting(true);

    // Simulate sending message
    setTimeout(() => {
      setSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  }

  function handleReset() {
    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setTouched({});
    setErrors({});
    setIsSubmitted(false);
  }

  return (
    <section className="contact-section">
      <div className="section-header">
        <div>
          <h2>Get in Touch with Addis Eats</h2>
          <p>
            Have a question about our menu, delivery areas, or a dietary requirement?
            Send us a message and our team will get back to you.
          </p>
        </div>
      </div>

      <div className="contact-grid">
        {/* Contact Form */}
        <div className="contact-card">
          {isSubmitted ? (
            <div className="contact-success" role="status" aria-live="polite">
              <div className="success-icon-wrapper" aria-hidden="true">
                <CheckCircle2 size={48} />
              </div>
              <h3>Message Received!</h3>
              <p>
                Thank you, <strong>{form.name}</strong>. We have received your inquiry regarding "
                <em>{form.subject}</em>". Our team will respond to{" "}
                <strong>{form.email}</strong> shortly.
              </p>
              <button
                type="button"
                className="secondary-btn"
                onClick={handleReset}
                style={{ marginTop: "16px" }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label htmlFor="name">Your Name *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!(touched.name && errors.name)}
                  aria-describedby={touched.name && errors.name ? "name-error" : undefined}
                  placeholder="e.g. Almaz Bekele"
                />
                {touched.name && errors.name && (
                  <p id="name-error" className="field-error" role="alert">
                    <AlertCircle size={14} aria-hidden="true" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              <div className="field">
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!(touched.email && errors.email)}
                  aria-describedby={touched.email && errors.email ? "email-error" : undefined}
                  placeholder="name@example.com"
                />
                {touched.email && errors.email && (
                  <p id="email-error" className="field-error" role="alert">
                    <AlertCircle size={14} aria-hidden="true" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              <div className="field">
                <label htmlFor="subject">Subject *</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!(touched.subject && errors.subject)}
                  aria-describedby={touched.subject && errors.subject ? "subject-error" : undefined}
                  placeholder="e.g. Question about vegan fasting dishes"
                />
                {touched.subject && errors.subject && (
                  <p id="subject-error" className="field-error" role="alert">
                    <AlertCircle size={14} aria-hidden="true" />
                    <span>{errors.subject}</span>
                  </p>
                )}
              </div>

              <div className="field">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!(touched.message && errors.message)}
                  aria-describedby={touched.message && errors.message ? "message-error" : undefined}
                  placeholder="Write your question or feedback here..."
                />
                {touched.message && errors.message && (
                  <p id="message-error" className="field-error" role="alert">
                    <AlertCircle size={14} aria-hidden="true" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="primary-btn"
                disabled={submitting}
                style={{ width: "100%", padding: "12px", marginTop: "8px" }}
              >
                <Send size={16} aria-hidden="true" />
                <span>{submitting ? "Sending message..." : "Send Message"}</span>
              </button>
            </form>
          )}
        </div>

        {/* Contact Info Sidebar */}
        <div className="contact-info-card">
          <h3>Contact Information</h3>
          <p style={{ color: "#687780", fontSize: "0.95rem", marginBottom: "24px" }}>
            Reach out through our direct service lines or visit our kitchen hub.
          </p>

          <div className="info-item">
            <div className="info-icon" aria-hidden="true">
              <MapPin size={20} />
            </div>
            <div>
              <strong>Kitchen & Dispatch Hub</strong>
              <p>Bole Medhanialem, Addis Ababa, Ethiopia</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon" aria-hidden="true">
              <Phone size={20} />
            </div>
            <div>
              <strong>Customer Support Line</strong>
              <p>+251 911 234 567 / +251 116 123 456</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon" aria-hidden="true">
              <Mail size={20} />
            </div>
            <div>
              <strong>Email Inquiries</strong>
              <p>support@addiseats.et</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon" aria-hidden="true">
              <Clock size={20} />
            </div>
            <div>
              <strong>Operating Hours</strong>
              <p>Daily: 11:00 AM – 10:30 PM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
