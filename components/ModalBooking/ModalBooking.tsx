"use client";

import { MouseEvent, useEffect } from "react";
import css from "./ModalBooking.module.css";
import { createPortal } from "react-dom";
import { Teacher } from "@/types/teacher";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../Button/Button";
import FormData from "@/types/formDataBooking";

const schema = yup
  .object({
    reason: yup
      .string()
      .oneOf(["career", "kids", "abroad", "exams", "hobby"])
      .required("Please select your reason for learning English"),
    fullName: yup
      .string()
      .min(3, "Full name must be at least 3 characters")
      .max(80, "Full name must be at most 80 characters")
      .required("Full name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .max(60, "Email must be at most 60 characters")
      .required("Email is required"),
    phoneNumber: yup
      .string()
      .matches(
        /^[0-9+\-()\s]+$/,
        "Phone number can only contain digits and symbols + - ( )",
      )
      .min(7, "Phone number must be at least 7 digits")
      .required("Phone number is required"),
  })
  .required();

interface ModalBookingProps {
  onClose: () => void;
  teacher: Teacher;
  setFormData: (data: FormData) => void;
  openModalSuccess: () => void;
}

export default function ModalBooking({
  onClose,
  teacher,
  openModalSuccess,
  setFormData,
}: ModalBookingProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setFormData(data);
    onClose();
    openModalSuccess();
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

  const optionsRadio = [
    { value: "career", label: "Career and business" },
    { value: "kids", label: "Lesson for kids" },
    { value: "abroad", label: "Living abroad" },
    { value: "exams", label: "Exams and coursework" },
    { value: "hobby", label: "Culture, travel or hobby" },
  ];

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
        <h2 className={css.title}>Book trial lesson</h2>
        <p className={css.text}>
          Our experienced tutor will assess your current language level, discuss
          your learning goals, and tailor the lesson to your specific needs.
        </p>
        <div className={css.teacherInfoBox}>
          <Image
            className={css.img}
            src={teacher.avatar_url}
            alt="Teacher's avatar"
            width={44}
            height={44}
          />

          <div className={css.teacherNameBox}>
            <p className={css.teacherNameLabel}>Your teacher</p>
            <p className={css.teacherName}>
              {teacher.name} {teacher.surname}
            </p>
          </div>
        </div>

        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <legend className={css.legend}>
            What is your main reason for learning English?
          </legend>
          <fieldset className={css.fieldsetRadio}>
            {optionsRadio.map((radio, index) => {
              return (
                <label key={radio.value} className={css.labelRadio}>
                  <input
                    type="radio"
                    value={radio.value}
                    defaultChecked={index == 0 ? true : false}
                    className={css.radioBtn}
                    {...register("reason")}
                  />
                  {radio.label}
                </label>
              );
            })}
            {errors.reason?.message && (
              <span className={css.errorText}>{errors.reason?.message}</span>
            )}
          </fieldset>

          <fieldset className={css.fieldsetInputs}>
            <div className={css.inputBox}>
              <input
                className={css.input}
                type="text"
                placeholder="Full Name"
                {...register("fullName")}
              />
              {errors.fullName?.message && (
                <span className={css.errorText}>
                  {errors.fullName?.message}
                </span>
              )}
            </div>

            <div className={css.inputBox}>
              <input
                className={css.input}
                type="email"
                placeholder="Email"
                {...register("email")}
              />
              {errors.email?.message && (
                <span className={css.errorText}>{errors.email?.message}</span>
              )}
            </div>

            <div className={css.inputBox}>
              <input
                className={css.input}
                type="tel"
                placeholder="Phone number"
                {...register("phoneNumber")}
              />
              {errors.phoneNumber?.message && (
                <span className={css.errorText}>
                  {errors.phoneNumber?.message}
                </span>
              )}
            </div>
          </fieldset>

          <Button type="submit" text="Book" disable={!isValid} />
        </form>
      </div>
    </div>,
    document.body,
  );
}
