function Field({ label, id, error, children }) {
  const describedBy = error ? `${id}-error` : undefined;

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children({
        id,
        "aria-invalid": !!error,
        "aria-describedby": describedBy,
      })}
      {error && (
        <p id={`${id}-error`} className="err" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default Field;
