"use client";

import { MouseEvent, useEffect } from "react";
import css from "./ModalBooking.module.css";
import { createPortal } from "react-dom";

interface ModalBookingProps {
  onClose: () => void;
}

export default function ModalBooking({ onClose }: ModalBookingProps) {
  function handleBackdropClick(e: MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  useEffect(() => {
    function onEscPress(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onEscPress);
    document.body.classList.add("noScroll");

    return () => {
      window.removeEventListener("keydown", onEscPress);
      document.body.classList.remove("noScroll");
    };
  }, [onClose]);

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button
          type="button"
          aria-label="Close modal"
          className={css.closeBtn}
          onClick={onClose}
        >
          <svg width={32} height={32}>
            <use href="/icons.svg#close"></use>
          </svg>
        </button>
        <h2 className={css.title}>Booking Form Modal</h2>
      </div>
    </div>,
    document.body,
  );
}
