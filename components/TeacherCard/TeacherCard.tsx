import { Teacher } from "@/types/teacher";
import css from "./TeacherCard.module.css";
import Image from "next/image";

interface TeacherCardProps {
  teacher: Teacher;
}

export default function TeacherCard({ teacher }: TeacherCardProps) {
  return (
    <li className={css.item}>
      <div className={css.imgBox}>
        <Image
          src={teacher.avatar_url}
          alt="Avatar teacher"
          width={96}
          height={96}
          className={css.avatar}
        />
      </div>
      <div className={css.contentBox}>
        <div className={css.languagesBox}>
          <p className={css.keyBlock}>Languages</p>
          <ul className={css.languagesList}>
            <li className={css.languagesItem}>
              <svg
                width={16}
                height={16}
                className={css.languagesItemIcon}>
                <use href="/icons.svg#book-open"></use>
              </svg>
              <p className={css.textValue}>Lessons online</p>
            </li>
            <li className={css.languagesItem}>
              <div className={css.line}></div>
            </li>
          </ul>
        </div>
      </div>
    </li>
  );
}
