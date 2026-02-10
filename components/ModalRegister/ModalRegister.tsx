import css from "./ModalRegister.module.css";
import { createPortal } from "react-dom";
import { MouseEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import clsx from "clsx";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const schema = yup
  .object({
    name: yup.string().min(3).max(60).required(),
    email: yup.string().email().max(60).required(),
    password: yup.string().min(8).max(100).required(),
  })
  .required();

interface ModalRegisterProps {
  onClose: () => void;
}

export default function ModalRegister({ onClose }: ModalRegisterProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onTouched", resolver: yupResolver(schema) });

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

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

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
        <h2 className={css.title}>Registration</h2>
        <p className={css.text}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information
        </p>
        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={css.inputBox}>
            <input
              type="text"
              placeholder="Name"
              className={css.input}
              {...register("name")}
            />

            {errors.name?.message && (
              <span className={css.errorText}>{errors.name?.message}</span>
            )}
          </div>

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
          <button type="submit" className={css.btnSubmit} disabled={!isValid}>
            Sign Up
          </button>
        </form>
      </div>
    </div>,
    document.body,
  );
}
