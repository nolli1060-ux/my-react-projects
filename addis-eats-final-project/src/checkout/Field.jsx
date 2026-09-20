export function Field({ label, id, error, children }) {
  const describedBy = error ? `${id}-error` : undefined;

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {typeof children === "function"
        ? children({
            id,
            "aria-invalid": !!error,
            "aria-describedby": describedBy,
          })
        : children}
      {error && (
        <p id={`${id}-error`} className="field-error" role="alert">
          <span aria-hidden="true">⚠️</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

export default Field;
