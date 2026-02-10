import { useEffect } from "react";
import css from "./ModalLogin.module.css";
import { createPortal } from "react-dom";

interface ModalLoginProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalLogin({ isOpen, onClose }: ModalLoginProps) {
  useEffect(() => {
    function onEscClick(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", onEscClick);
    document.body.classList.add("noScroll");

    return () => {
      window.removeEventListener("keydown", onEscClick);
      document.body.classList.remove("noScroll");
    };
  });

  return createPortal(
    <div className={css.backdrop}>
      <div className={css.modal}>
        <button type="button" className={css.closeBtn}>
          <svg width={32} height={32}>
            <use href="/icons.svg#close"></use>
          </svg>
        </button>
        <h2 className={css.title}>Log In</h2>
      </div>
    </div>,
    document.body,
  );
}
