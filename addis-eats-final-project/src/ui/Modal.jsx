import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function Modal({ children, onClose, titleId }) {
  const panelRef = useRef(null);
  const previousFocus = useRef(null);

  useEffect(() => {
    previousFocus.current = document.activeElement;
    panelRef.current?.focus();

    function onKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previousFocus.current?.focus?.();
    };
  }, [onClose]);

  const modalRoot = document.getElementById("modal-root") || document.body;

  return createPortal(
    <div
      className="overlay"
      onClick={(event) => {
        event.stopPropagation();
        onClose();
      }}
    >
      <div
        ref={panelRef}
        className="panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex="-1"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;
