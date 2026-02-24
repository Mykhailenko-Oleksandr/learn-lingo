import clsx from "clsx";
import css from "./Button.module.css";

interface ButtonProps {
  text: string;
  teacherCard?: boolean;
  onClick?: () => void;
  type: "button" | "submit";
  disable?: boolean;
}

export default function Button({
  text,
  teacherCard,
  onClick,
  type,
  disable,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        css.btn,
        teacherCard && css.teacherCard,
        type === "submit" && css.submitBtn,
      )}
      onClick={onClick}
      disabled={disable}
    >
      {text}
    </button>
  );
}
