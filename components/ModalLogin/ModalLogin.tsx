import { MouseEvent, useEffect } from "react";
import css from "./ModalLogin.module.css";
import { createPortal } from "react-dom";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormData {
  email: string;
  password: string;
}

interface ModalLoginProps {
  onClose: () => void;
}

export default function ModalLogin({ onClose }: ModalLoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "onChange" });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

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
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button
          type="button"
          className={css.closeBtn}
          onClick={onClose}>
          <svg
            width={32}
            height={32}>
            <use href="/icons.svg#close"></use>
          </svg>
        </button>
        <h2 className={css.title}>Log In</h2>
        <p className={css.text}>
          Welcome back! Please enter your credentials to access your account and
          continue your search for an teacher.
        </p>
        <form
          className={css.form}
          onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Email"
            className={css.input}
            {...register("email")}
          />
          <input
            type="password"
            placeholder="Password"
            className={css.input}
            {...register("password")}
          />
          <button
            type="submit"
            className={css.btnSubmit}>
            Log In
          </button>
        </form>
      </div>
    </div>,
    document.body,
  );
}
