import { AlertCircle } from "lucide-react";

function Field({ label, id, error, children }) {
  const describedBy = error ? `${id}-error` : undefined;

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>

      {typeof children === "function"
        ? children({
            id,
            "aria-invalid": Boolean(error),
            "aria-describedby": describedBy
          })
        : children}

      {error && (
        <p id={`${id}-error`} className="field-error" role="alert">
          <AlertCircle size={14} aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

export default Field;