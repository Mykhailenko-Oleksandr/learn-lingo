import { MouseEvent, useEffect, useState } from "react";
import css from "./ModalLogin.module.css";
import { createPortal } from "react-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import clsx from "clsx";

interface FormData {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().email().max(60).required(),
    password: yup.string().min(8).max(100).required(),
  })
  .required();

interface ModalLoginProps {
  onClose: () => void;
}

export default function ModalLogin({ onClose }: ModalLoginProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

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
        <h2 className={css.title}>Log In</h2>
        <p className={css.text}>
          Welcome back! Please enter your credentials to access your account and
          continue your search for an teacher.
        </p>
        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={css.inputBox}>
            <input
              type="email"
              placeholder="Email"
              className={css.input}
              {...register("email")}
            />

            {errors.email?.message && (
              <span className={css.errorText}>{errors.email?.message}</span>
            )}
          </div>
          <div className={css.inputBox}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={clsx(css.input, css.inputPassword)}
              {...register("password")}
            />
            <button
              type="button"
              aria-label="Show password"
              className={css.seePasswordBtn}
              onMouseDown={() => setShowPassword(true)}
              onMouseUp={() => setShowPassword(false)}
              onMouseLeave={() => setShowPassword(false)}
            >
              <svg width={20} height={20}>
                <use href="/icons.svg#eye-off"></use>
              </svg>
            </button>
            {errors.password?.message && (
              <span className={css.errorText}>{errors.password?.message}</span>
            )}
          </div>
          <button type="submit" className={css.btnSubmit}>
            Log In
          </button>
        </form>
      </div>
    </div>,
    document.body,
  );
}
