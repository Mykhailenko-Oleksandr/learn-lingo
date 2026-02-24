"use client";

import { MouseEvent, useEffect } from "react";
import css from "./ModalSuccess.module.css";
import { createPortal } from "react-dom";
import { Teacher } from "@/types/teacher";
import Button from "../Button/Button";
import FormData from "@/types/formDataBooking";

interface ModalSuccessProps {
  onClose: () => void;
  teacher: Teacher;
  formData: FormData;
}

export default function ModalSuccess({
  onClose,
  teacher,
  formData,
}: ModalSuccessProps) {
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
        <h2 className={css.title}>Successful booking</h2>
        <p className={css.text}>
          Dear <span className={css.accentText}>{formData.fullName}</span>, your
          trial lesson with&nbsp;
          <span className={css.accentText}>
            {teacher.name}&nbsp;{teacher.surname}
          </span>
          &nbsp; has been successfully booked. The teacher will reach out to you
          shortly with further details.
        </p>
        <Button text="Done" type="button" onClick={onClose} />
      </div>
    </div>,
    document.body,
  );
}
