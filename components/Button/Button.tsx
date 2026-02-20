import css from "./Button.module.css";

interface ButtonProps {
  text: string;
  teacherCard?: boolean;
  onClick: () => void;
}

export default function Button({ text, teacherCard, onClick }: ButtonProps) {
  return (
    <button
      type="button"
      className={`${css.btn} ${teacherCard ? css.teacherCard : ""}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
